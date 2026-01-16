// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
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
            if (navMenu) navMenu.classList.remove('active');

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
        alert('Thank you! We have received your quote request. We will contact you within 1 hour with a detailed quote.');

        // Reset form
        this.reset();

        // Log data to console (remove in production)
        console.log('Quote Request:', data);
    });
}

// Simple animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .testimonial-card, .process-step, .resource-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
});

// WhatsApp integration
function initWhatsApp() {
    const phoneNumber = '254742666803'; // Updated with user provided number
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

// FAQ Toggle
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');

        answer.classList.toggle('active');
        if (icon) {
            icon.classList.toggle('fa-chevron-up');
            icon.classList.toggle('fa-chevron-down');
        }
    });
});

// Price Calculator logic
const priceModal = document.getElementById("priceCalculatorModal");
const openCalcBtn = document.getElementById("openCalculator");
const closeCalcBtn = document.querySelector("#priceCalculatorModal .close-modal");

if (openCalcBtn && priceModal) {
    openCalcBtn.onclick = function () {
        priceModal.style.display = "block";
    }
}

if (closeCalcBtn && priceModal) {
    closeCalcBtn.onclick = function () {
        priceModal.style.display = "none";
    }
}

window.onclick = function (event) {
    if (event.target == priceModal) {
        priceModal.style.display = "none";
    }
}

function updateCalculator() {
    const typeSelect = document.getElementById('calcWebsiteType');
    const pagesInput = document.getElementById('calcPages');
    const pagesVal = document.getElementById('pagesValue');
    const totalPrice = document.getElementById('calcTotalPrice');

    if (!typeSelect || !pagesInput || !pagesVal || !totalPrice) return;

    const typeBase = parseInt(typeSelect.value);
    const pages = parseInt(pagesInput.value);

    pagesVal.innerText = `${pages} Page${pages > 1 ? 's' : ''}`;

    let featuresTotal = 0;
    document.querySelectorAll('.feature-cb:checked').forEach(cb => {
        featuresTotal += parseInt(cb.value);
    });

    const total = typeBase + (pages * 500) + featuresTotal;
    totalPrice.innerText = total.toLocaleString() + ' KES';
}

document.getElementById('calcWebsiteType')?.addEventListener('change', updateCalculator);
document.getElementById('calcPages')?.addEventListener('input', updateCalculator);
document.querySelectorAll('.feature-cb').forEach(cb => {
    cb.addEventListener('change', updateCalculator);
});
// M-Pesa Payment Instructions
const mpesaBtn = document.getElementById('mpesaBtn');
if (mpesaBtn) {
    mpesaBtn.addEventListener('click', () => {
        alert('M-PESA PAYMENT INSTRUCTIONS:\n\n1. Go to M-Pesa Menu\n2. Select Lipa na M-Pesa\n3. Select Buy Goods and Services\n4. Enter Till Number: 123456 (Placeholder)\n5. Enter Amount\n6. Enter your PIN and Send\n\nPlease share the confirmation message via WhatsApp.');
    });
}

