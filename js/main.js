document.addEventListener("DOMContentLoaded", () => {
/*
    ==========================================
    LENIS (DESKTOP ONLY)
    ==========================================
    */

    if (window.innerWidth > 768) {
        const lenis = new Lenis({
            duration: 1.1
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }

    /*
    ==========================================
    REVEAL ANIMATIONS
    ==========================================
    */

    const revealElements =
        document.querySelectorAll(".reveal");

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.1,
                rootMargin: "100px"
            }
        );

    revealElements.forEach(el => {
        observer.observe(el);
    });

    /*
    ==========================================
    MOBILE MENU
    ==========================================
    */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navContainer =
        document.querySelector(".nav-container");

    const navLinks =
        document.querySelectorAll(".nav-container a");

    if (menuToggle && navContainer) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("open");

            navContainer.classList.toggle("open");
        });

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("open");

                navContainer.classList.remove("open");

            });

        });

    }

    /*
    ==========================================
    SCROLL HEADER
    ==========================================
    */

    const header =
        document.querySelector(".header");

    let ticking = false;

    window.addEventListener(
        "scroll",
        () => {

            if (ticking) return;

            ticking = true;

            requestAnimationFrame(() => {

                header.classList.toggle(
                    "scrolled",
                    window.scrollY > 50
                );

                ticking = false;

            });

        },
        { passive: true }
    );

    /*
    ==========================================
    YEARS COUNTER
    ==========================================
    */

    const foundationYear = 2016;

    const currentYear =
        new Date().getFullYear();

    const years =
        currentYear - foundationYear;

    const yearsElement =
        document.getElementById(
            "dynamic-years"
        );

    if (yearsElement) {
        yearsElement.textContent = years;
    }

});