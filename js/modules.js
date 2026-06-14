/* ============================================
   MODULES.JS - Master JavaScript (No external fetch)
   ============================================ */

(function() {
    'use strict';

    // ==================== PROGRESS TRACKING ====================
    function initProgressTracking() {
        const progressFill = document.getElementById('progressFill');
        if (!progressFill) return;

        function updateProgress() {
            const sections = document.querySelectorAll('.section');
            const scrollPosition = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrollPosition / documentHeight) * 100;

            progressFill.style.width = `${scrollPercentage}%`;

            let visibleSection = 0;
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight / 2) {
                    visibleSection = index + 1;
                }
            });

            const progressPercent = document.getElementById('progressPercent');
            if (progressPercent) {
                progressPercent.textContent = `${Math.round(scrollPercentage)}%`;
            }
        }

        window.addEventListener('scroll', updateProgress);
        window.addEventListener('load', updateProgress);
    }

    // ==================== QUIZ HANDLER ====================
    function initQuizHandler() {
        document.addEventListener('click', function(e) {
            const quizOption = e.target.closest('.quiz-option');
            if (!quizOption) return;

            const container = quizOption.closest('.quiz-box');
            if (!container) return;

            const options = container.querySelectorAll('.quiz-option');
            let feedback = container.querySelector('.quiz-feedback');

            // Create feedback div if it doesn't exist
            if (!feedback) {
                feedback = document.createElement('div');
                feedback.className = 'quiz-feedback';
                container.appendChild(feedback);
            }

            options.forEach(opt => opt.classList.remove('selected'));
            quizOption.classList.add('selected');

            const isCorrect = quizOption.getAttribute('data-correct') === 'true';

            feedback.textContent = isCorrect ? '✓ Correct! Well done.' : '✗ Incorrect. Review the material and try again.';
            feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        });
    }

    // ==================== PDF DOWNLOAD ====================
    function initPdfDownload() {
        const downloadBtn = document.getElementById('downloadPdf');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function() {
                window.print();
            });
        }
    }

    // ==================== SMOOTH SCROLLING ====================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (!targetId || targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==================== ACTIVE SIDEBAR LINK ====================
    function initActiveSidebarLink() {
        function updateActiveSidebarLink() {
            const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
            const sections = document.querySelectorAll('.section');
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                    currentSection = '#' + section.id;
                }
            });

            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentSection) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveSidebarLink);
        window.addEventListener('load', updateActiveSidebarLink);
    }

    // ==================== BREADCRUMB UPDATE ====================
    function initBreadcrumb() {
        const breadcrumbSpan = document.getElementById('page-title');
        if (breadcrumbSpan) {
            const pageTitle = document.title.split('|')[0].trim();
            breadcrumbSpan.textContent = pageTitle;
        }
    }

    // ==================== MOBILE NAVIGATION TOGGLE ====================
    function initMobileNav() {
        const toggleBtn = document.querySelector('.nav-mobile-toggle');
        const menu = document.querySelector('.global-nav-menu');
        
        if (toggleBtn && menu) {
            toggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                menu.classList.toggle('active');
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const menu = document.querySelector('.global-nav-menu');
            const toggle = document.querySelector('.nav-mobile-toggle');
            if (menu && menu.classList.contains('active')) {
                if (!e.target.closest('.global-nav')) {
                    menu.classList.remove('active');
                }
            }
        });
        
        // Mobile submenu dropdowns
        const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    const parentLi = toggle.closest('.nav-item');
                    if (parentLi) {
                        parentLi.classList.toggle('active');
                    }
                }
            });
        });
    }

    // ==================== DESKTOP DROPDOWN HOVER ====================
    function initDesktopDropdowns() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            const hasSubmenu = item.querySelector('.nav-submenu');
            if (hasSubmenu) {
                item.addEventListener('mouseenter', function() {
                    if (window.innerWidth > 992) {
                        this.classList.add('active');
                    }
                });
                item.addEventListener('mouseleave', function() {
                    if (window.innerWidth > 992) {
                        this.classList.remove('active');
                    }
                });
            }
        });
    }

    // ==================== INITIALIZE ALL ====================
    document.addEventListener('DOMContentLoaded', function() {
        initMobileNav();
        initDesktopDropdowns();
        initProgressTracking();
        initQuizHandler();
        initPdfDownload();
        initSmoothScroll();
        initActiveSidebarLink();
        initBreadcrumb();
    });
})();
