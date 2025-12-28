// ============================================ 
// CONFIGURACIÓN GLOBAL 
// ============================================ 
const ANIMATION_CONFIG = { 
    threshold: 0.15, 
    rootMargin: '0px', 
    smoothScrollDuration: 1000, 
    counterSpeed: 2000, 
    parallaxIntensity: 0.3 
};

// ============================================ 
// SMOOTH SCROLLING FOR NAVIGATION 
// ============================================ 
document.querySelectorAll('a[href^="#"]:not(.external-link)').forEach(anchor => { 
    anchor.addEventListener('click', function (e) { 
        e.preventDefault(); 
        const target = document.querySelector(this.getAttribute('href')); 
        if (target) { 
            const headerOffset = 100; 
            const elementPosition = target.getBoundingClientRect().top; 
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset; 

            window.scrollTo({ 
                top: offsetPosition, 
                behavior: 'smooth' 
            }); 
        } 
    }); 
});

// ============================================ 
// HEADER SCROLL EFFECT 
// ============================================ 
let lastScroll = 0; 
const header = document.querySelector('header');

window.addEventListener('scroll', () => { 
    const currentScroll = window.pageYOffset; 

    if (currentScroll > 100) { 
        header.classList.add('shadow-lg', 'bg-primary/98'); 
        header.style.transform = currentScroll > lastScroll ? 'translateY(-100%)' : 'translateY(0)'; 
    } else { 
        header.classList.remove('shadow-lg', 'bg-primary/98'); 
        header.style.transform = 'translateY(0)'; 
    }

    header.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'; 
    lastScroll = currentScroll; 
});

// ============================================ 
// INTERSECTION OBSERVER - SCROLL ANIMATIONS 
// ============================================ 
const observerOptions = { 
    threshold: 0.15, 
    rootMargin: '0px', 
};

const animationObserver = new IntersectionObserver((entries) => { 
    entries.forEach(entry => { 
        if (entry.isIntersecting) { 
            entry.target.classList.add('visible'); 
            
            // Counter animation for stats (only once)
            if (entry.target.classList.contains('stat-number')) { 
                animateCounter(entry.target); 
                animationObserver.unobserve(entry.target); 
            } 
        } else {
            // Reset animation for elements that should re-animate
            if (!entry.target.classList.contains('stat-number')) {
                entry.target.classList.remove('visible');
            }
        } 
    }); 
}, observerOptions);

// Observar todos los elementos con clases de animación 
const animatedElements = document.querySelectorAll(` 
    .fade-in-up, 
    .fade-in-down, 
    .fade-in-left, 
    .fade-in-right, 
    .scale-in, 
    .rotate-in, 
    .timeline-card, 
    .product-card, 
    .stat-number 
`);

animatedElements.forEach(el => animationObserver.observe(el));

// ============================================ 
// COUNTER ANIMATION FOR STATISTICS 
// ============================================ 
function animateCounter(element) {
    const originalText = element.textContent;
    const target = parseFloat(originalText);

    if (isNaN(target)) {
        console.warn(`Could not parse a number from "${originalText}". Skipping animation.`);
        return;
    }

    // Extract suffix (like +, %, h, etc.)
    const suffix = originalText.replace(/[\d,.]+/g, '').trim();
    const duration = ANIMATION_CONFIG.counterSpeed;
    const steps = duration / 16; // Run at roughly 60fps
    const increment = target / steps;
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            let displayValue;
            if (originalText.includes('.') || originalText.includes(',')) {
                displayValue = current.toFixed(1);
            } else {
                displayValue = Math.ceil(current);
            }
            element.textContent = displayValue + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = originalText; // Restore original text at the end
        }
    };

    // Set initial text to "0" with suffix
    element.textContent = '0' + suffix;
    updateCounter();
}

// ============================================ 
// PARALLAX EFFECT 
// ============================================ 
const parallaxElements = document.querySelectorAll('.parallax-slow');

