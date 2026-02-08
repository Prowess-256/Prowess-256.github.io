/* ======================== 
   GLOBAL NAVIGATION FUNCTIONALITY
======================== */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navMenu = document.querySelector('.global-nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('open');
        });
    }
    
    // Dropdown menu functionality
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const link = item.querySelector('> a');
        const submenu = item.querySelector('.nav-submenu');
        
        if (submenu) {
            // Prevent link default behavior for dropdowns
            if (link && link.href === '#' || link.classList.contains('nav-dropdown-toggle')) {
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
    
    // Close menu when clicking on a submenu link
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            // Close mobile menu if open
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
    
    // Set active navigation item based on current page
    setActiveNav();
    
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-item > a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                // Remove active from all items
                navItems.forEach(item => item.classList.remove('active'));
                // Add active to current item
                link.closest('.nav-item').classList.add('active');
            }
        });
    }
    
    // Helper function to close other dropdowns
    function closeOtherDropdowns(currentItem) {
        navItems.forEach(item => {
            if (item !== currentItem && item.querySelector('.nav-submenu')) {
                item.classList.remove('open');
            }
        });
    }
});

