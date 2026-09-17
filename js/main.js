document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
        smooth: true,
        smoothTouch: false, // Prevents lag on mobile touch devices
    });

    // Request Animation Frame Loop for Lenis
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);


    // 2. Element Appearance Effects (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'active' class to trigger CSS transition
                entry.target.classList.add('active');

                // Unobserve after animating so it only happens once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the 'reveal' class and observe them
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // 3. Mobile Menu Toggle Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-container a');

    if (menuToggle && navContainer) {
        // Mở / Đóng menu khi bấm nút hamburger
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navContainer.classList.toggle('open');
        });

        // Tự động đóng menu khi người dùng chọn một liên kết (chuyển trang/cuộn trang)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navContainer.classList.remove('open');
            });
        });
    }


    // 4. Header Scroll Effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Nếu cuộn xuống quá 50px thì thêm class 'scrolled', ngược lại thì xóa đi
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // 5. Tính toán tự động số năm hoạt động
    const foundationYear = 2016;
    const currentYear = new Date().getFullYear();
    const yearsOfOperation = currentYear - foundationYear;
    
    const dynamicYearsEl = document.getElementById('dynamic-years');
    if (dynamicYearsEl) {
        dynamicYearsEl.textContent = yearsOfOperation;
    }

});
