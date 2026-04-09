document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize Typed.js for Hero Section
    const typed = new Typed('#typed', {
        strings: [
            'Frontend Web Engineer',
            'Web3 Growth Specialist',
            'Crypto Influencer',
            'Community Builder',
            'Project Ambassador'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        loop: true,
        smartBackspace: true
    });

    // Sticky Header Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 7, 10, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            navbar.classList.add('py-2');
            navbar.classList.remove('py-3');
        } else {
            navbar.style.background = 'rgba(5, 7, 10, 0.85)';
            navbar.style.boxShadow = 'none';
            navbar.classList.add('py-3');
            navbar.classList.remove('py-2');
        }
    });

    // Smooth Scrolling for Nav Links (Bootstrap handles some, but this adds extra control)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navCollapse = document.querySelector('.navbar-collapse');
                if (navCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Contact Form Submission (Mockup Animation)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Visual feedback
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.classList.remove('btn-neon');
                submitBtn.classList.add('btn-success');
                submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i> Sent Successfully!';
                
                // Reset form
                this.reset();
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    submitBtn.classList.add('btn-neon');
                    submitBtn.classList.remove('btn-success');
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Scroll reveal for progress bars (manual refresh if AOS doesn't catch them)
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    bar.style.transition = 'width 1.5s cubic-bezier(0.1, 0.5, 0.5, 1)';
                    // Re-trigger width animation
                    const targetWidth = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) observer.observe(skillsSection);
});
