/**
 * Chathumi Nimesha - Portfolio Script
 * Handles navigation, mobile menu, typing effect, scrollspy, and contact validation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Mobile Navigation & Drawer
    // -------------------------------------------------------------------------
    const toggleBtn = document.getElementById('toggleBtn');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');
    const allNavLinks = document.querySelectorAll('.navlinks .nav-link');
    const header = document.getElementById('main-header');

    function toggleMenu() {
        const isOpen = navLinks.classList.toggle('active');
        toggleBtn.classList.toggle('active', isOpen);
        if (navOverlay) {
            navOverlay.classList.toggle('active', isOpen);
        }
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        toggleBtn.classList.remove('active');
        if (navOverlay) {
            navOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleMenu);
        toggleBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking any nav link
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // -------------------------------------------------------------------------
    // 2. Header Scroll Effect & Back-to-Top Button
    // -------------------------------------------------------------------------
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Sticky header styling
        if (header) {
            if (scrollPos > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Back to top visibility
        if (backToTopBtn) {
            if (scrollPos > 350) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    // -------------------------------------------------------------------------
    // 3. Scrollspy (Active Link Highlighting on Scroll)
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.navlinks a[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (correspondingLink) {
                    allNavLinks.forEach(l => l.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // -------------------------------------------------------------------------
    // 4. Typing and Deleting Text Effect
    // -------------------------------------------------------------------------
    const words = [
        'Frontend Developer',
        'Web Designer',
        'UI/UX Enthusiast',
        'Creative Coder'
    ];
    const typingEl = document.getElementById('typing');

    if (typingEl) {
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingEl.textContent = currentWord.substring(0, charIndex);

            let speed = isDeleting ? 45 : 95;

            if (!isDeleting && charIndex === currentWord.length) {
                speed = 1800; // Pause after full word is written
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 400; // Pause before typing next word
            }

            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }

    // -------------------------------------------------------------------------
    // 5. Contact Form Validation & Submission
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    if (contactForm) {
        const nameInput = document.getElementById('userName');
        const emailInput = document.getElementById('userEmail');
        const subjectInput = document.getElementById('userSubject');
        const messageInput = document.getElementById('userMessage');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Clear previous errors
            nameError.textContent = '';
            emailError.textContent = '';
            subjectError.textContent = '';
            messageError.textContent = '';
            formAlert.className = 'form-alert';
            formAlert.textContent = '';

            // Name validation
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Please enter your name.';
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                nameError.textContent = 'Name must be at least 2 characters.';
                isValid = false;
            }

            // Email validation
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Please enter your email address.';
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Subject validation
            if (!subjectInput.value.trim()) {
                subjectError.textContent = 'Please enter a subject.';
                isValid = false;
            }

            // Message validation
            if (!messageInput.value.trim()) {
                messageError.textContent = 'Please enter your message.';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Message should be at least 10 characters long.';
                isValid = false;
            }

            if (isValid) {
                // Show success state
                formAlert.className = 'form-alert success';
                formAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.';
                contactForm.reset();

                setTimeout(() => {
                    formAlert.className = 'form-alert';
                    formAlert.textContent = '';
                }, 6000);
            } else {
                formAlert.className = 'form-alert error';
                formAlert.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please correct the highlighted errors above.';
            }
        });
    }
});