window.addEventListener('scroll', () => { 
    const scrolled = window.pageYOffset; 
    
    parallaxElements.forEach(el => { 
        const speed = ANIMATION_CONFIG.parallaxIntensity; 
        const yPos = -(scrolled * speed); 
        el.style.transform = `translateY(${yPos}px)`; 
    }); 
});

// Aplicar parallax al hero background 
const heroSection = document.querySelector('section.relative.min-h-screen'); 
if (heroSection) { 
    const heroImage = heroSection.querySelector('.absolute.inset-0 img'); 
    if (heroImage) { 
        heroImage.classList.add('parallax-slow'); 
    } 
}

// ============================================ 
// PRODUCT CARDS HOVER EFFECT 
// ============================================ 
const productCards = document.querySelectorAll('.bg-white.border-2.border-accent'); 
productCards.forEach(card => { 
    card.classList.add('product-card', 'glow-on-hover'); 
    
    // Agregar efecto ripple 
    card.classList.add('ripple'); 
    
    card.addEventListener('mouseenter', function() { 
        this.style.transform = 'translateY(-12px) scale(1.02) rotateZ(1deg)'; 
    }); 
    
    card.addEventListener('mouseleave', function() { 
        this.style.transform = ''; 
    }); 
});

// ============================================ 
// TIMELINE ANIMATION 
// ============================================ 
const timelineCards = document.querySelectorAll('.timeline-card, #proceso .relative.flex.items-center > div'); 
timelineCards.forEach((card, index) => { 
    card.classList.add('timeline-card'); 
    card.style.transitionDelay = `${index * 0.2}s`; 
});

// Timeline line drawing animation 
const timelineLine = document.getElementById('timeline-line'); 
if (timelineLine) { 
    timelineLine.classList.add('timeline-line'); 
    
    const timelineObserver = new IntersectionObserver((entries) => { 
        entries.forEach(entry => { 
            if (entry.isIntersecting) { 
                // Reset animation before playing
                timelineLine.style.animation = 'none';
                void timelineLine.offsetWidth; // Trigger reflow
                timelineLine.style.animation = 'drawLine 2s ease-out forwards'; 
            } else {
                timelineLine.style.animation = 'none';
            }
        }); 
    }, { threshold: 0.2 }); 
    
    timelineObserver.observe(timelineLine); 
}

// ============================================ 
// CERTIFICATION BADGES ANIMATION 
// ============================================ 
const certBadges = document.querySelectorAll('.certification-card, .certification-badge'); 
certBadges.forEach((badge, index) => { 
    badge.classList.add('stagger-item'); 
    badge.style.animationDelay = `${index * 0.1}s`; 
    
    badge.addEventListener('mouseenter', function() { 
        this.classList.add('certification-badge'); 
    }); 
});

// ============================================ 
// SCROLL PROGRESS INDICATOR (OPCIONAL) 
// ============================================ 
function createScrollProgress() { 
    const progressBar = document.createElement('div'); 
    progressBar.style.cssText = ` 
        position: fixed; 
        top: 0; 
        left: 0; 
        height: 3px; 
        background: linear-gradient(90deg, #DAA520, #2D5016); 
        width: 0%; 
        z-index: 9999; 
        transition: width 0.1s ease-out; 
    `; 
    document.body.appendChild(progressBar); 

    window.addEventListener('scroll', () => { 
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight; 
        const scrolled = (window.pageYOffset / windowHeight) * 100; 
        progressBar.style.width = scrolled + '%'; 
    }); 
}

// ============================================ 
// FORM ANIMATIONS & VALIDATION 
// ============================================ 
const mainContactForm = document.getElementById('contact-form'); 
const mainSubmitBtn = mainContactForm?.querySelector('button[type="submit"]'); 
const feedbackModal = document.getElementById('form-feedback-modal'); 
const feedbackModalTitle = feedbackModal?.querySelector('#modal-title'); 
const feedbackModalMessage = feedbackModal?.querySelector('#modal-message'); 
const feedbackModalCloseBtn = feedbackModal?.querySelector('#modal-close-btn');

