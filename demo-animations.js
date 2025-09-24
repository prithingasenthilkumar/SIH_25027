// Demo script to showcase all animations and transitions

class AnimationDemo {
    constructor() {
        this.init();
    }

    init() {
        this.createDemoPanel();
        this.setupDemoControls();
    }

    createDemoPanel() {
        const demoPanel = document.createElement('div');
        demoPanel.id = 'animationDemo';
        demoPanel.innerHTML = `
            <div class="demo-panel">
                <h3>🎨 Animation Demo Panel</h3>
                <div class="demo-controls">
                    <button class="demo-btn" onclick="animationDemo.showPageTransition()">Page Transition</button>
                    <button class="demo-btn" onclick="animationDemo.showStaggerAnimation()">Stagger Cards</button>
                    <button class="demo-btn" onclick="animationDemo.showFloatingEffect()">Floating Effect</button>
                    <button class="demo-btn" onclick="animationDemo.showPulseEffect()">Pulse Effect</button>
                    <button class="demo-btn" onclick="animationDemo.showGlowEffect()">Glow Effect</button>
                    <button class="demo-btn" onclick="animationDemo.showBounceEffect()">Bounce Effect</button>
                    <button class="demo-btn" onclick="animationDemo.showScaleEffect()">Scale Effect</button>
                    <button class="demo-btn" onclick="animationDemo.showRotateEffect()">Rotate Effect</button>
                    <button class="demo-btn" onclick="animationDemo.showShakeEffect()">Shake Effect</button>
                    <button class="demo-btn" onclick="animationDemo.showTypewriterEffect()">Typewriter</button>
                    <button class="demo-btn" onclick="animationDemo.showNotification()">Notification</button>
                    <button class="demo-btn" onclick="animationDemo.showProgressBar()">Progress Bar</button>
                    <button class="demo-btn" onclick="animationDemo.toggleDemoPanel()">Hide Panel</button>
                </div>
                <div class="demo-target" id="demoTarget">
                    <h4>Demo Target Element</h4>
                    <p>This element will be animated based on your selection.</p>
                </div>
            </div>
        `;

        // Add styles for demo panel
        const demoStyles = `
            #animationDemo {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 1rem;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                max-width: 300px;
                transition: all 0.3s ease;
            }
            
            #animationDemo.hidden {
                transform: translateX(320px);
                opacity: 0;
            }
            
            .demo-panel h3 {
                margin: 0 0 1rem 0;
                color: #4CAF50;
                text-align: center;
            }
            
            .demo-controls {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .demo-btn {
                background: #4CAF50;
                color: white;
                border: none;
                padding: 0.5rem;
                border-radius: 8px;
                cursor: pointer;
                font-size: 0.8rem;
                transition: all 0.3s ease;
            }
            
            .demo-btn:hover {
                background: #45a049;
                transform: translateY(-2px);
            }
            
            .demo-target {
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 10px;
                text-align: center;
                border: 2px dashed #ddd;
            }
            
            .demo-target h4 {
                margin: 0 0 0.5rem 0;
                color: #333;
            }
            
            .demo-target p {
                margin: 0;
                color: #666;
                font-size: 0.9rem;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = demoStyles;
        document.head.appendChild(styleSheet);

        document.body.appendChild(demoPanel);
    }

    setupDemoControls() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                this.toggleDemoPanel();
            }
        });
    }

    showPageTransition() {
        const target = document.getElementById('demoTarget');
        target.style.opacity = '0';
        target.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            target.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
        }, 100);
    }

    showStaggerAnimation() {
        const cards = document.querySelectorAll('.dashboard-card, .feature-card, .step');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    showFloatingEffect() {
        const target = document.getElementById('demoTarget');
        target.classList.add('floating');
        setTimeout(() => target.classList.remove('floating'), 3000);
    }

    showPulseEffect() {
        const target = document.getElementById('demoTarget');
        target.classList.add('pulse');
        setTimeout(() => target.classList.remove('pulse'), 2000);
    }

    showGlowEffect() {
        const target = document.getElementById('demoTarget');
        target.classList.add('glow');
        setTimeout(() => target.classList.remove('glow'), 3000);
    }

    showBounceEffect() {
        const target = document.getElementById('demoTarget');
        target.classList.add('bounce-in');
        setTimeout(() => target.classList.remove('bounce-in'), 800);
    }

    showScaleEffect() {
        const target = document.getElementById('demoTarget');
        target.classList.add('scale-in');
        setTimeout(() => target.classList.remove('scale-in'), 600);
    }

    showRotateEffect() {
        const target = document.getElementById('demoTarget');
        target.classList.add('rotate-in');
        setTimeout(() => target.classList.remove('rotate-in'), 800);
    }

    showShakeEffect() {
        const target = document.getElementById('demoTarget');
        target.classList.add('shake');
        setTimeout(() => target.classList.remove('shake'), 500);
    }

    showTypewriterEffect() {
        const target = document.getElementById('demoTarget');
        const originalText = target.innerHTML;
        const text = "This is a typewriter effect demonstration!";
        
        target.innerHTML = '<h4>Typewriter Demo</h4><p class="typewriter-demo"></p>';
        const typewriterElement = target.querySelector('.typewriter-demo');
        
        if (window.pageTransitions) {
            window.pageTransitions.typeWriter(typewriterElement, text, 50);
        }
        
        setTimeout(() => {
            target.innerHTML = originalText;
        }, 5000);
    }

    showNotification() {
        if (window.pageTransitions) {
            window.pageTransitions.showNotification('This is a demo notification with smooth animations!', 'success');
        }
    }

    showProgressBar() {
        const target = document.getElementById('demoTarget');
        const originalContent = target.innerHTML;
        
        target.innerHTML = `
            <h4>Progress Bar Demo</h4>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%;"></div>
            </div>
            <p>Watch the progress bar animate!</p>
        `;
        
        setTimeout(() => {
            const progressFill = target.querySelector('.progress-fill');
            progressFill.style.width = '85%';
        }, 500);
        
        setTimeout(() => {
            target.innerHTML = originalContent;
        }, 4000);
    }

    toggleDemoPanel() {
        const panel = document.getElementById('animationDemo');
        panel.classList.toggle('hidden');
    }

    // Advanced animation combinations
    showComboAnimation() {
        const target = document.getElementById('demoTarget');
        
        // Combine multiple effects
        target.classList.add('bounce-in', 'glow');
        
        setTimeout(() => {
            target.classList.add('floating');
        }, 800);
        
        setTimeout(() => {
            target.classList.remove('bounce-in', 'glow', 'floating');
        }, 4000);
    }

    // Particle effect simulation
    createParticleEffect() {
        const target = document.getElementById('demoTarget');
        const rect = target.getBoundingClientRect();
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #4CAF50;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10001;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                animation: particleExplode 1s ease-out forwards;
            `;
            
            particle.style.setProperty('--random-x', (Math.random() - 0.5) * 200 + 'px');
            particle.style.setProperty('--random-y', (Math.random() - 0.5) * 200 + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    }

    // Morphing shape animation
    showMorphingShape() {
        const target = document.getElementById('demoTarget');
        const originalContent = target.innerHTML;
        
        target.innerHTML = `
            <div class="morphing-shape"></div>
            <p>Watch the shape morph!</p>
        `;
        
        const shape = target.querySelector('.morphing-shape');
        shape.style.cssText = `
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #4CAF50, #45a049);
            margin: 1rem auto;
            transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            border-radius: 50%;
        `;
        
        setTimeout(() => {
            shape.style.borderRadius = '10px';
            shape.style.transform = 'rotate(45deg) scale(1.5)';
            shape.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
        }, 500);
        
        setTimeout(() => {
            shape.style.borderRadius = '50%';
            shape.style.transform = 'rotate(0deg) scale(1)';
            shape.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
        }, 2000);
        
        setTimeout(() => {
            target.innerHTML = originalContent;
        }, 3500);
    }
}

// Add particle explosion keyframes
const particleStyles = `
    @keyframes particleExplode {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--random-x), var(--random-y)) scale(0);
        }
    }
`;

const particleStyleSheet = document.createElement('style');
particleStyleSheet.textContent = particleStyles;
document.head.appendChild(particleStyleSheet);

// Initialize demo when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Only show demo panel in development or when specifically requested
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === 'true' || localStorage.getItem('showAnimationDemo') === 'true') {
        window.animationDemo = new AnimationDemo();
    }
});

// Add demo toggle to console
console.log('🎨 Animation Demo Available!');
console.log('To show demo panel: localStorage.setItem("showAnimationDemo", "true"); location.reload();');
console.log('Or add ?demo=true to URL');
console.log('Keyboard shortcut: Ctrl+D to toggle demo panel');