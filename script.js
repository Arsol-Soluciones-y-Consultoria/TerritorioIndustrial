document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año actual en el footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Menú móvil
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenu && mobileNav) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }

    // Cambiar estilo del header al hacer scroll
    const header = document.getElementById('header');
    const scrollThreshold = 100;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al cargar para establecer el estado inicial

    // Animación de secciones al hacer scroll
    const animateSections = document.querySelectorAll('.section-animate');
    
    function checkSections() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkSections);
    checkSections(); // Ejecutar al cargar para animar secciones visibles inicialmente

    // Botón de volver arriba
    const backToTopButton = document.getElementById('back-to-top');
    
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTopButton);
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Función para validar el reCAPTCHA
    function validateRecaptcha() {
        // Verificar si grecaptcha está disponible (el script se ha cargado)
        if (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse) {
            const response = grecaptcha.getResponse();
            if (response.length === 0) {
                alert("Por favor, verifica que no eres un robot");
                return false;
            }
            return true;
        }
        // Si no hay reCAPTCHA en la página, permitir el envío
        return true;
    }

    // Formulario de contacto
    const contactForm = document.getElementById('leadForm');
    const formSuccess = document.getElementById('form-success');
    const toast = document.getElementById('toast');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar reCAPTCHA antes de procesar el formulario
            if (!validateRecaptcha()) {
                return;
            }
            
            // Aquí iría el código para enviar el formulario a un servidor
            // Por ahora, solo simulamos el envío exitoso
            
            if (formSuccess) {
                formSuccess.classList.add('show');
                contactForm.reset();
                
                // Resetear el reCAPTCHA si existe
                if (typeof grecaptcha !== 'undefined' && grecaptcha.reset) {
                    grecaptcha.reset();
                }
                
                setTimeout(function() {
                    formSuccess.classList.remove('show');
                }, 5000);
            } else if (toast) {
                // Si no hay mensaje de éxito en el formulario, mostrar toast
                toast.classList.add('show');
                contactForm.reset();
                
                // Resetear el reCAPTCHA si existe
                if (typeof grecaptcha !== 'undefined' && grecaptcha.reset) {
                    grecaptcha.reset();
                }
                
                setTimeout(function() {
                    toast.classList.remove('show');
                }, 5000);
            }
        });
    }

    // Chat
    const chatButton = document.getElementById('chat-button');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const userInput = document.getElementById('user-input');
    const sendMessage = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    
    if (chatButton && chatContainer) {
        chatButton.addEventListener('click', function() {
            chatContainer.classList.add('active');
            chatButton.style.display = 'none';
        });
    }
    
    if (closeChat && chatContainer && chatButton) {
        closeChat.addEventListener('click', function() {
            chatContainer.classList.remove('active');
            chatButton.style.display = 'flex';
        });
    }
    
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'message user' : 'message assistant';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    if (sendMessage && userInput && chatMessages) {
        sendMessage.addEventListener('click', sendUserMessage);
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
    }
    
    function sendUserMessage() {
        const message = userInput.value.trim();
        
        if (message !== '') {
            addMessage(message, true);
            userInput.value = '';
            
            // Simular respuesta del asistente después de un breve retraso
            setTimeout(function() {
                const responses = [
                    "Gracias por tu mensaje. Un asesor se pondrá en contacto contigo pronto.",
                    "¡Hola! Estamos procesando tu consulta. ¿En qué más podemos ayudarte?",
                    "Entendido. ¿Te gustaría recibir más información sobre alguno de nuestros proyectos?",
                    "Gracias por tu interés en Territorio Industrial. ¿Tienes alguna pregunta específica sobre nuestros desarrollos?"
                ];
                
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse);
            }, 1000);
        }
    }

    // Inicializar enlaces activos en la navegación
    function setActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname;
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            if (currentPath === linkPath || 
                (currentPath.includes('/proyectos/') && linkPath === 'proyectos.html') ||
                (currentPath === '/' && linkPath === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNavLink();
});