document.querySelectorAll('.form-field').forEach(field => { 
    field.addEventListener('focus', function() { 
        this.style.transform = 'scale(1.02)'; 
        this.style.boxShadow = '0 4px 12px rgba(45, 80, 22, 0.15)'; 
    }); 
    
    field.addEventListener('blur', function() { 
        this.style.transform = ''; 
        this.style.boxShadow = ''; 
    }); 
});

if (mainContactForm && mainSubmitBtn && feedbackModal) { 
    mainContactForm.addEventListener('submit', async (e) => { 
        e.preventDefault(); 
        const formData = new FormData(mainContactForm); 
        const originalText = mainSubmitBtn.textContent; 

        let isValid = true; 
        const requiredFields = mainContactForm.querySelectorAll('[required]'); 
        
        requiredFields.forEach(field => { 
            if ((field.type === 'checkbox' && !field.checked) || 
                (field.type !== 'checkbox' && !field.value.trim())) { 
                isValid = false; 
                field.classList.add('border-error'); 
                field.style.animation = 'shake 0.5s ease-out'; 
            } else { 
                field.classList.remove('border-error'); 
            } 
        }); 

        if (!isValid) { 
            feedbackModalTitle.textContent = "Error de Validación"; 
            feedbackModalTitle.className = "text-2xl font-bold font-playfair mb-4 text-error"; 
            feedbackModalMessage.textContent = "Por favor, complete todos los campos obligatorios (*)."; 
            showModal(feedbackModal); 
            return; 
        } 

        mainSubmitBtn.innerHTML = ` 
            <span class="loading-shimmer inline-block w-full">Enviando...</span> 
        `; 
        mainSubmitBtn.disabled = true; 

        try { 
            const response = await fetch("https://api.web3forms.com/submit", { 
                method: "POST", 
                body: formData 
            }); 

            const data = await response.json(); 

            if (response.ok) { 
                feedbackModalTitle.textContent = "¡Enviado con Éxito!"; 
                feedbackModalTitle.className = "text-2xl font-bold font-playfair mb-4 text-success"; 
                feedbackModalMessage.textContent = "Gracias por su consulta. Nos pondremos en contacto en menos de 24 horas."; 
                mainContactForm.reset(); 
                createConfetti(); 
            } else { 
                feedbackModalTitle.textContent = "Error en el Envío"; 
                feedbackModalTitle.className = "text-2xl font-bold font-playfair mb-4 text-error"; 
                feedbackModalMessage.textContent = data.message || "Hubo un problema al enviar su mensaje. Por favor, inténtelo de nuevo."; 
            } 

        } catch (error) { 
            feedbackModalTitle.textContent = "Error de Conexión"; 
            feedbackModalTitle.className = "text-2xl font-bold font-playfair mb-4 text-error"; 
            feedbackModalMessage.textContent = "No se pudo conectar con el servidor. Por favor, revise su conexión a internet e inténtelo de nuevo."; 
        } finally { 
            mainSubmitBtn.textContent = originalText; 
            mainSubmitBtn.disabled = false; 
            showModal(feedbackModal); 
        } 
    }); 

    feedbackModalCloseBtn?.addEventListener('click', () => hideModal(feedbackModal)); 
    feedbackModal.addEventListener('click', (e) => { 
        if (e.target === feedbackModal) hideModal(feedbackModal); 
    }); 
}

// ============================================ 
// PRICE REQUEST MODAL LOGIC 
// ============================================ 
const priceRequestModal = document.getElementById('price-request-modal'); 
const openPriceModalBtns = document.querySelectorAll('.open-price-modal'); 
const priceModalCloseBtn = document.getElementById('price-modal-close-btn'); 
const whatsappBtn = document.getElementById('whatsapp-btn'); 
const simpleContactForm = document.getElementById('simple-contact-form'); 
const simpleSubmitBtn = simpleContactForm?.querySelector('button[type="submit"]');

