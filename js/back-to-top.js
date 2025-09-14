// Initialize floating arrow
function initFloatingArrow() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    // Show/hide button based on scroll position
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    // Initial check
    toggleBackToTop();
    
    // Listen for scroll events with throttling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(toggleBackToTop, 100);
    });
    
    // Smooth scroll to top when clicked
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (typeof gsap !== 'undefined') {
            gsap.to(window, {
                duration: 1,
                scrollTo: 0,
                ease: "power2.inOut"
            });
        } else {
            // Fallback for when GSAP is not available
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFloatingArrow();
});


// Initialize floating arrow
function initFloatingArrow() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    // Show/hide button based on scroll position
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    // Initial check
    toggleBackToTop();
    
    // Listen for scroll events with throttling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(toggleBackToTop, 100);
    });
    
    // Smooth scroll to top when clicked
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (typeof gsap !== 'undefined') {
            gsap.to(window, {
                duration: 1,
                scrollTo: 0,
                ease: "power2.inOut"
            });
        } else {
            // Fallback for when GSAP is not available
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFloatingArrow();
});