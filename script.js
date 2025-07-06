// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selectors ---
    const mainNav = document.querySelector('.main-navigation');
    const navLinks = document.querySelectorAll('.main-navigation .nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Modal selectors
    const exampleModalBtn = document.getElementById('example-modal-btn');
    const exampleModal = document.getElementById('quick-laugh-modal'); // Reusing the modal ID for simplicity
    const closeModalBtn = exampleModal.querySelector('.close-modal-btn');

    // Interactive component selectors
    const complimentBtn = document.getElementById('compliment-btn');
    const complimentDisplay = document.getElementById('compliment-display');
    
    // Footer year selector
    const currentYearSpan = document.getElementById('current-year');
    
    // Navigation helper selectors
    const previewCards = document.querySelectorAll('.preview-card');
    const ctaButton = document.querySelector('.cta-button');


    // --- Initial State ---
    // This ensures only the section with the ID 'home' is visible on page load.
    // The CSS hides all '.content-section' elements, and JS adds 'active-section' to show the first one.
    contentSections.forEach(section => {
        if (section.id !== 'home') {
            section.classList.remove('active-section');
            section.classList.add('hidden');
        } else {
            section.classList.add('active-section');
            section.classList.remove('hidden');
        }
    });
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Navigation ---

    /**
     * Updates the active class on navigation links.
     * @param {string} targetId The ID of the currently active section.
     */
    const setActiveLink = (targetId) => {
        navLinks.forEach(link => {
            if (link.dataset.section === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    /**
     * Hides all sections and shows the one with the target ID.
     * @param {string} targetId The ID of the section to show (e.g., 'home', 'how-it-works').
     */
    const showSection = (targetId) => {
        contentSections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('hidden');
                section.classList.add('active-section');
                // Scrolls to the top of the page for a clean transition.
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                section.classList.add('hidden');
                section.classList.remove('active-section');
            }
        });
        setActiveLink(targetId);

        // Close mobile menu if it's open after a navigation click.
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    };

    // Add click listeners to all main navigation links.
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Stop the default anchor link behavior.
            const targetId = link.dataset.section; // Get the target from the 'data-section' attribute.
            if (targetId) {
                showSection(targetId);
            }
        });
    });

     // Add click and keyboard listeners to the preview cards on the homepage.
    previewCards.forEach(card => {
        const navigate = () => {
            const targetId = card.dataset.targetSection;
            if (targetId) {
                showSection(targetId);
            }
        };
        card.addEventListener('click', navigate);
        card.addEventListener('keydown', (e) => {
             if (e.key === 'Enter' || e.key === ' ') {
                 e.preventDefault();
                 navigate();
             }
        });
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
    });

    // Add click listener to the main Call-to-Action button in the hero section.
    if (ctaButton && ctaButton.dataset.targetSection) {
        ctaButton.addEventListener('click', () => {
            const targetId = ctaButton.dataset.targetSection;
            showSection(targetId);
        });
    }


    // --- Mobile Menu Toggle ---
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = mainNav.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            mobileMenuToggle.innerHTML = isExpanded ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });
    }

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (darkModeToggle) {
                darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
                darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
            }
        } else {
            body.classList.remove('dark-mode');
            if (darkModeToggle) {
                darkModeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
                darkModeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
    };

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = body.classList.toggle('dark-mode');
            const newTheme = isDarkMode ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // Check for saved theme preference on load, or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    }

    // --- Example Modal ---
    const openModal = () => {
        if (exampleModal) {
            exampleModal.style.display = 'block';
            if(closeModalBtn) closeModalBtn.focus(); // For accessibility
        }
    };

    const closeModal = () => {
        if (exampleModal) {
            exampleModal.style.display = 'none';
            if(exampleModalBtn) exampleModalBtn.focus(); // For accessibility
        }
    };

    if (exampleModalBtn) {
        exampleModalBtn.addEventListener('click', openModal);
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    window.addEventListener('click', (event) => {
        if (event.target === exampleModal) {
            closeModal();
        }
    });
     window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && exampleModal.style.display === 'block') {
           closeModal();
        }
     });


    // --- Example Interactive Component: Text Generator ---
    // This array can be easily modified to change the generated text.
    const textSamples = [
        "This is the first example text.",
        "Here is another piece of generated content.",
        "You can add as many strings as you like here.",
        "The JavaScript picks one at random.",
        "This is a great way to add simple interactivity."
    ];

    if (complimentBtn && complimentDisplay) {
        complimentBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * textSamples.length);
            complimentDisplay.textContent = `"${textSamples[randomIndex]}"`;
            // Simple animation for effect
            complimentDisplay.style.opacity = 0;
            complimentDisplay.style.transform = 'translateY(10px)';
            setTimeout(() => {
                 complimentDisplay.style.opacity = 1;
                 complimentDisplay.style.transform = 'translateY(0)';
                 complimentDisplay.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
             }, 50);
        });
    }

    console.log("SPA Template JS Initialized!");

}); // End DOMContentLoaded