const phoneNumbers = ["+51980228368", "+51930369251"]; 
const defaultMessage = "Hola, estoy interesado en sus productos premium del Amazonas.";

openPriceModalBtns.forEach(btn => { 
    btn.addEventListener('click', () => { 
        const currentMinute = new Date().getMinutes(); 
        const selectedPhoneNumber = phoneNumbers[currentMinute % 2]; 
        const whatsappUrl = `https://wa.me/${selectedPhoneNumber}?text=${encodeURIComponent(defaultMessage)}`; 
        if (whatsappBtn) whatsappBtn.href = whatsappUrl; 
        showModal(priceRequestModal); 
    }); 
});

priceModalCloseBtn?.addEventListener('click', () => hideModal(priceRequestModal)); 
priceRequestModal?.addEventListener('click', (e) => { 
    if (e.target === priceRequestModal) hideModal(priceRequestModal); 
});

if (simpleContactForm && simpleSubmitBtn) { 
    simpleContactForm.addEventListener('submit', async (e) => { 
        e.preventDefault(); 
        const formData = new FormData(simpleContactForm); 
        const originalText = simpleSubmitBtn.textContent; 

        if (!simpleContactForm.querySelector('#simple-email').value.trim()) { 
            hideModal(priceRequestModal); 
            feedbackModalTitle.textContent = "Error de Validación"; 
            feedbackModalTitle.className = "text-2xl font-bold font-playfair mb-4 text-error"; 
            feedbackModalMessage.textContent = "Por favor, ingrese su correo electrónico."; 
            showModal(feedbackModal); 
            return; 
        } 

        simpleSubmitBtn.textContent = "Enviando..."; 
        simpleSubmitBtn.disabled = true; 

        try { 
            const response = await fetch("https://api.web3forms.com/submit", { 
                method: "POST", 
                body: formData 
            }); 

            const data = await response.json(); 
            hideModal(priceRequestModal); 

            if (response.ok) { 
                feedbackModalTitle.textContent = "¡Enviado con Éxito!"; 
                feedbackModalTitle.className = "text-2xl font-bold font-playfair mb-4 text-success"; 
                feedbackModalMessage.textContent = "Gracias por su mensaje. Le contactaremos pronto."; 
                simpleContactForm.reset(); 
            } else { 
                feedbackModalTitle.textContent = "Error en el Envío"; 
                feedbackModalTitle.className = "text-2xl font-bold font-playfair mb-4 text-error"; 
                feedbackModalMessage.textContent = data.message || "Hubo un problema al enviar su mensaje."; 
            } 

        } catch (error) { 
            hideModal(priceRequestModal); 
            feedbackModalTitle.textContent = "Error de Conexión"; 
            feedbackModalTitle.className = "text-2xl font-bold font-playfair mb-4 text-error"; 
            feedbackModalMessage.textContent = "No se pudo conectar con el servidor."; 
        } finally { 
            simpleSubmitBtn.textContent = originalText; 
            simpleSubmitBtn.disabled = false; 
        } 
    }); 
}

const heroPriceBtn = document.getElementById('hero-price-btn');
if (heroPriceBtn) {
    heroPriceBtn.addEventListener('click', () => {
        showModal(priceRequestModal);
    });
}

const headerPriceBtn = document.getElementById('header-price-btn');
if (headerPriceBtn) {
    headerPriceBtn.addEventListener('click', () => {
        showModal(priceRequestModal);
    });
}

// ============================================ 
// FLOATING WHATSAPP BUTTON 
// ============================================ 
document.addEventListener('DOMContentLoaded', () => { 
    const floatingWhatsAppButton = document.getElementById('floating-whatsapp-button'); 
    if (floatingWhatsAppButton) { 
        const currentMinute = new Date().getMinutes(); 
        const selectedNumber = phoneNumbers[currentMinute % 2].replace('+', ''); 
        const message = "Hola, estoy interesado en sus productos."; 
        floatingWhatsAppButton.href = `https://wa.me/${selectedNumber}?text=${encodeURIComponent(message)}`; 
        
        setTimeout(() => { 
            floatingWhatsAppButton.style.transform = 'scale(1)'; 
            floatingWhatsAppButton.style.opacity = '1'; 
        }, 1000); 
        
        floatingWhatsAppButton.style.transform = 'scale(0)'; 
        floatingWhatsAppButton.style.opacity = '0'; 
        floatingWhatsAppButton.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; 
    } 
});

