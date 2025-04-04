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
