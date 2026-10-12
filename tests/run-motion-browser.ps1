param(
    [ValidateSet('Chrome', 'Edge')][string]$Browser = 'Chrome',
    [ValidateSet('motion-browser.html', 'home-browser.html')][string]$Fixture = 'motion-browser.html'
)

$ErrorActionPreference = 'Stop'

# Use the browser's real frame clock. Virtual-time DOM dumps can skip rAF
# and compositor updates, producing false failures for animation fixtures.
function Invoke-DevTools($Socket, [string]$Expression) {
    $message = @{ id = 1; method = 'Runtime.evaluate'; params = @{ expression = $Expression; returnByValue = $true } } | ConvertTo-Json -Depth 5 -Compress
    $bytes = [Text.Encoding]::UTF8.GetBytes($message)
    $segment = [ArraySegment[byte]]::new($bytes)
    $timeout = [Threading.CancellationTokenSource]::new(10000)
    try {
        $Socket.SendAsync($segment, [Net.WebSockets.WebSocketMessageType]::Text, $true, $timeout.Token).GetAwaiter().GetResult() | Out-Null
        do {
            $stream = [IO.MemoryStream]::new()
            try {
                do {
                    $buffer = [byte[]]::new(65536)
                    $received = $Socket.ReceiveAsync([ArraySegment[byte]]::new($buffer), $timeout.Token).GetAwaiter().GetResult()
                    if ($received.MessageType -eq [Net.WebSockets.WebSocketMessageType]::Close) { throw 'DevTools closed before returning a result.' }
                    $stream.Write($buffer, 0, $received.Count)
                } while (-not $received.EndOfMessage)
                $reply = [Text.Encoding]::UTF8.GetString($stream.ToArray()) | ConvertFrom-Json
            } finally { $stream.Dispose() }
        } while ($reply.id -ne 1)
        if ($reply.error -or $reply.result.exceptionDetails) { throw ($reply | ConvertTo-Json -Depth 8 -Compress) }
        return $reply.result.result.value
    } finally { $timeout.Dispose() }
}
$browserPaths = if ($Browser -eq 'Chrome') {
    @('C:\Program Files\Google\Chrome\Application\chrome.exe', 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe')
} else {
    @('C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe', 'C:\Program Files\Microsoft\Edge\Application\msedge.exe')
}
$browserPath = $browserPaths | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $browserPath) { throw "$Browser is not installed at a standard location." }
$fixturePath = Join-Path $PSScriptRoot $Fixture
$fixtureUrl = ([uri]$fixturePath).AbsoluteUri
$runPath = Join-Path ([IO.Path]::GetTempPath()) ('caysi-motion-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $runPath | Out-Null
$cases = @(
    @{ Name = 'desktop'; Size = '1440,900'; Query = 'normal&fine=1&motion=full'; Extra = @('--blink-settings=primaryPointerType=4,availablePointerTypes=4,primaryHoverType=2,availableHoverTypes=2,prefersReducedMotion=false') },
    @{ Name = 'phone'; Size = '412,915'; Query = 'normal&coarse=1&motion=full'; Extra = @('--touch-events=enabled', '--blink-settings=primaryPointerType=2,availablePointerTypes=2,primaryHoverType=1,availableHoverTypes=1,prefersReducedMotion=false') },
    @{ Name = 'tablet'; Size = '768,1024'; Query = 'normal&coarse=1&motion=full'; Extra = @('--touch-events=enabled', '--blink-settings=primaryPointerType=2,availablePointerTypes=2,primaryHoverType=1,availableHoverTypes=1,prefersReducedMotion=false') },
    @{ Name = 'reduced'; Size = '1440,900'; Query = 'normal&fine=1&motion=reduce'; Extra = @('--force-prefers-reduced-motion=reduce', '--blink-settings=primaryPointerType=4,availablePointerTypes=4,primaryHoverType=2,availableHoverTypes=2,prefersReducedMotion=true') },
    @{ Name = 'no-observer'; Size = '412,915'; Query = 'no-io'; Extra = @() },
    @{ Name = 'no-transforms'; Size = '412,915'; Query = 'no-transform'; Extra = @() }
)
$failures = @()
if ($Fixture -eq 'home-browser.html') {
    $cases = @($cases | Where-Object { $_.Name -in @('desktop', 'phone', 'tablet', 'reduced') })
}
foreach ($case in $cases) {
    $profilePath = Join-Path $runPath ($case.Name + '-profile')
    $outputPath = Join-Path $runPath ($case.Name + '.html')
    $stdoutPath = Join-Path $runPath ($case.Name + '.stdout.log')
    $errorPath = Join-Path $runPath ($case.Name + '.log')
    $arguments = @('--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-background-networking', '--disable-extensions', '--allow-file-access-from-files', '--force-device-scale-factor=1', '--remote-debugging-port=0', "--window-size=$($case.Size)", ('--user-data-dir="' + $profilePath + '"')) + $case.Extra + @('"' + $fixtureUrl + '?scenario=' + $case.Query + '"')
    $process = Start-Process -FilePath $browserPath -ArgumentList $arguments -WindowStyle Hidden -PassThru -RedirectStandardOutput $stdoutPath -RedirectStandardError $errorPath
    $socket = $null
    try {
        $deadline = [DateTime]::UtcNow.AddSeconds(30)
        $portPath = Join-Path $profilePath 'DevToolsActivePort'
        while (-not (Test-Path -LiteralPath $portPath)) {
            if ($process.HasExited -or [DateTime]::UtcNow -gt $deadline) { throw 'Browser failed to start DevTools.' }
            Start-Sleep -Milliseconds 100
        }
        $port = (Get-Content -LiteralPath $portPath)[0]
        $pages = Invoke-RestMethod -Uri ("http://127.0.0.1:$port/json/list")
        $page = $pages | Where-Object { $_.type -eq 'page' -and $_.url -like ('*' + $Fixture + '*') } | Select-Object -First 1
        if (-not $page) { throw 'Browser did not open the fixture.' }
        $socket = [Net.WebSockets.ClientWebSocket]::new()
        $socket.ConnectAsync([uri]$page.webSocketDebuggerUrl, [Threading.CancellationToken]::None).GetAwaiter().GetResult() | Out-Null
        do {
            $status = Invoke-DevTools $socket "document.getElementById('result')?.dataset.status"
            if ($status -in @('pass', 'fail')) { break }
            if ([DateTime]::UtcNow -gt $deadline) { throw 'Fixture exceeded 30 seconds.' }
            Start-Sleep -Milliseconds 100
        } while ($true)
        $dom = Invoke-DevTools $socket 'document.documentElement.outerHTML'
        [IO.File]::WriteAllText($outputPath, $dom, [Text.UTF8Encoding]::new($false))
        if ($status -eq 'pass') { Write-Output "PASS $($case.Name)" }
        else {
            $failures += $case.Name
            Write-Output "FAIL $($case.Name): DOM: $outputPath; browser log: $errorPath"
        }
    } catch {
        $failures += $case.Name
        Write-Output "FAIL $($case.Name): $($_.Exception.Message) Logs: $errorPath"
    } finally {
        if ($socket) { $socket.Dispose() }
        if (-not $process.HasExited) { $process.Kill() }
    }
}
Write-Output "Browser artifacts: $runPath"
if ($failures.Count) { throw ('Animation checks failed: ' + ($failures -join ', ')) }
