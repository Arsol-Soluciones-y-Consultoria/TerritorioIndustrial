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