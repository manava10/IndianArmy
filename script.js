// ===========================
// Navigation Toggle
// ===========================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Scroll Animation (AOS Alternative)
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ===========================
// Counter Animation for Stats
// ===========================
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
};

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statCards = document.querySelectorAll('.stat-card h3');
            
            // Animate each counter
            setTimeout(() => {
                if (statCards[0]) {
                    statCards[0].textContent = '0';
                    animateCounter(statCards[0], 1400000);
                }
            }, 200);
            
            setTimeout(() => {
                if (statCards[1]) {
                    statCards[1].textContent = '0';
                    animateCounter(statCards[1], 75);
                }
            }, 400);
            
            setTimeout(() => {
                if (statCards[2]) {
                    statCards[2].textContent = '0';
                    animateCounter(statCards[2], 21);
                }
            }, 600);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    counterObserver.observe(heroStats);
}

// ===========================
// Card Hover 3D Effect
// ===========================
document.querySelectorAll('.card, .hero-card, .commission-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===========================
// Parallax Effect for Hero
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroInsignia = document.querySelector('.hero-insignia');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
    
    if (heroInsignia) {
        heroInsignia.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.2}deg)`;
    }
});

// ===========================
// Timeline Progress Animation
// ===========================
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// ===========================
// War Cards Sequential Animation
// ===========================
const warCards = document.querySelectorAll('.war-card');
const warObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

warCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-50px)';
    warObserver.observe(card);
});

// ===========================
// Active Navigation Link on Scroll
// ===========================
const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// ===========================
// Cursor Trail Effect
// ===========================
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ===========================
// Random Quote Generator for Heroes
// ===========================
const quotes = [
    "Service Before Self",
    "Victory is Our Destiny",
    "Valor is our Tradition",
    "We Stand Tall",
    "Never Give Up"
];

// ===========================
// Easter Egg: Konami Code
// ===========================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 3s linear infinite';
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }
});

// ===========================
// Loading Animation with Progress Bar
// ===========================
window.addEventListener('load', () => {
    // Remove loading overlay if exists
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 1000);
    }
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Scroll Progress Bar
// ===========================
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.transform = `scaleX(${progress / 100})`;
    });
};

createScrollProgress();

// ===========================
// Scroll to Top Button (Optional)
// ===========================
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.pointerEvents = 'all';
        } else {
            button.style.opacity = '0';
            button.style.pointerEvents = 'none';
        }
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(button);
};

createScrollTopButton();

// ===========================
// Info Banner Animation
// ===========================
const infoItems = document.querySelectorAll('.info-item');
infoItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        item.style.transition = 'all 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, 200 * index);
});

// ===========================
// Typed Text Effect (Optional)
// ===========================
const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.innerHTML = '';
    
    const typing = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    };
    
    typing();
};

// ===========================
// Dark Mode Toggle (Bonus Feature)
// ===========================
const createDarkModeToggle = () => {
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙';
    toggle.className = 'dark-mode-toggle';
    toggle.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--text-light);
        color: var(--text-dark);
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.8;
        transition: all 0.3s ease;
        z-index: 998;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    let isDark = false;
    
    toggle.addEventListener('click', () => {
        isDark = !isDark;
        
        if (isDark) {
            toggle.innerHTML = '☀️';
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
            document.querySelectorAll('img').forEach(img => {
                img.style.filter = 'invert(1) hue-rotate(180deg)';
            });
        } else {
            toggle.innerHTML = '🌙';
            document.body.style.filter = 'none';
            document.querySelectorAll('img').forEach(img => {
                img.style.filter = 'none';
            });
        }
    });
    
    toggle.addEventListener('mouseenter', () => {
        toggle.style.opacity = '1';
        toggle.style.transform = 'scale(1.1)';
    });
    
    toggle.addEventListener('mouseleave', () => {
        toggle.style.opacity = '0.8';
        toggle.style.transform = 'scale(1)';
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            toggle.style.opacity = '0.8';
            toggle.style.pointerEvents = 'all';
        } else {
            toggle.style.opacity = '0';
            toggle.style.pointerEvents = 'none';
        }
    });
    
    document.body.appendChild(toggle);
};

createDarkModeToggle();

// ===========================
// Confetti Effect for Special Occasions
// ===========================
const createConfetti = () => {
    const colors = ['#ff9933', '#138808', '#000080', '#d4af37'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random()};
            transform: rotate(${Math.random() * 360}deg);
            animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
            z-index: 9999;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
    // Add confetti animation if not exists
    if (!document.querySelector('#confetti-animation')) {
        const style = document.createElement('style');
        style.id = 'confetti-animation';
        style.textContent = `
            @keyframes confetti-fall {
                to {
                    top: 100vh;
                    transform: translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 720}deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// Trigger confetti on special clicks (triple click on hero title)
let clickCount = 0;
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 3) {
            createConfetti();
            clickCount = 0;
        }
        setTimeout(() => {
            clickCount = 0;
        }, 1000);
    });
}

// ===========================
// Rank Card Interactions
// ===========================
document.querySelectorAll('.rank-card').forEach(card => {
    card.addEventListener('click', function() {
        // Add a special click effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// ===========================
// Interactive Star Animations
// ===========================
document.querySelectorAll('.insignia-stars, .star-single, .stars-row').forEach(stars => {
    stars.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// ===========================
// Footer Animation on Scroll
// ===========================
const footer = document.querySelector('.footer');
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footer.style.animation = 'fadeInUp 0.8s ease';
        }
    });
}, { threshold: 0.1 });

if (footer) {
    footerObserver.observe(footer);
}

// ===========================
// Dynamic Year Update
// ===========================
const updateYear = () => {
    const yearElements = document.querySelectorAll('.copyright');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.innerHTML = el.innerHTML.replace(/\d{4}/, currentYear);
    });
};
updateYear();

// ===========================
// Section Reveal Animation
// ===========================
const revealSections = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    revealObserver.observe(section);
});

// ===========================
// Rank Badge Hover Effect
// ===========================
document.querySelectorAll('.rank-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ===========================
// Console Easter Egg
// ===========================
console.log('%c🇮🇳 Indian Army Heritage Website 🇮🇳', 'font-size: 20px; color: #ff9933; font-weight: bold;');
console.log('%cService Before Self', 'font-size: 16px; color: #138808; font-style: italic;');
console.log('%cBuilt with ❤️ for the brave soldiers who protect our nation', 'font-size: 12px; color: #000080;');
console.log('%c\n📚 VIT AP University Project\n👨‍💻 Developed by: Dheeraj Rohilla\n🎓 Registration No: 23BCE7130\n', 'font-size: 11px; color: #666; font-family: monospace;');

// ===========================
// Initialize on DOM Load
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animations
    document.querySelectorAll('.section').forEach((section, index) => {
        section.style.opacity = '0';
        setTimeout(() => {
            section.style.transition = 'opacity 0.5s ease';
            section.style.opacity = '1';
        }, index * 100);
    });
    
    // Preload images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });
});

// ===========================
// Performance: Debounce Function
// ===========================
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll events if needed
const debouncedScroll = debounce(() => {
    // Additional scroll handlers can go here
}, 100);

window.addEventListener('scroll', debouncedScroll);