// ============================================ 
// MODAL HELPER FUNCTIONS 
// ============================================ 
function showModal(modal) { 
    if (modal) { 
        modal.classList.remove('hidden'); 
        document.body.style.overflow = 'hidden'; 
    } 
}

function hideModal(modal) { 
    if (modal) { 
        modal.classList.add('hidden'); 
        document.body.style.overflow = ''; 
    } 
}

// ============================================ 
// CONFETTI EFFECT (OPCIONAL) 
// ============================================ 
function createConfetti() { 
    const colors = ['#DAA520', '#2D5016', '#228B22', '#FFF']; 
    const confettiCount = 50; 
    
    for (let i = 0; i < confettiCount; i++) { 
        const confetti = document.createElement('div'); 
        confetti.style.cssText = ` 
            position: fixed; 
            width: 10px; 
            height: 10px; 
            background: ${colors[Math.floor(Math.random() * colors.length)]}; 
            left: ${Math.random() * 100}vw; 
            top: -10px; 
            opacity: 1; 
            transform: rotate(${Math.random() * 360}deg); 
            z-index: 10000; 
            pointer-events: none; 
        `; 
        
        document.body.appendChild(confetti); 
        
        const animation = confetti.animate([ 
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 }, 
            { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 } 
        ], { 
            duration: 2000 + Math.random() * 1000, 
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
        }); 
        
        animation.onfinish = () => confetti.remove(); 
    } 
}

// ============================================ 
// SHAKE ANIMATION KEYFRAMES 
// ============================================ 
const shakeKeyframes = ` 
    @keyframes shake { 
        0%, 100% { transform: translateX(0); } 
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 
        20%, 40%, 60%, 80% { transform: translateX(5px); } 
    } 
`;

if (!document.querySelector('#shake-animation')) { 
    const style = document.createElement('style'); 
    style.id = 'shake-animation'; 
    style.textContent = shakeKeyframes; 
    document.head.appendChild(style); 
}

// ============================================ 
// PERFORMANCE OPTIMIZATION 
// ============================================ 
function debounce(func, wait) { 
    let timeout; 
    return function executedFunction(...args) { 
        const later = () => { 
            clearTimeout(timeout); 
            func(...args); 
        }; 
        clearTimeout(timeout); 
        timeout = setTimeout(later, wait); 
    }; 
}

if ('IntersectionObserver' in window) { 
    const imageObserver = new IntersectionObserver((entries) => { 
        entries.forEach(entry => { 
            if (entry.isIntersecting) { 
                const img = entry.target; 
                if (img.dataset.src) { 
                    img.src = img.dataset.src; 
                    img.removeAttribute('data-src'); 
                    imageObserver.unobserve(img); 
                } 
            } 
        }); 
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img)); 
}

console.log('✨ EATSA Animations System Loaded Successfully!');

// ============================================ 
// PRODUCT SPECIFICATIONS MODAL 
// ============================================ 

