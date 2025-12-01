// Theme Toggle Functionality
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

// Check for saved theme in localStorage or respect OS preference
const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    updateThemeIcon('fa-sun');
} else {
    body.classList.remove('dark-theme');
    updateThemeIcon('fa-moon');
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        updateThemeIcon('fa-moon');
    }
});

function updateThemeIcon(iconClass) {
    const icon = themeToggleBtn.querySelector('i');
    icon.className = `fas ${iconClass}`;
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
function handleFormSubmit(event) {
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Show a message to the user that the form is being submitted
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Allow Formspree to handle the form submission completely
    // Reset button state after a delay to allow for form submission
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 3000); // Delay of 3 seconds to allow for form submission
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    // Handle successful form submission
    const formAction = contactForm.getAttribute('action');
    if (formAction && formAction.includes('formspree.io')) {
        // Listen for form submission success
        contactForm.addEventListener('submit', function(e) {
            // Since Formspree handles the submission, we rely on their processing
            // Optionally, we can add success feedback here if needed
        });
    }
}

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-category, .portfolio-card, .service-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animated elements
document.querySelectorAll('.skill-category, .portfolio-card, .service-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Add active class to nav links when scrolling to sections
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Portfolio filtering functionality (if needed in the future)
function filterPortfolio(category) {
    const cards = document.querySelectorAll('.portfolio-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add active state to buttons when clicked
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        filterPortfolio(category);
    });
});