// Advanced Page Transitions and Animations

class PageTransitions {
    constructor() {
        this.init();
    }

    init() {
        this.setupPageTransitions();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupFormAnimations();
        this.setupLoadingAnimations();
        this.setupParallaxEffects();
    }

    // Smooth page transitions
    setupPageTransitions() {
        // Add transition class to body on page load
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('page-transition');
            this.animateOnLoad();
        });

        // Handle link clicks for smooth transitions
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link && link.hostname === window.location.hostname && !link.hasAttribute('target')) {
                e.preventDefault();
                this.transitionToPage(link.href);
            }
        });
    }

    // Animate elements on page load
    animateOnLoad() {
        // Stagger animation for cards
        const cards = document.querySelectorAll('.dashboard-card, .feature-card, .step');
        cards.forEach((card, index) => {
            card.classList.add('stagger-animation');
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Animate hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in-up');
        }

        // Animate navigation
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.add('slide-in-left');
        }
    }

    // Smooth page transition
    transitionToPage(url) {
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(-20px)';
        document.body.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        setTimeout(() => {
            window.location.href = url;
        }, 400);
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animateElements = document.querySelectorAll(
            '.dashboard-card, .feature-card, .step, .content-card, .timeline-item'
        );
        
        animateElements.forEach(el => {
            el.classList.add('fade-in-up');
            observer.observe(el);
        });
    }

    // Enhanced hover effects
    setupHoverEffects() {
        // Add enhanced card class to relevant elements
        const cards = document.querySelectorAll('.dashboard-card, .feature-card, .content-card');
        cards.forEach(card => {
            card.classList.add('enhanced-card', 'hover-lift');
        });

        // Add animated button class to buttons
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(btn => {
            btn.classList.add('animated-btn', 'ripple-effect');
        });

        // Add floating animation to specific elements
        const floatingElements = document.querySelectorAll('.qr-scanner, .hero-content h1');
        floatingElements.forEach(el => {
            el.classList.add('floating');
        });
    }

    // Form input animations
    setupFormAnimations() {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.add('animated-input');

            // Add focus animations
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });

            // Add validation animations
            input.addEventListener('invalid', () => {
                input.classList.add('shake');
                setTimeout(() => input.classList.remove('shake'), 500);
            });
        });
    }

    // Loading animations
    setupLoadingAnimations() {
        // Show loading spinner during form submissions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.innerHTML = '<div class="loading-spinner"></div>';
                    submitBtn.disabled = true;
                }
            });
        });
    }

    // Parallax effects
    setupParallaxEffects() {
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    // Notification system with animations
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => notification.remove(), 500);
        }, 5000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('hide');
            setTimeout(() => notification.remove(), 500);
        });
    }

    // Progress bar animation
    animateProgressBar(element, targetWidth) {
        const progressFill = element.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${targetWidth}%`;
        }
    }

    // Typewriter effect
    typeWriter(element, text, speed = 50) {
        element.innerHTML = '';
        element.classList.add('typewriter');
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }

    // Smooth scroll to element
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Add glow effect to elements
    addGlowEffect(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.classList.add('glow'));
    }

    // Bounce animation
    bounceElement(element) {
        element.classList.add('bounce-in');
        setTimeout(() => element.classList.remove('bounce-in'), 800);
    }

    // Scale animation
    scaleElement(element) {
        element.classList.add('scale-in');
        setTimeout(() => element.classList.remove('scale-in'), 600);
    }

    // Rotate animation
    rotateElement(element) {
        element.classList.add('rotate-in');
        setTimeout(() => element.classList.remove('rotate-in'), 800);
    }
}

// Dashboard-specific animations
class DashboardAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animateDashboardCards();
        this.setupStatCounters();
        this.setupChartAnimations();
    }

    animateDashboardCards() {
        const cards = document.querySelectorAll('.dashboard-card');
        cards.forEach((card, index) => {
            card.classList.add('dashboard-card-animated');
            card.style.animationDelay = `${index * 0.15}s`;
        });
    }

    setupStatCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }

    setupChartAnimations() {
        // Animate progress bars in charts
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const targetWidth = bar.dataset.width || 0;
            setTimeout(() => {
                pageTransitions.animateProgressBar(bar, targetWidth);
            }, 500);
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pageTransitions = new PageTransitions();
    
    // Initialize dashboard animations if on dashboard page
    if (document.querySelector('.dashboard')) {
        new DashboardAnimations();
    }
});

// Add CSS for notifications
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 300px;
    }
    
    .notification-success {
        border-left: 4px solid #4CAF50;
    }
    
    .notification-error {
        border-left: 4px solid #f44336;
    }
    
    .notification-warning {
        border-left: 4px solid #ff9800;
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
        margin-left: 1rem;
    }
    
    .notification-close:hover {
        color: #333;
    }
    
    .animate-in {
        animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    .focused {
        transform: scale(1.02);
        transition: transform 0.3s ease;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);