document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Variables
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const backToTopBtn = document.getElementById('back-to-top');
    const currentYearSpan = document.getElementById('current-year');
    const leadForm = document.getElementById('leadForm');
    const formSuccess = document.getElementById('form-success');
    const chatButton = document.getElementById('chat-button');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const userInput = document.getElementById('user-input');
    const sendMessage = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    const calculateBtn = document.getElementById('calculate-btn');
    
    // Establecer el año actual en el footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (backToTopBtn) backToTopBtn.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            if (backToTopBtn) backToTopBtn.classList.remove('active');
        }
    });
    
    // Menú móvil
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            // Animar las barras del menú
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenuBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Botón de volver arriba
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Formulario de contacto
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulación de envío de formulario
            setTimeout(function() {
                leadForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Mostrar toast de notificación
                const toast = document.getElementById('toast');
                toast.classList.add('active');
                
                // Ocultar toast después de 3 segundos
                setTimeout(function() {
                    toast.classList.remove('active');
                }, 3000);
                
                // Resetear formulario después de 5 segundos
                setTimeout(function() {
                    leadForm.reset();
                    leadForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }
    
    // Asistente virtual
    if (chatButton && chatContainer) {
        // Abrir chat
        chatButton.addEventListener('click', function() {
            chatContainer.style.display = 'flex';
            chatButton.style.display = 'none';
        });
        
        // Cerrar chat
        closeChat.addEventListener('click', function() {
            chatContainer.style.display = 'none';
            chatButton.style.display = 'flex';
        });
        
        // Enviar mensaje
        function sendUserMessage() {
            const message = userInput.value.trim();
            if (message !== '') {
                // Agregar mensaje del usuario
                addMessage(message, 'user');
                
                // Limpiar input
                userInput.value = '';
                
                // Simular respuesta del asistente después de 1 segundo
                setTimeout(function() {
                    const botResponse = getBotResponse(message);
                    addMessage(botResponse, 'assistant');
                    
                    // Scroll al final de los mensajes
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }
        
        // Enviar mensaje al hacer clic en el botón
        sendMessage.addEventListener('click', sendUserMessage);
        
        // Enviar mensaje al presionar Enter
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
        
        // Función para agregar mensajes al chat
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', sender);
            
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            messageContent.textContent = text;
            
            messageDiv.appendChild(messageContent);
            chatMessages.appendChild(messageDiv);
            
            // Scroll al final de los mensajes
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Respuestas predefinidas del bot
        function getBotResponse(message) {
            message = message.toLowerCase();
            
            if (message.includes('hola') || message.includes('buenos días') || message.includes('buenas tardes') || message.includes('buenas noches')) {
                return '¡Hola! ¿En qué puedo ayudarte hoy?';
            } else if (message.includes('proyecto') || message.includes('bodegas') || message.includes('santa anita') || message.includes('candelaria')) {
                return 'Tenemos varios proyectos industriales como Bodegas Santa Anita y Candelaria. ¿Te gustaría recibir más información sobre alguno en particular?';
            } else if (message.includes('precio') || message.includes('costo') || message.includes('valor') || message.includes('inversión')) {
                return 'Los precios varían según el proyecto y el tipo de unidad. ¿Te gustaría que un asesor te contacte para darte información detallada?';
            } else if (message.includes('ubicación') || message.includes('dirección') || message.includes('dónde')) {
                return 'Nuestras oficinas están ubicadas en Av. B, Col. Seattle, 45150 Zapopan, Jalisco. Nuestros proyectos están estratégicamente ubicados en zonas industriales con excelente conectividad.';
            } else if (message.includes('contacto') || message.includes('teléfono') || message.includes('correo') || message.includes('email')) {
                return 'Puedes contactarnos al teléfono +52 1 33 1148 6712 o por correo a contacto@fterritorio.com. También puedes llenar el formulario de contacto en nuestra página.';
            } else if (message.includes('gracias') || message.includes('muchas gracias')) {
                return '¡De nada! Estamos para servirte. ¿Hay algo más en lo que pueda ayudarte?';
            } else if (message.includes('adiós') || message.includes('hasta luego') || message.includes('bye')) {
                return '¡Hasta luego! Gracias por contactarnos. Estamos a tus órdenes.';
            } else {
                return 'Gracias por tu mensaje. Un asesor se pondrá en contacto contigo pronto para brindarte información personalizada. ¿Hay algo específico que te gustaría saber mientras tanto?';
            }
        }
    }
    
    // Calculadora de inversión
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const investmentAmount = parseFloat(document.getElementById('investment-amount').value);
            const investmentTerm = parseInt(document.getElementById('investment-term').value);
            const annualReturn = parseFloat(document.getElementById('annual-return').value) / 100;
            
            // Calcular valor futuro
            const futureValue = investmentAmount * Math.pow(1 + annualReturn, investmentTerm);
            const totalProfit = futureValue - investmentAmount;
            const totalReturn = (totalProfit / investmentAmount) * 100;
            
            // Mostrar resultados
            document.getElementById('initial-investment').textContent = formatCurrency(investmentAmount);
            document.getElementById('future-value').textContent = formatCurrency(futureValue);
            document.getElementById('total-profit').textContent = formatCurrency(totalProfit);
            document.getElementById('total-return').textContent = totalReturn.toFixed(2) + '%';
        });
        
        // Formatear moneda
        function formatCurrency(value) {
            return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' MXN';
        }
    }
    
    // Inicializar el mapa de Google Maps
    function initMap() {
        // El mapa se inicializa automáticamente a través del iframe
    }
    
    // Animación de scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (mobileNav.classList.contains('active')) {
                    mobileMenuBtn.click();
                }
            }
        });
    });
});
