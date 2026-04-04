document.addEventListener('DOMContentLoaded', function () {
    const SCROLL_OFFSET = 88;
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navBackdrop = document.getElementById('navBackdrop');
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function setNavOpen(open) {
        if (!header || !navToggle) return;
        header.classList.toggle('nav-open', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        if (navBackdrop) {
            navBackdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
        }
        document.body.style.overflow = open ? 'hidden' : '';
    }

    function closeNav() {
        setNavOpen(false);
    }

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            setNavOpen(!header.classList.contains('nav-open'));
        });
    }

    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeNav);
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth > 900) {
            closeNav();
        }
    });

    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', function (e) {
            e.preventDefault();
            const home = document.querySelector('#home');
            if (home) {
                window.scrollTo({
                    top: home.offsetTop - SCROLL_OFFSET,
                    behavior: 'smooth',
                });
                history.pushState(null, '', '#home');
            }
            closeNav();
            navLinks.forEach(function (l) {
                l.classList.remove('active');
            });
            const homeLink = document.querySelector('.nav-links a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && header && header.classList.contains('nav-open')) {
            closeNav();
        }
    });

    function updateActiveLink() {
        let current = '';
        const y = window.scrollY;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            if (y >= sectionTop - SCROLL_OFFSET) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink);

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - SCROLL_OFFSET,
                    behavior: 'smooth',
                });
                navLinks.forEach(function (l) {
                    l.classList.remove('active');
                });
                link.classList.add('active');
                history.pushState(null, '', targetId);
            }
            closeNav();
        });
    });

    window.addEventListener('scroll', function () {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        const currentTheme =
            localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        if (currentTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggle.addEventListener('click', function () {
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                if (icon) icon.classList.replace('fa-sun', 'fa-moon');
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                if (icon) icon.classList.replace('fa-moon', 'fa-sun');
            }
        });
    }

    const footerYear = document.getElementById('footerYear');
    if (footerYear) {
        footerYear.textContent = String(new Date().getFullYear());
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fadeElements = document.querySelectorAll('.fade-in');

    if (!prefersReducedMotion) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.1 }
        );

        fadeElements.forEach(function (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    } else {
        fadeElements.forEach(function (element) {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }
});
