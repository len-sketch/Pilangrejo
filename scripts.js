// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initHeroSlider();
    initCounters();
    initServiceTabs();
    initSmoothScrolling();
    initScrollAnimations();
    initModalForm();
    
    console.log('Tough website clone initialized successfully');
});

// Hero Slider functionality
function initHeroSlider() {
    try {
        const slides = document.querySelectorAll('.hero-slide');
        const indicators = document.querySelectorAll('.indicator');
        let currentSlide = 0;
        
        if (slides.length === 0 || indicators.length === 0) {
            console.warn('Hero slider elements not found');
            return;
        }
        
        // Auto-advance slides
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            currentSlide = (currentSlide + 1) % slides.length;
            
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }
        
        // Manual slide navigation
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (index !== currentSlide) {
                    slides[currentSlide].classList.remove('active');
                    indicators[currentSlide].classList.remove('active');
                    
                    currentSlide = index;
                    
                    slides[currentSlide].classList.add('active');
                    indicators[currentSlide].classList.add('active');
                }
            });
        });
        
        // Auto-advance every 5 seconds
        setInterval(nextSlide, 5000);
        
    } catch (error) {
        console.error('Error initializing hero slider:', error);
    }
}

// Animated counters
function initCounters() {
    try {
        const counters = document.querySelectorAll('.counter');
        let countersAnimated = false;
        
        if (counters.length === 0) {
            console.warn('Counter elements not found');
            return;
        }
        
        function animateCounters() {
            if (countersAnimated) return;
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
            });
            
            countersAnimated = true;
        }
        
        // Trigger animation when stats section is in view
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        }
        
    } catch (error) {
        console.error('Error initializing counters:', error);
    }
}

// Service tabs functionality
function initServiceTabs() {
    try {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        if (tabButtons.length === 0 || tabPanes.length === 0) {
            console.warn('Service tab elements not found');
            return;
        }
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button and corresponding pane
                button.classList.add('active');
                const targetPane = document.getElementById(targetTab);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
        
    } catch (error) {
        console.error('Error initializing service tabs:', error);
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    try {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            });
        });
        
    } catch (error) {
        console.error('Error initializing smooth scrolling:', error);
    }
}

// Scroll animations
function initScrollAnimations() {
    try {
        const animatedElements = document.querySelectorAll('.portfolio-item, .testimonial-card, .pricing-card');
        
        if (animatedElements.length === 0) {
            return;
        }
        
        // Add fade-in class to elements
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
        
    } catch (error) {
        console.error('Error initializing scroll animations:', error);
    }
}

// Modal form handling
function initModalForm() {
    try {
        const quoteForm = document.querySelector('#quoteModal form');
        
        if (!quoteForm) {
            console.warn('Quote form not found');
            return;
        }
        
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(quoteForm);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Validate required fields
            const requiredFields = quoteForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = quoteForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for your quote request! We will get back to you soon.');
                    quoteForm.reset();
                    
                    // Close modal
                    const modal = document.querySelector('#quoteModal');
                    if (modal) {
                        $(modal).modal('hide');
                    }
                    
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
        
        // Remove validation classes on input
        const formInputs = quoteForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('is-invalid');
            });
        });
        
    } catch (error) {
        console.error('Error initializing modal form:', error);
    }
}

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    try {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            }
        }
    } catch (error) {
        console.error('Error updating navbar on scroll:', error);
    }
});

// Portfolio item click handlers
document.addEventListener('click', function(e) {
    try {
        if (e.target.closest('.portfolio-card')) {
            const portfolioCard = e.target.closest('.portfolio-card');
            const title = portfolioCard.querySelector('.portfolio-overlay h4');
            
            if (title) {
                console.log('Portfolio item clicked:', title.textContent);
                // Here you could add functionality to open a detailed view
                // For now, we'll just log the click
            }
        }
    } catch (error) {
        console.error('Error handling portfolio click:', error);
    }
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Handle window resize
window.addEventListener('resize', function() {
    try {
        // Recalculate any position-dependent elements if needed
        console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
    } catch (error) {
        console.error('Error handling window resize:', error);
    }
});

// Error handling for missing jQuery/Bootstrap
window.addEventListener('load', function() {
    if (typeof $ === 'undefined') {
        console.warn('jQuery not loaded - some functionality may not work');
    }
    
    if (typeof bootstrap === 'undefined') {
        console.warn('Bootstrap JS not loaded - some functionality may not work');
    }
});
