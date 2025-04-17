document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileNav = document.getElementById("mobile-nav");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    const backToTop = document.getElementById("back-to-top");
    const leadForm = document.getElementById("leadForm");
    const formSuccess = document.getElementById("form-success");
    const toast = document.getElementById("toast");
    const currentYear = document.getElementById("current-year");
    const sectionAnimates = document.querySelectorAll(".section-animate");
    
    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Mobile menu toggle
    if (mobileMenu && mobileNav) {
        mobileMenu.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
            
            if (mobileMenu.classList.contains("active")) {
                mobileNav.style.maxHeight = mobileNav.scrollHeight + "px";
                
                // Animate hamburger to X
                mobileMenu.querySelectorAll("span")[0].style.transform = "rotate(45deg) translate(5px, 5px)";
                mobileMenu.querySelectorAll("span")[1].style.opacity = "0";
                mobileMenu.querySelectorAll("span")[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
            } else {
                mobileNav.style.maxHeight = "0";
                
                // Animate X back to hamburger
                mobileMenu.querySelectorAll("span")[0].style.transform = "none";
                mobileMenu.querySelectorAll("span")[1].style.opacity = "1";
                mobileMenu.querySelectorAll("span")[2].style.transform = "none";
            }
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            // Only prevent default if it's a hash link
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains("active")) {
                    mobileMenu.click();
                }
                
                const targetId = this.getAttribute("href").substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
    
    // Active section detection on scroll
    function setActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("data-section") === sectionId) {
                        link.classList.add("active");
                    }
                });
            }
        });
        
        // Show/hide back to top button
        if (backToTop) {
            if (scrollPosition > 300) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        }
    }
    
    // Scroll to top when back to top button is clicked
    if (backToTop) {
        backToTop.addEventListener("click", function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
    
    // Animate sections on scroll
    function animateSections() {
        sectionAnimates.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add("visible");
            }
        });
    }
    
    // Form submission
    if (leadForm) {
        leadForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const interest = document.getElementById("interest").value;
            
            if (!name || !email || !phone || !interest) {
                showToast("Por favor completa todos los campos requeridos");
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast("Por favor ingresa un correo electrónico válido");
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
                showToast("Por favor ingresa un número de teléfono válido (10 dígitos)");
                return;
            }
            
            // Simulate form submission
            setTimeout(() => {
                if (formSuccess) {
                    formSuccess.classList.add("show");
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.remove("show");
                        leadForm.reset();
                    }, 5000);
                }
            }, 1000);
        });
    }
    
    // Show toast notification
    function showToast(message) {
        if (toast) {
            const toastMessage = toast.querySelector(".toast-message");
            if (toastMessage) {
                toastMessage.textContent = message;
            }
            
            toast.classList.add("show");
            
            // Hide toast after animation completes
            setTimeout(() => {
                toast.classList.remove("show");
            }, 5000);
        }
    }
    
    // Make showToast function globally available
    window.showToast = showToast;
    
    // Event listeners
    window.addEventListener("scroll", setActiveSection);
    window.addEventListener("scroll", animateSections);
    
    // Initialize
    setActiveSection();
    animateSections();
});