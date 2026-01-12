// ============================================
// Theme Toggle (Light/Dark Mode) - Tailwind CSS
// ============================================

// Get theme toggle button
const themeToggle = document.getElementById('themeToggle');
const moonIcon = document.getElementById('moonIcon');
const sunIcon = document.getElementById('sunIcon');
const htmlElement = document.documentElement;

// Function to set theme
function setTheme(theme) {
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
        if (moonIcon) moonIcon.classList.add('hidden');
        if (sunIcon) sunIcon.classList.remove('hidden');
    } else {
        htmlElement.classList.remove('dark');
        if (moonIcon) moonIcon.classList.remove('hidden');
        if (sunIcon) sunIcon.classList.add('hidden');
    }
    localStorage.setItem('theme', theme);
}

// Function to get saved theme or default to light
function getTheme() {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
}

// Initialize theme on page load
const currentTheme = getTheme();
setTheme(currentTheme);

// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = htmlElement.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

// ============================================
// Mobile Navigation Toggle
// ============================================

// Get the navigation toggle button and menu
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

// Toggle mobile menu when button is clicked
if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================

// Add smooth scrolling behavior to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll Animation for Sections
// ============================================

// Add fade-in animation when sections come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// ============================================
// Tech Stack Cards Animation
// ============================================

// Separate observer for tech cards with staggered animation
const techCardObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const techCardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger the animation with a delay based on card index
            setTimeout(() => {
                entry.target.classList.add('animate-in');
            }, index * 100); // 100ms delay between each card
            techCardObserver.unobserve(entry.target);
        }
    });
}, techCardObserverOptions);

// Observe all tech cards
const techCards = document.querySelectorAll('.tech-card');
techCards.forEach(card => {
    techCardObserver.observe(card);
});

// ============================================
// Active Navigation Link Highlighting
// ============================================

// Update active nav link based on scroll position
const navLinks = document.querySelectorAll('.nav-link, .mobile-menu a');
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