// Datos de especificaciones de productos
const productSpecs = {
    'cacao-fino-aroma': {
        title: 'Cacao Fino de Aroma - Especificaciones Técnicas Completas',
        content: `
            <div class="space-y-6">
                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Descripción</h3>
                    <p class="text-text-secondary">Granos de cacao fino de aroma fermentados y secados, cultivados en la Amazonía peruana bajo estándares orgánicos y de comercio justo. Reconocido internacionalmente por su perfil sensorial único y calidad excepcional.</p>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Especificaciones Técnicas</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Humedad: ≤ 7%</li>
                        <li>Fermentación: ≥ 80%</li>
                        <li>Defectos totales: ≤ 3%</li>
                        <li>Granos mohosos: ≤ 2%</li>
                        <li>Granos pizarrosos: ≤ 3%</li>
                        <li>pH: 5.0 - 5.8</li>
                        <li>Peso por grano: 1.0 - 1.3g</li>
                        <li>Calibre: 90-110 granos/100g</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Perfil Sensorial</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Notas primarias: Frutas rojas, cítricos</li>
                        <li>Notas secundarias: Flores, nueces, miel</li>
                        <li>Amargor: Medio</li>
                        <li>Astringencia: Baja a media</li>
                        <li>Acidez: Equilibrada</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Certificaciones</h3>
                    <div class="flex flex-wrap gap-2">
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ Orgánico USDA (NOP)</span>
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ Orgánico UE (EU 834/2007)</span>
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ Fair Trade (FLO)</span>
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ HACCP</span>
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ Rainforest Alliance</span>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Empaque y Presentación</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Sacos de yute de 50kg o 60kg</li>
                        <li>Sacos de polipropileno de 50kg</li>
                        <li>Super sacos (big bags) de 1000kg</li>
                        <li>Empaques personalizados disponibles</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Origen y Trazabilidad</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Región: San Martín, Tocache, Nuevo Progreso</li>
                        <li>Altitud: 400-600 m.s.n.m.</li>
                        <li>Variedades: CCN-51, ICS, Trinitario</li>
                        <li>Cosecha: Todo el año (picos: marzo-junio, octubre-diciembre)</li>
                        <li>Sistema de trazabilidad: Código QR por lote</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Vida Útil</h3>
                    <p class="text-text-secondary">24 meses desde la fecha de producción en condiciones óptimas de almacenamiento (18-25°C, 65-75% HR)</p>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Muestras</h3>
                    <p class="text-text-secondary">Disponibles muestras gratuitas de 500g-1kg para evaluación sensorial y análisis de laboratorio.</p>
                </div>

                <div class="bg-accent/10 rounded-lg p-4 mt-6">
                    <p class="text-primary font-semibold">¿Interesado en este producto?</p>
                    <button class="btn-primary mt-3 open-price-modal-from-spec">Solicitar Cotización</button>
                </div>
            </div>
        `
    },
    'cafe-altura': {
        title: 'Café de Altura - Especificaciones Técnicas Completas',
        content: `
            <div class="space-y-6">
                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Descripción</h3>
                    <p class="text-text-secondary">Café arábica de altura cultivado en las laderas de la cordillera amazónica peruana, entre 1200-1800 m.s.n.m. Café especial con puntaje SCA superior a 84 puntos, procesado mediante método lavado.</p>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Especificaciones Técnicas</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Humedad: ≤ 12%</li>
                        <li>Actividad de agua (Aw): ≤ 0.65</li>
                        <li>Defectos categoría 1: 0</li>
                        <li>Defectos categoría 2: ≤ 5</li>
                        <li>Puntaje SCA: ≥ 84 puntos</li>
                        <li>Tamaño de grano: Malla 17/18 (≥90%)</li>
                        <li>Densidad: ≥ 680 g/L</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Perfil Sensorial (Tueste medio)</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Aroma: Floral, frutal, caramelo</li>
                        <li>Sabor: Chocolate, cítricos, frutas rojas</li>
                        <li>Acidez: Brillante, cítrica</li>
                        <li>Cuerpo: Medio a medio-alto</li>
                        <li>Balance: Excelente</li>
                        <li>Dulzura: Pronunciada</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Certificaciones</h3>
                    <div class="flex flex-wrap gap-2">
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ Orgánico USDA</span>
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ Orgánico UE</span>
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ Rainforest Alliance</span>
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ HACCP</span>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Variedad y Procesamiento</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Variedad: Caturra, Típica, Bourbon, Pache</li>
                        <li>Procesamiento: Lavado (Washed)</li>
                        <li>Fermentación: 18-24 horas</li>
                        <li>Secado: Solar en camas africanas (12-15 días)</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Empaque</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Sacos de yute de 60kg (grainpro interior)</li>
                        <li>Sacos de yute de 69kg</li>
                        <li>Cajas de 5kg o 10kg (café micro-lote)</li>
                        <li>Vacuum pack disponible</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Origen</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Región: San Martín, Amazonas</li>
                        <li>Altitud: 1200-1800 m.s.n.m.</li>
                        <li>Cosecha principal: Abril-agosto</li>
                        <li>Cosecha mitaca: Noviembre-enero</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Vida Útil</h3>
                    <p class="text-text-secondary">12-18 meses en condiciones óptimas (verde) / 6-12 meses después del tueste</p>
                </div>

                <div class="bg-accent/10 rounded-lg p-4 mt-6">
                    <p class="text-primary font-semibold">¿Interesado en este producto?</p>
                    <button class="btn-primary mt-3 open-price-modal-from-spec">Solicitar Cotización</button>
                </div>
            </div>
        `
    },
    'nibs-cacao': {
        title: 'Nibs de Cacao - Especificaciones Técnicas',
        content: `
            <div class="space-y-6">
                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Descripción</h3>
                    <p class="text-text-secondary">Granos de cacao fermentados, tostados y descascarillados, perfectos para uso industrial en chocolatería, repostería y productos premium.</p>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Especificaciones Técnicas</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Humedad: ≤ 3%</li>
                        <li>Tamaño de partícula: 2-8mm</li>
                        <li>Pureza: ≥ 99%</li>
                        <li>Color: Marrón oscuro característico</li>
                        <li>Sabor: Intenso a cacao, notas frutales</li>
                        <li>Impurezas: ≤ 0.5%</li>
                        <li>Grasa de cacao: 52-54%</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Certificaciones</h3>
                    <div class="flex flex-wrap gap-2">
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ Orgánico USDA/UE</span>
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ Fair Trade</span>
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ HACCP</span>
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ Kosher (bajo pedido)</span>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Empaque</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Sacos de 25kg o 50kg</li>
                        <li>Cajas de 10kg o 20kg</li>
                        <li>Empaques personalizados disponibles</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Aplicaciones</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Elaboración de chocolate</li>
                        <li>Repostería gourmet</li>
                        <li>Snacks saludables</li>
                        <li>Coberturas y toppings</li>
                        <li>Bebidas de cacao premium</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Vida Útil</h3>
                    <p class="text-text-secondary">18 meses en condiciones óptimas de almacenamiento</p>
                </div>

                <div class="bg-accent/10 rounded-lg p-4 mt-6">
                    <p class="text-primary font-semibold">¿Interesado en este producto?</p>
                    <button class="btn-primary mt-3 open-price-modal-from-spec">Solicitar Cotización</button>
                </div>
            </div>
        `
    },
    'chocolate-cacao': {
        title: 'Chocolate de Cacao - Especificaciones Técnicas',
        content: `
            <div class="space-y-6">
                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Descripción</h3>
                    <p class="text-text-secondary">Chocolate artesanal elaborado con cacao fino de aroma peruano de origen único, disponible en diferentes concentraciones y presentaciones.</p>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Especificaciones Técnicas</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Contenido de cacao: 70%, 80% o 85%</li>
                        <li>Presentación: Barras (50g, 100g, 500g) o bulk (bloques 5kg)</li>
                        <li>Azúcar: Orgánica de caña</li>
                        <li>Ingredientes: Cacao, manteca de cacao, azúcar</li>
                        <li>Sin lecitina, sin vainilla (opcional)</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Perfil Sensorial</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Notas: Frutas rojas, nueces, cítricos</li>
                        <li>Textura: Suave y sedosa</li>
                        <li>Fundición: Perfecta a temperatura corporal</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Certificaciones</h3>
                    <div class="flex flex-wrap gap-2">
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ Orgánico USDA/UE</span>
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ Fair Trade</span>
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ Single Origin</span>
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ Bean to Bar</span>
                        <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">✓ HACCP</span>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Presentaciones</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Barras retail: 50g, 100g (con packaging personalizable)</li>
                        <li>Barras profesionales: 500g, 1kg</li>
                        <li>Bloques industriales: 5kg, 10kg</li>
                        <li>Chips/gotas: bolsas de 1kg, 5kg</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Aplicaciones</h3>
                    <ul class="list-disc list-inside space-y-2 text-text-secondary">
                        <li>Consumo directo premium</li>
                        <li>Repostería profesional</li>
                        <li>Coberturas</li>
                        <li>Inclusiones</li>
                        <li>Regalos corporativos</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-primary mb-3">Vida Útil</h3>
                    <p class="text-text-secondary">24 meses almacenado entre 16-20°C, humedad relativa 50-60%</p>
                </div>

                <div class="bg-accent/10 rounded-lg p-4 mt-6">
                    <p class="text-primary font-semibold">¿Interesado en este producto?</p>
                    <button class="btn-primary mt-3 open-price-modal-from-spec">Solicitar Cotización</button>
                </div>
            </div>
        `
    }
};

