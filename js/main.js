// Initialize page loader
const pageLoader = document.getElementById('pageLoader');
const loadingProgress = document.getElementById('loadingProgress');
const loadingPercentage = document.getElementById('loadingPercentage');
const loadingMessage = document.getElementById('loadingMessage');

const messages = [
    "Loading game assets...",
    "Initializing graphics engine...",
    "Optimizing performance...",
    "Preparing controllers...",
    "Connecting to servers...",
    "Finalizing setup..."
];

// Simulate loading progress
let progress = 0;
const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 1;
    
    if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Hide loader and show content
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 800);
        }, 500);
    }
    
    // Update progress bar
    loadingProgress.style.width = `${progress}%`;
    loadingPercentage.textContent = `${progress}%`;
    
    // Update message every 20% progress
    if (progress % 20 === 0) {
        const messageIndex = Math.floor(progress / 20) - 1;
        if (messageIndex < messages.length) {
            loadingMessage.textContent = messages[messageIndex];
        }
    }
}, 100);

// Check WebGL support
function checkWebGLSupport() {
    try {
        const canvas = document.createElement('canvas');
        return !!window.WebGLRenderingContext && 
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
        return false;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const webglFallback = document.getElementById('webgl-fallback');
    const continueBtn = document.getElementById('continue-btn');
    const themeToggle = document.getElementById('themeToggle');
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        themeToggle.innerHTML = isLightMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Check WebGL support
    if (!checkWebGLSupport()) {
        webglFallback.style.display = 'block';
        return;
    }
    
    // Wait for Three.js to load
    if (typeof THREE !== 'undefined') {
        initBackground();
        initGlobe();
        initAnimations();
    } else {
        // Three.js failed to load
        webglFallback.style.display = 'block';
    }
    
    // Continue without WebGL
    continueBtn.addEventListener('click', () => {
        webglFallback.style.display = 'none';
        initAnimations();
    });
    
    // Initialize service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('Service Worker registered', reg))
                .catch(err => console.log('Service Worker registration failed', err));
        });
    }
});

// Initialize animations with GSAP
function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate hero elements
    gsap.from('.logo', {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: "power3.out"
    });
    
    gsap.from('.hero-title', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: "power3.out"
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: "power3.out"
    });
    
    gsap.from('.btn-liquid', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        delay: 0.7,
        ease: "power3.out"
    });
    
    // Animate game cards
    gsap.from('.game-card', {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.games-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        ease: "power3.out"
    });
}

// esport log

  document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('moneyForm');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const day = document.getElementById('date').value;
                const budget = document.getElementById('budget').value;
                
                // Simple validation
                if (!name || !email || !day || !budget) {
                    alert('Please fill in all fields');
                    return;
                }
                
                // Show loading state
                const submitBtn = form.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    alert(`Thanks ${name}! We've received your information and will contact you soon to discuss your $${budget} ESPORTS project.`);
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        });
// Hero title 3D scroll effect
  window.addEventListener("scroll", () => {
    const title = document.querySelector(".hero-title");
    if (!title) return;

    // Scroll value between -15 and 15 degrees for smooth movement
    const scrollFactor = window.scrollY / window.innerHeight;
    const rotateY = Math.sin(scrollFactor) * 15; 
    const rotateX = Math.cos(scrollFactor) * 10; 

    // Apply transform for 3D effect
    title.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
});
