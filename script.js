// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change and scroll progress
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    
    // Navbar background change
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
    
    // Scroll progress indicator
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Enhanced form submission handling
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Processing...';
        
        // Get all form values
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const vehicleMake = formData.get('vehicleMake');
        const vehicleModel = formData.get('vehicleModel');
        const vehicleYear = formData.get('vehicleYear');
        const vehicleCondition = formData.get('vehicleCondition');
        const vehicleColor = formData.get('vehicleColor');
        const serviceType = formData.get('serviceType');
        const specialRequirements = formData.get('specialRequirements');
        const newsletter = formData.get('newsletter') ? 'Yes' : 'No';
        
        // Create detailed email body
        const emailBody = `
QUOTE REQUEST - The Detail Market

PERSONAL INFORMATION:
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

VEHICLE INFORMATION:
Make: ${vehicleMake}
Model: ${vehicleModel}
Year: ${vehicleYear}
Condition: ${vehicleCondition}
Color: ${vehicleColor || 'Not specified'}

SERVICE REQUIREMENTS:
Service Type: ${serviceType}

SPECIAL REQUIREMENTS:
${specialRequirements || 'None specified'}

NEWSLETTER SIGNUP: ${newsletter}

---
This quote request was submitted from the website contact form.
        `;
        
        // Create mailto link
        const mailtoLink = `mailto:admin@thedetailmarket.com.au?subject=Quote Request - ${vehicleMake} ${vehicleModel} (${vehicleYear})&body=${encodeURIComponent(emailBody)}`;
        
        // Simulate processing delay
        setTimeout(() => {
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<i class="fas fa-calculator"></i> Get My Free Quote';
        }, 1500);
    });
}

// Success message function
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h4>Quote Request Sent!</h4>
            <p>Thank you for your inquiry! Your email client should open with a pre-filled message. Please send the email to complete your quote request.</p>
            <p>We'll get back to you within 24 hours with a detailed quote.</p>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Form validation enhancement
function initFormValidation() {
    const form = document.getElementById('quote-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
            field.classList.add('error');
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    const errorMsg = field.parentNode.querySelector('.field-error');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showFieldError(field, message) {
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add stagger effect for child elements
            const childElements = entry.target.querySelectorAll('.animate-on-scroll');
            childElements.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate-in');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Parallax scroll effect
const parallaxElements = document.querySelectorAll('.parallax');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
    });
});

// Counter animation for numbers
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Enhanced scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add scroll-triggered animations for specific elements
    const heroElements = document.querySelectorAll('.hero .animate-on-scroll');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-in');
        }, index * 200);
    });
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animations to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Gallery Slider functionality
    initGallerySlider();
    
    // Initialize form validation
    initFormValidation();
    
    // Feature item hover effects
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.feature-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Gallery Slider Function
function initGallerySlider() {
    const slider = document.getElementById('gallery-slider');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = slider.children.length;
    let isTransitioning = false;
    let autoSlideInterval;
    
    // Update slider position
    function updateSlider() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    // Next slide
    function nextSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (isTransitioning) return;
        currentSlide = slideIndex;
        updateSlider();
    }
    
    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });
    
    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        startAutoSlide();
    });
    
    // Pause auto-slide on hover
    const sliderContainer = document.querySelector('.gallery-slider-container');
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Initialize
    updateSlider();
    startAutoSlide();
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        // Track phone clicks (you can integrate with analytics here)
        console.log('Phone number clicked:', link.href);
    });
});

// Email link click tracking
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        // Track email clicks (you can integrate with analytics here)
        console.log('Email link clicked:', link.href);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial body opacity
    document.body.style.opacity = '0';
    
    // Add any other initialization code here
    console.log('The Detail Market website loaded successfully');
});
