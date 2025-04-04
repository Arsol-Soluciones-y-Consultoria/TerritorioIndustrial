document.addEventListener("DOMContentLoaded", () => {
    const mobileMenu = document.getElementById("mobile-menu");
    const nav = document.getElementById("desktop-nav");

    mobileMenu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // Form Submission
    document.getElementById("leadForm").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Formulario enviado. Nos pondremos en contacto contigo.");
        this.reset();
    });
});
// Función para añadir la clase 'visible' cuando la sección entra en el viewport
function handleScroll() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        // Si la sección es visible en la pantalla
        if (sectionTop < window.innerHeight && sectionTop + sectionHeight > 0) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
}

// Evento de scroll para activar el efecto
window.addEventListener('scroll', handleScroll);

// Llamar a la función al cargar la página
handleScroll();
document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById("mobile-menu");
    const nav = document.getElementById("desktop-nav");
    
    mobileMenu.addEventListener("click", () => {
        nav.classList.toggle("active");
        mobileMenu.classList.toggle("active"); // Add active class to change the icon to X
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll("#desktop-nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove("active");
                mobileMenu.classList.remove("active");
            }
        });
    });
    
    // Form Submission
    document.getElementById("leadForm").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Formulario enviado. Nos pondremos en contacto contigo.");
        this.reset();
    });
    
    // Handle scroll animations
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    // Handle resize events (to fix issues when rotating device)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove("active");
            mobileMenu.classList.remove("active");
        }
    });
});

// Función para añadir la clase 'visible' cuando la sección entra en el viewport
function handleScroll() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        // Si la sección es visible en la pantalla (con un offset para iniciar la animación antes)
        if (sectionTop < windowHeight - 100 && sectionTop + sectionHeight > 0) {
            section.classList.add('visible');
        }
    });
}