// Booking Slot Selection
const slots = document.querySelectorAll('.slot');
const messageArea = document.querySelector('#quoteForm textarea');
if (slots.length > 0 && messageArea) {
    slots.forEach(slot => {
        slot.addEventListener('click', () => {
            // Remove active from others
            slots.forEach(s => s.style.background = 'var(--light)');
            // Set active
            slot.style.background = 'var(--primary)';
            slot.style.color = 'white';

            const time = slot.innerText;
            messageArea.value = `I'd like to book a free consultation for: ${time}.`;
            // Scroll to form nicely
            document.getElementById('quoteForm').scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
}

// Coming Soon handler for # links that aren't anchors
document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (target && (target.getAttribute('href') === '#' || target.classList.contains('coming-soon-link'))) {
        if (!target.getAttribute('href').startsWith('#home') &&
            !target.getAttribute('href').startsWith('#services') &&
            !target.getAttribute('href').startsWith('#pricing') &&
            !target.getAttribute('href').startsWith('#portfolio') &&
            !target.getAttribute('href').startsWith('#contact')) {
            e.preventDefault();
            alert('This feature is coming soon! Thank you for your interest.');
        }
    }
});

// Calculator "Get Exact Quote" redirection
const getQuoteBtn = document.getElementById('getQuoteFromCalc');
if (getQuoteBtn) {
    getQuoteBtn.addEventListener('click', () => {
        // Collect calculator info
        const typeSelect = document.getElementById('calcWebsiteType');
        const typeName = typeSelect.options[typeSelect.selectedIndex].text.split(' (')[0];
        const total = document.getElementById('calcTotalPrice').innerText;
        const pages = document.getElementById('calcPages').value;

        // Collect selected features
        const selectedFeatures = [];
        document.querySelectorAll('.feature-cb:checked').forEach(cb => {
            // Get text from the parent label, removing the (+Price) part
            const featureName = cb.parentElement.innerText.split(' (+')[0].trim();
            selectedFeatures.push(featureName);
        });

        let featuresFragment = selectedFeatures.length > 0 ? ` with ${selectedFeatures.join(', ')}` : '';
        let pagesFragment = pages > 1 ? ` and ${pages} total pages` : ` (${pages} page)`;

        // Close modal
        if (priceModal) priceModal.style.display = "none";

        // Pre-fill form dropdown
        const serviceSelect = document.querySelector('#quoteForm select');
        if (serviceSelect) {
            const fullTypeText = typeSelect.options[typeSelect.selectedIndex].text;
            if (fullTypeText.includes('Landing')) serviceSelect.value = 'landing';
            else if (fullTypeText.includes('Business')) serviceSelect.value = 'website';
            else if (fullTypeText.includes('Full System')) serviceSelect.value = 'system';
            else if (fullTypeText.includes('Redesign') || fullTypeText.includes('Bug Fix')) serviceSelect.value = 'fix';
        }

        // Detailed message pre-fill
        if (messageArea) {
            messageArea.value = `I am interested in a ${typeName}${featuresFragment}${pagesFragment}.\n\nEstimated Quote: ${total}.\n\nPlease contact me with more details on how to begin.`;
        }

        // Scroll to form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Service / Pricing Button Pre-fill
const serviceOrderBtns = document.querySelectorAll('.service-order-btn');
if (serviceOrderBtns.length > 0 && messageArea) {
    serviceOrderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceName = btn.getAttribute('data-service');
            const servicePrice = btn.getAttribute('data-price');
            const serviceFeatures = btn.getAttribute('data-features');
            const serviceSelect = document.querySelector('#quoteForm select');

            // Construct email details
            const emailRecipient = 'derivotechsolutions@gmail.com';
            const subject = encodeURIComponent(`Order Request: ${serviceName}`);
            const body = encodeURIComponent(
                `I am interested in ordering the ${serviceName}. with ${serviceFeatures.replace(/,/g, '\n')}\n\nPlease provide more details on how to get started.\n\n` +
                `Selected Package Details:\n` +
                `- Package: ${serviceName}\n` +
                `- Price: ${servicePrice}\n\n` +
                `Best regards,\n[Your Name]`
            );

            // Open default email client
            window.location.href = `mailto:${emailRecipient}?subject=${subject}&body=${body}`;

            // Set message area in contact form
            messageArea.value = `I am interested in ordering the ${serviceName}. with ${serviceFeatures}.\n\nPlease provide more details on how to get started.`;

            // Try to match dropdown
            if (serviceSelect) {
                if (serviceName.includes('Landing')) serviceSelect.value = 'landing';
                else if (serviceName.includes('Business')) serviceSelect.value = 'website';
                else if (serviceName.includes('Full System')) serviceSelect.value = 'system';
                else if (serviceName.includes('Fix')) serviceSelect.value = 'fix';
            }

            // Smooth scroll to form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Live Chat Functionality
const chatContainer = document.getElementById('liveChat');
const toggleChatBtn = document.getElementById('chatToggle');
const hideChatBtn = document.getElementById('closeChat');
const chatInput = document.querySelector('.chat-input input');
const chatSendBtn = document.querySelector('.chat-input button');
const chatBody = document.querySelector('.chat-body');

if (toggleChatBtn && chatContainer) {
    toggleChatBtn.addEventListener('click', () => {
        chatContainer.style.display = chatContainer.style.display === 'block' ? 'none' : 'block';
        if (chatContainer.style.display === 'block') {
            // Focus input when opening
            setTimeout(() => { if (chatInput) chatInput.focus(); }, 100);
        }
    });
}

if (hideChatBtn && chatContainer) {
    hideChatBtn.addEventListener('click', () => {
        chatContainer.style.display = 'none';
    });
}

// Chat Logic
function sendMessage() {
    if (!chatInput || !chatBody) return;

    const message = chatInput.value.trim();
    if (message !== '') {
        // Add User Message
        const userDiv = document.createElement('div');
        userDiv.className = 'chat-message user';
        userDiv.innerHTML = `<p>${message}</p>`; // Basic XSS protection needed in real apps, but ok for simple static text
        chatBody.appendChild(userDiv);

        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        // Simulate Bot Response
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'chat-message bot';
            botDiv.innerHTML = `
                <p>Thanks for your message! Our team is currently offline.</p>
                <p>For fastest response, please <a href="https://wa.me/254742666803?text=${encodeURIComponent('Regarding question: ' + message)}" target="_blank" style="color: #25D366; font-weight: bold; text-decoration: underline;">Chat on WhatsApp</a></p>
            `;
            chatBody.appendChild(botDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
    }
}

if (chatSendBtn) {
    chatSendBtn.addEventListener('click', sendMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Performance Metrics Animation
function animateCounter() {
    const counters = document.querySelectorAll('.metric-number');

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = 2000;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                setTimeout(updateCounter, stepTime);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });
}

// Observe metrics section
const metricsSectionEl = document.querySelector('.metrics');
if (metricsSectionEl) {
    const observerMetrics = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observerMetrics.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observerMetrics.observe(metricsSectionEl);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initWhatsApp();
    updateCalculator();

    // Set Current Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }

    // Loader fade-out
    const pageLoader = document.getElementById('loader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                pageLoader.style.visibility = 'hidden';
            }, 500);
        }, 1000);
    }

    // Cookie consent immediately
    const consentPopup = document.getElementById('cookieConsent');
    if (consentPopup && !localStorage.getItem('cookiesAccepted')) {
        consentPopup.classList.add('active');
    }

    // Cookie Accept
    document.getElementById('acceptCookies')?.addEventListener('click', () => {
        const consentPopup = document.getElementById('cookieConsent');
        if (consentPopup) {
            consentPopup.classList.remove('active');
            localStorage.setItem('cookiesAccepted', 'true');
        }
    });

    // Active nav links on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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
