/* ============================================
   MODULES.JS - Master JavaScript
   Includes: Navigation Injection, Dropdowns, Progress Tracking, Quiz Handler, PDF Download
   ============================================ */

(function() {
    'use strict';

    // ==================== LOAD GLOBAL NAVIGATION ====================
    function loadNavigation() {
        const navPlaceholder = document.getElementById('global-nav-placeholder');
        if (navPlaceholder) {
            fetch('global-nav.html')
                .then(response => response.text())
                .then(html => {
                    navPlaceholder.innerHTML = html;
                    // Initialize navigation after it's loaded
                    initNavigation();
                })
                .catch(error => {
                    console.error('Error loading navigation:', error);
                    // Fallback: show basic nav
                    navPlaceholder.innerHTML = '<nav class="global-nav"><div class="global-nav-container"><a href="index.html" class="global-nav-brand">ICT Learning Hub</a></div></nav>';
                    initNavigation();
                });
        } else {
            // If no placeholder, navigation is already in the page
            initNavigation();
        }
    }

    // ==================== NAVIGATION FUNCTIONALITY ====================
    function initNavigation() {
        const mobileToggle = document.querySelector('.nav-mobile-toggle');
        const navMenu = document.querySelector('.global-nav-menu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                navMenu.classList.toggle('open');
            });
        }

        // Dropdown functionality
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            const link = item.querySelector('> a');
            const submenu = item.querySelector('.nav-submenu');

            if (submenu) {
                // Mobile: click to toggle dropdown
                if (link && (link.getAttribute('href') === '#' || link.classList.contains('nav-dropdown-toggle'))) {
                    link.addEventListener('click', function(e) {
                        if (window.innerWidth <= 768) {
                            e.preventDefault();
                            e.stopPropagation();
                            item.classList.toggle('open');
                        }
                    });
                }

                // Desktop: hover behavior
                item.addEventListener('mouseenter', function() {
                    if (window.innerWidth > 768) {
                        closeOtherDropdowns(item);
                        item.classList.add('open');
                    }
                });

                item.addEventListener('mouseleave', function() {
                    if (window.innerWidth > 768) {
                        item.classList.remove('open');
                    }
                });
            }
        });

        // Close mobile menu when clicking a link
        const submenuItems = document.querySelectorAll('.submenu-item');
        submenuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                if (navMenu && window.innerWidth <= 768) {
                    navMenu.classList.remove('open');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu && navMenu.classList.contains('open')) {
                if (!e.target.closest('.global-nav')) {
                    navMenu.classList.remove('open');
                }
            }
        });

        function closeOtherDropdowns(currentItem) {
            navItems.forEach(item => {
                if (item !== currentItem && item.querySelector('.nav-submenu')) {
                    item.classList.remove('open');
                }
            });
        }

        // Set active nav item based on current page
        setActiveNav();

        function setActiveNav() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('.nav-item > a');

            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && (href === currentPage || (currentPage === 'index.html' && href === 'index.html'))) {
                    navItems.forEach(item => item.classList.remove('active'));
                    const parentItem = link.closest('.nav-item');
                    if (parentItem) parentItem.classList.add('active');
                }
            });
        }
    }

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

            const progressText = document.querySelector('.progress-text');
            if (progressText) {
                const totalSections = sections.length;
                progressText.innerHTML = `<span>${Math.round(scrollPercentage)}% Complete</span><span>${visibleSection} of ${totalSections} Sections</span>`;
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
            const feedback = container.querySelector('.quiz-feedback');

            options.forEach(opt => opt.classList.remove('selected'));
            quizOption.classList.add('selected');

            const isCorrect = quizOption.getAttribute('data-correct') === 'true';

            if (feedback) {
                feedback.textContent = isCorrect ? '✓ Correct! Well done.' : '✗ Incorrect. Review the material and try again.';
                feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
            }
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
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
                    
                    const mobileMenu = document.querySelector('.global-nav-menu');
                    if (mobileMenu && mobileMenu.classList.contains('open')) {
                        mobileMenu.classList.remove('open');
                    }
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

    // ==================== INITIALIZE ALL ====================
    document.addEventListener('DOMContentLoaded', function() {
        loadNavigation(); // This will load nav and then init navigation
        initProgressTracking();
        initQuizHandler();
        initPdfDownload();
        initSmoothScroll();
        initActiveSidebarLink();
        initBreadcrumb();
    });
})();
fetch('global-nav.html')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
    })
    .then(html => {
        navPlaceholder.innerHTML = html;
        initNavigation();
    })
    .catch(error => {
        console.error('Error loading navigation:', error);
        navPlaceholder.innerHTML = `<nav class="global-nav"><div class="global-nav-container">
            <a href="index.html" class="global-nav-brand">ICT Learning Hub</a>
            <div style="color:red; font-size:12px;">Navigation temporarily unavailable</div>
        </div></nav>`;
    });
if (!feedback && container) {
    const newFeedback = document.createElement('div');
    newFeedback.className = 'quiz-feedback';
    container.appendChild(newFeedback);
}