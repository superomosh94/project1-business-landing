// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navMenu.classList.remove('active');

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // In a real application, you would send this to your server
        // For now, we'll show a success message
        alert('Thank you! We have received your quote request. We will contact you within 1 hour with a detailed quote.');

        // Reset form
        this.reset();

        // Log data to console (remove in production)
        console.log('Quote Request:', data);

        // Optional: Send to Google Sheets or email service
        // sendToGoogleSheets(data);
    });
}

// Simple animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards for animation
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Price calculator (simple version)
function calculatePrice() {
    // This can be expanded based on selected options
    const serviceSelect = document.querySelector('select');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function () {
            const prices = {
                'landing': '4,000 - 8,000 KES',
                'website': '10,000 - 25,000 KES',
                'system': '15,000 - 40,000 KES',
                'fix': '800 - 2,000 KES'
            };

            const priceDisplay = document.getElementById('priceDisplay');
            if (priceDisplay) {
                priceDisplay.textContent = prices[this.value] || '';
            }
        });
    }
}

// WhatsApp integration
function initWhatsApp() {
    const phoneNumber = '+2547XXXXXXXXX'; // Replace with your number
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hello! I need a quote for a website.')}`;
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #25D366;
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        text-decoration: none;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        transition: all 0.3s;
    `;

    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.transform = 'scale(1.1)';
    });

    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.transform = 'scale(1)';
    });

    document.body.appendChild(whatsappBtn);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    calculatePrice();
    initWhatsApp();

    // Add active class to nav links based on scroll position
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
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
});
