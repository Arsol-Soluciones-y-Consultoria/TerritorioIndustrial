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
    
    // Initialize Google Maps
    function initMap() {
        const mapElement = document.getElementById('google-map');
        
        if (mapElement) {
            // Coordenadas de Zapopan, Jalisco (actualizadas)
            const zapopan = { lat: 20.6534, lng: -103.3914 };
            
            const map = new google.maps.Map(mapElement, {
                zoom: 14,
                center: zapopan,
                styles: [
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [{"color": "#444444"}]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [{"color": "#f2f2f2"}]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [{"visibility": "off"}]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [{"saturation": -100}, {"lightness": 45}]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [{"visibility": "simplified"}]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [{"visibility": "off"}]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [{"visibility": "off"}]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{"color": "#A4A492"}, {"visibility": "on"}]
                    }
                ]
            });
            
            // Marcador para Territorio Industrial
            const marker = new google.maps.Marker({
                position: zapopan,
                map: map,
                title: 'Territorio Industrial',
                animation: google.maps.Animation.DROP
            });
            
            // Info window
            const contentString = `
                <div style="padding: 10px; max-width: 200px;">
                    <h3 style="margin-top: 0; color: #2c2c2c; font-size: 16px;">Territorio Industrial</h3>
                    <p style="margin-bottom: 5px; font-size: 14px;">Av. B, Col. Seattle, 45150 Zapopan, Jal.</p>
                    <p style="margin-bottom: 0; font-size: 12px;">+52 1 33 1148 6712</p>
                </div>
            `;
            
            const infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            
            marker.addListener('click', () => {
                infowindow.open(map, marker);
            });
            
            // Abrir info window por defecto
            infowindow.open(map, marker);
        }
    }
    
    // Cargar Google Maps API
    if (document.getElementById('google-map')) {
        // Declare google variable
        let google;
        
        // Crear script para Google Maps API
        const googleMapsScript = document.createElement('script');
        googleMapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDIPQ6-U_Fsa1fxKDC1lqYd1OqyVz3KrJ8&callback=initMap';
        googleMapsScript.async = true;
        googleMapsScript.defer = true;
        
        // Definir función de callback global
        window.initMap = initMap;
        
        // Agregar script al documento
        document.head.appendChild(googleMapsScript);
    }
    
    // AI Chatbot
    function initChatbot() {
        const body = document.querySelector('body');
        
        // Crear contenedor del chatbot
        const chatbotContainer = document.createElement('div');
        chatbotContainer.className = 'chatbot-container';
        
        // Crear botón del chatbot con ícono de persona call center
        const chatbotButton = document.createElement('div');
        chatbotButton.className = 'chatbot-button';
        chatbotButton.innerHTML = '<i class="fas fa-headset"></i>';
        
        // Crear ventana del chatbot
        const chatbotWindow = document.createElement('div');
        chatbotWindow.className = 'chatbot-window';
        
        // Crear header del chatbot
        const chatbotHeader = document.createElement('div');
        chatbotHeader.className = 'chatbot-header';
        chatbotHeader.innerHTML = `
            <h3>Asistente Virtual</h3>
            <button class="chatbot-close"><i class="fas fa-times"></i></button>
        `;
        
        // Crear contenedor de mensajes
        const chatbotMessages = document.createElement('div');
        chatbotMessages.className = 'chatbot-messages';
        
        // Crear formulario de entrada
        const chatbotInput = document.createElement('div');
        chatbotInput.className = 'chatbot-input';
        chatbotInput.innerHTML = `
            <input type="text" placeholder="Escribe tu mensaje...">
            <button><i class="fas fa-paper-plane"></i></button>
        `;
        
        // Agregar elementos al DOM
        chatbotWindow.appendChild(chatbotHeader);
        chatbotWindow.appendChild(chatbotMessages);
        chatbotWindow.appendChild(chatbotInput);
        
        chatbotContainer.appendChild(chatbotWindow);
        chatbotContainer.appendChild(chatbotButton);
        
        body.appendChild(chatbotContainer);
        
        // Mensaje inicial del bot
        setTimeout(() => {
            addBotMessage("¡Hola! Soy el asistente virtual de Territorio Industrial. ¿En qué puedo ayudarte hoy?");
        }, 500);
        
        // Eventos
        chatbotButton.addEventListener('click', () => {
            chatbotWindow.classList.toggle('active');
        });
        
        const closeButton = chatbotWindow.querySelector('.chatbot-close');
        closeButton.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
        
        const inputField = chatbotWindow.querySelector('input');
        const sendButton = chatbotWindow.querySelector('button');
        
        function sendMessage() {
            const message = inputField.value.trim();
            
            if (message) {
                // Agregar mensaje del usuario
                addUserMessage(message);
                
                // Limpiar campo de entrada
                inputField.value = '';
                
                // Procesar mensaje y responder
                processMessage(message);
            }
        }
        
        sendButton.addEventListener('click', sendMessage);
        
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Función para agregar mensaje del bot
        function addBotMessage(text) {
            const message = document.createElement('div');
            message.className = 'message bot-message';
            message.textContent = text;
            
            chatbotMessages.appendChild(message);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
        
        // Función para agregar mensaje del usuario
        function addUserMessage(text) {
            const message = document.createElement('div');
            message.className = 'message user-message';
            message.textContent = text;
            
            chatbotMessages.appendChild(message);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
        
        // Función para procesar el mensaje y generar respuesta
        function processMessage(message) {
            // Simular "escribiendo..."
            setTimeout(() => {
                const lowerMessage = message.toLowerCase();
                
                // Respuestas predefinidas basadas en palabras clave
                if (lowerMessage.includes('hola') || lowerMessage.includes('buenos días') || lowerMessage.includes('buenas tardes')) {
                    addBotMessage("¡Hola! ¿En qué puedo ayudarte con nuestros proyectos inmobiliarios?");
                }
                else if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('valor')) {
                    addBotMessage("Nuestras bodegas tienen precios competitivos en el mercado. Para información detallada sobre precios, por favor completa el formulario de contacto y un asesor se comunicará contigo a la brevedad.");
                }
                else if (lowerMessage.includes('ubicación') || lowerMessage.includes('donde') || lowerMessage.includes('dirección')) {
                    addBotMessage("Nuestra oficina se encuentra en Av. B, Col. Seattle, 45150 Zapopan, Jal. Puedes ver la ubicación exacta en la sección de ubicación de nuestro sitio.");
                }
                else if (lowerMessage.includes('contacto') || lowerMessage.includes('teléfono') || lowerMessage.includes('email')) {
                    addBotMessage("Puedes contactarnos al teléfono +52 1 33 1148 6712 o por correo a contacto@fterritorio.com. También puedes usar nuestro formulario de contacto en la página.");
                }
                else if (lowerMessage.includes('características') || lowerMessage.includes('detalles') || lowerMessage.includes('especificaciones')) {
                    addBotMessage("Nuestras bodegas modulares tienen aproximadamente 270m² de construcción, con diseño flexible para adaptarse a diferentes necesidades. Cuentan con excelente altura, instalaciones eléctricas de calidad y acceso para carga y descarga.");
                }
                else if (lowerMessage.includes('inversión') || lowerMessage.includes('rentabilidad') || lowerMessage.includes('plusvalía')) {
                    addBotMessage("Invertir en nuestras bodegas industriales ofrece excelente rentabilidad y plusvalía. La zona presenta un entorno favorable para la inversión industrial, con ubicación estratégica, infraestructura robusta y perspectivas de crecimiento sostenido.");
                }
                else {
                    addBotMessage("Gracias por tu mensaje. Para información más detallada, te recomendamos contactar directamente con nuestro equipo a través del formulario de contacto o llamando al +52 1 33 1148 6712.");
                }
            }, 1000);
        }
    }
    
    // Inicializar chatbot
    initChatbot();
    
    // Calculadora de inversión
    function initCalculator() {
        const calculatorContainer = document.getElementById('investment-calculator');
        
        if (calculatorContainer) {
            calculatorContainer.innerHTML = `
                <h3 class="calculator-title">Calculadora de Inversión</h3>
                <form class="calculator-form" id="calculator-form">
                    <div>
                        <label for="property-price">Precio de la propiedad (MXN)</label>
                        <input type="number" id="property-price" value="5000000" min="1000000" step="100000">
                    </div>
                    <div>
                        <label for="down-payment">Enganche (%)</label>
                        <input type="number" id="down-payment" value="30" min="10" max="100">
                    </div>
                    <div>
                        <label for="interest-rate">Tasa de interés anual (%)</label>
                        <input type="number" id="interest-rate" value="9.5" min="1" max="20" step="0.1">
                    </div>
                    <div>
                        <label for="loan-term">Plazo del préstamo (años)</label>
                        <input type="number" id="loan-term" value="15" min="1" max="30">
                    </div>
                    <div>
                        <label for="annual-appreciation">Apreciación anual (%)</label>
                        <input type="number" id="annual-appreciation" value="5" min="0" max="15" step="0.5">
                    </div>
                    <div>
                        <label for="monthly-rent">Renta mensual estimada (MXN)</label>
                        <input type="number" id="monthly-rent" value="35000" min="5000" step="1000">
                    </div>
                    <button type="submit">Calcular</button>
                </form>
                <div class="calculator-results" id="calculator-results" style="display: none;">
                    <h4>Resultados:</h4>
                    <div class="result-item">
                        <span>Pago inicial:</span>
                        <strong id="result-down-payment">$0</strong>
                    </div>
                    <div class="result-item">
                        <span>Monto del préstamo:</span>
                        <strong id="result-loan-amount">$0</strong>
                    </div>
                    <div class="result-item">
                        <span>Pago mensual estimado:</span>
                        <strong id="result-monthly-payment">$0</strong>
                    </div>
                    <div class="result-item">
                        <span>Valor estimado en 5 años:</span>
                        <strong id="result-future-value">$0</strong>
                    </div>
                    <div class="result-item">
                        <span>Rendimiento anual estimado:</span>
                        <strong id="result-roi">0%</strong>
                    </div>
                </div>
            `;
            
            const calculatorForm = document.getElementById('calculator-form');
            const calculatorResults = document.getElementById('calculator-results');
            
            calculatorForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Obtener valores
                const propertyPrice = parseFloat(document.getElementById('property-price').value);
                const downPaymentPercent = parseFloat(document.getElementById('down-payment').value);
                const interestRate = parseFloat(document.getElementById('interest-rate').value);
                const loanTerm = parseInt(document.getElementById('loan-term').value);
                const annualAppreciation = parseFloat(document.getElementById('annual-appreciation').value);
                const monthlyRent = parseFloat(document.getElementById('monthly-rent').value);
                
                // Calcular resultados
                const downPayment = propertyPrice * (downPaymentPercent / 100);
                const loanAmount = propertyPrice - downPayment;
                
                // Calcular pago mensual
                const monthlyInterest = interestRate / 100 / 12;
                const totalPayments = loanTerm * 12;
                const monthlyPayment = loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, totalPayments) / (Math.pow(1 + monthlyInterest, totalPayments) - 1);
                
                // Calcular valor futuro (5 años)
                const futureValue = propertyPrice * Math.pow(1 + annualAppreciation / 100, 5);
                
                // Calcular ROI anual
                const annualRent = monthlyRent * 12;
                const annualROI = (annualRent / propertyPrice) * 100;
                
                // Mostrar resultados
                document.getElementById('result-down-payment').textContent = formatCurrency(downPayment);
                document.getElementById('result-loan-amount').textContent = formatCurrency(loanAmount);
                document.getElementById('result-monthly-payment').textContent = formatCurrency(monthlyPayment);
                document.getElementById('result-future-value').textContent = formatCurrency(futureValue);
                document.getElementById('result-roi').textContent = annualROI.toFixed(2) + '%';
                
                calculatorResults.style.display = 'block';
            });
            
            // Función para formatear moneda
            function formatCurrency(value) {
                return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            }
        }
    }
    
    // Inicializar calculadora si existe el contenedor
    initCalculator();
    
    // Event listeners
    window.addEventListener("scroll", setActiveSection);
    window.addEventListener("scroll", animateSections);
    
    // Initialize
    setActiveSection();
    animateSections();
});
