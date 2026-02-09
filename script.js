// ===========================
// BRUTALIST PORTFOLIO SCRIPT
// ===========================

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let outlineX = 0;
let outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorDot.style.left = cursorX + 'px';
    cursorDot.style.top = cursorY + 'px';
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, .work-item, .skill-item, .contact-link');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('active');
    });
    
    element.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('active');
    });
});

// Kinetic Typography - Mouse Movement Effect
const kineticTexts = document.querySelectorAll('.kinetic-text');

document.addEventListener('mousemove', (e) => {
    const mouseXPercent = e.clientX / window.innerWidth;
    const mouseYPercent = e.clientY / window.innerHeight;
    
    kineticTexts.forEach(text => {
        const speed = parseFloat(text.dataset.speed) || 0.5;
        const x = (mouseXPercent - 0.5) * 50 * speed;
        const y = (mouseYPercent - 0.5) * 50 * speed;
        
        text.style.transform = `translate(${x}px, ${y}px) skew(${x * 0.1}deg)`;
    });
});

// Split Text Animation
const splitTexts = document.querySelectorAll('.split-text');

splitTexts.forEach(text => {
    const content = text.textContent;
    text.innerHTML = '';
    
    content.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `all 0.5s ease ${index * 0.03}s`;
        text.appendChild(span);
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('split-text')) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                });
            }
            
            if (entry.target.classList.contains('work-item')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            
            if (entry.target.classList.contains('skill-item')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        }
    });
}, observerOptions);

// Observe elements
splitTexts.forEach(text => observer.observe(text));

const workItems = document.querySelectorAll('.work-item');
workItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.8s ease';
    observer.observe(item);
});

const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.8s ease';
    observer.observe(item);
});

// Work Item Tilt Effect
workItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax Background Text
const bgTextItems = document.querySelectorAll('.bg-text-item');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    bgTextItems.forEach((item, index) => {
        const speed = 0.5 + (index * 0.1);
        item.style.transform = `translateX(${scrolled * speed * 0.1}px)`;
    });
});

// Nav Background on Scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    } else {
        nav.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
    }
    
    lastScroll = currentScroll;
});

// Random Glitch Effect on Hero Title
const heroTitle = document.querySelector('.hero-title');
let glitchInterval;

function randomGlitch() {
    const kineticTexts = heroTitle.querySelectorAll('.kinetic-text');
    const randomText = kineticTexts[Math.floor(Math.random() * kineticTexts.length)];
    
    randomText.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) skew(${Math.random() * 10 - 5}deg)`;
    randomText.style.color = Math.random() > 0.5 ? 'var(--color-accent)' : 'var(--color-text)';
    
    setTimeout(() => {
        randomText.style.color = 'var(--color-text)';
    }, 100);
}

// Trigger random glitch every 3-5 seconds
function scheduleGlitch() {
    const delay = 3000 + Math.random() * 2000;
    setTimeout(() => {
        randomGlitch();
        scheduleGlitch();
    }, delay);
}

scheduleGlitch();

// Current Time Display
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

updateTime();
setInterval(updateTime, 1000);

// Add noise texture effect
function createNoiseOverlay() {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            const value = Math.random() * 255;
            ctx.fillStyle = `rgba(${value}, ${value}, ${value}, 0.02)`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
    
    document.body.style.backgroundImage = `url(${canvas.toDataURL()})`;
    document.body.style.backgroundRepeat = 'repeat';
}

createNoiseOverlay();

// Typing effect restart on scroll
let typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const typewriter = entry.target.querySelector('.typewriter');
            if (typewriter) {
                typewriter.style.animation = 'none';
                setTimeout(() => {
                    typewriter.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
                }, 10);
            }
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    typingObserver.observe(heroSection);
}

// Add dynamic border animation to work items
workItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    
    item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.work-image-overlay');
        overlay.style.animation = 'pulse 1s ease-in-out infinite';
    });
    
    item.addEventListener('mouseleave', () => {
        const overlay = item.querySelector('.work-image-overlay');
        overlay.style.animation = 'none';
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(style);

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: 100, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -100, behavior: 'smooth' });
    }
});

// Log initialization
console.log('%c BRUTALIST PORTFOLIO LOADED ', 'background: #ff3366; color: #ffffff; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Designed with passion and raw aesthetics ', 'background: #0a0a0a; color: #00ff88; font-size: 12px; padding: 5px;');