// Event listeners para abrir modales de especificaciones
document.querySelectorAll('.open-spec-modal').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        const product = productSpecs[productId];
        
        if (product) {
            const specModal = document.getElementById('spec-modal');
            const specModalTitle = document.getElementById('spec-modal-title');
            const specModalContent = document.getElementById('spec-modal-content');
            
            if (specModal && specModalTitle && specModalContent) {
                specModalTitle.textContent = product.title;
                specModalContent.innerHTML = product.content;
                showModal(specModal);
                
                // Re-attach event listeners for price modals inside spec modal
                document.querySelectorAll('.open-price-modal-from-spec').forEach(btn => {
                    btn.addEventListener('click', function() {
                        hideModal(specModal);
                        showModal(priceRequestModal);
                    });
                });
            }
        }
    });
});

// Cerrar modal de especificaciones
const specModalCloseBtn = document.getElementById('spec-modal-close-btn');
if (specModalCloseBtn) {
    specModalCloseBtn.addEventListener('click', function() {
        const specModal = document.getElementById('spec-modal');
        hideModal(specModal);
    });
}

// Cerrar modal al hacer clic fuera
const specModal = document.getElementById('spec-modal');
if (specModal) {
    specModal.addEventListener('click', function(e) {
        if (e.target === this) {
            hideModal(this);
        }
    });
}

