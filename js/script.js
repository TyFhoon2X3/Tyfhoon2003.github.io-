// Theme switching
function setTheme(theme) {
    document.body.className = `theme-${theme}`;
    localStorage.setItem('theme', theme);
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'blue';
    setTheme(savedTheme);
    
    // Update active theme button
    updateThemeButtonStates(savedTheme);
    
    // Add smooth scrolling for navigation links
    setupSmoothScroll();
    
    // Add animation to sections on scroll
    setupScrollAnimation();
});

// Update theme button active states
function updateThemeButtonStates(activeTheme) {
    const buttons = document.querySelectorAll('.theme-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`.theme-btn.${activeTheme}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Scroll animation for sections
function setupScrollAnimation() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Highlight navigation link based on current section
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add copy to clipboard functionality for contact info
function setupCopyToClipboard() {
    const contactLinks = document.querySelectorAll('.contact-detail-item a, .contact-detail-item p');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const text = this.textContent;
            if (text && !text.startsWith('http')) {
                e.preventDefault();
                navigator.clipboard.writeText(text).then(() => {
                    showNotification('Copied to clipboard!');
                });
            }
        });
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary), var(--cyan));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (if we add search later)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Add search focus here if needed
    }
    
    // Ctrl/Cmd + Number to switch themes
    if (e.ctrlKey || e.metaKey) {
        const themes = ['blue', 'ocean', 'sunset', 'forest', 'midnight'];
        const key = parseInt(e.key);
        if (key >= 1 && key <= 5) {
            e.preventDefault();
            setTheme(themes[key - 1]);
            updateThemeButtonStates(themes[key - 1]);
        }
    }
});

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }
    
    nav a.active {
        color: var(--primary);
        border-bottom: 2px solid var(--primary);
    }
`;
document.head.appendChild(style);

// Call setup functions
setTimeout(() => {
    setupCopyToClipboard();
}, 500);