console.log('✨ Product Specifications Modal System Loaded!');

const translateAll = (lang) => {
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[lang] && translations[lang][key]) {
      // If the element has children, translate only the text nodes
      if (element.children.length > 0) {
        // Find the text node that is a direct child of the element
        const textNode = Array.from(element.childNodes).find(
          (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
        );
        if (textNode) {
          textNode.textContent = translations[lang][key];
        }
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
};

// ============================================
// LANGUAGE SWITCHER
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');
    if (!languageSwitcher) return;

    const button = document.getElementById('language-switcher-button');
    const dropdown = document.getElementById('language-switcher-dropdown');
    const options = dropdown.querySelectorAll('a');

    const translatePage = (lang) => {
        translateAll(lang);

        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });
    };
    
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
        if (!languageSwitcher.contains(event.target)) {
            dropdown.classList.add('hidden');
        }
    });

    options.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            const buttonImg = button.querySelector('img');
            const buttonSpan = button.querySelector('span');
            const thisImg = this.querySelector('img');

            // Update button content
            if (buttonImg && thisImg) {
                buttonImg.src = thisImg.src;
                buttonImg.alt = thisImg.alt;
            }
            if (buttonSpan) {
                buttonSpan.textContent = lang.toUpperCase();
            }

            // Close dropdown
            dropdown.classList.add('hidden');

            // Translate the page
            translatePage(lang);
        });
    });

    // Initial translation
    translatePage('es');
});
