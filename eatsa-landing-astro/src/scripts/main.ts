import { initStatCounters } from './stat-counter';
import { initHeroParallax } from './parallax';

// Reduced motion detection
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    
    // If it's a cross-page anchor like /es/#productos, let standard navigation happen
    if (href.startsWith('/')) return;
    
    // Si la URL generada es un enlace externo (como WhatsApp), dejar que el navegador lo maneje
    if (href.startsWith('http')) return;
    
    e.preventDefault();
    try {
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });
      }
    } catch (err) {
      // Ignorar errores si el href no es un selector válido
    }
  });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (header) {
    if (currentScroll > 100) {
      header.classList.add('shadow-md', 'bg-crema/98');
      if (!prefersReducedMotion()) {
        header.style.transform = currentScroll > lastScroll ? 'translateY(-100%)' : 'translateY(0)';
      } else {
        header.style.transform = 'translateY(0)';
      }
    } else {
      header.classList.remove('shadow-md', 'bg-crema/98');
      header.style.transform = 'translateY(0)';
    }

    header.style.transition = prefersReducedMotion() ? 'none' : 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
  }
  
  lastScroll = currentScroll;
});

// ─── Hero Entrance (signature animation) ───
function initHeroEntrance() {
  if (prefersReducedMotion()) return;

  const hero = document.querySelector('[data-hero-section]');
  if (!hero) return;

  const elements = hero.querySelectorAll('[data-hero-animate]');
  elements.forEach((el, i) => {
    (el as HTMLElement).style.opacity = '0';
    (el as HTMLElement).style.transform = 'translateY(24px)';
    (el as HTMLElement).style.transition = `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 120}ms, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 120}ms`;
    
    requestAnimationFrame(() => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'translateY(0)';
    });
  });
}

// ─── Scroll Animations con stagger ───
function initAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .scale-in, .stagger-children, .reveal-image, .text-reveal-wrapper');

  // Si el usuario prefiere movimiento reducido, revelar todo inmediatamente sin animación
  if (prefersReducedMotion()) {
    document.querySelectorAll('.text-reveal').forEach(el => el.classList.add('visible'));
    animatedElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Si es el wrapper de text reveal, animamos su hijo
        if (entry.target.classList.contains('text-reveal-wrapper')) {
          const child = entry.target.querySelector('.text-reveal');
          if (child) child.classList.add('visible');
        } else if (entry.target.classList.contains('stagger-children')) {
          const children = Array.from(entry.target.children);
          children.forEach((child, i) => {
            (child as HTMLElement).style.setProperty('--i', String(i));
            child.classList.add('visible');
          });
        }
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => animationObserver.observe(el));
}

// ─── Spotlight Mouse Tracking ───
function initSpotlight() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    (card as HTMLElement).addEventListener('mousemove', (e: MouseEvent) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// En Astro, los scripts empaquetados se ejecutan cuando el DOM ya está listo (tipo module).
// Por lo tanto, no necesitamos esperar a DOMContentLoaded, simplemente lo ejecutamos:
initHeroEntrance();
initAnimations();
initSpotlight();
initStatCounters();
initHeroParallax();

// Si usamos View Transitions en algún momento, también lo necesitamos en page-load:
document.addEventListener('astro:page-load', () => {
  initHeroEntrance();
  initAnimations();
  initSpotlight();
  initStatCounters();
  initHeroParallax();
});

// Modals — con data-state para animación
const openModal = (id: string) => {
  const modal = document.getElementById(id);
  if (modal) modal.setAttribute('data-state', 'open');
};

const closeModal = (id: string) => {
  const modal = document.getElementById(id);
  if (modal) modal.setAttribute('data-state', 'closed');
};

document.querySelectorAll('.open-spec-modal').forEach(btn => {
  btn.addEventListener('click', () => openModal('spec-modal'));
});

document.querySelectorAll('.open-price-modal, #hero-price-btn, #header-price-btn, #final-price-btn, #header-price-btn-mobile').forEach(btn => {
  btn.addEventListener('click', () => openModal('price-modal'));
});

// Close ANY modal via data-modal-close (botones, links, anchors)
document.addEventListener('click', (e) => {
  const trigger = (e.target as HTMLElement).closest('[data-modal-close]');
  if (!trigger) return;

  const modalId = trigger.getAttribute('data-modal-close');
  if (!modalId) return;

  const action = trigger.getAttribute('data-action');

  if (action === 'close-and-scroll') {
    e.preventDefault();
    closeModal(modalId);

    const target = trigger.getAttribute('data-target') || '';
    if (target) {
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 250);
    }
  } else {
    closeModal(modalId);
  }
});

// Mobile menu
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
    mobileMenu.classList.toggle('hidden');
  });
}

// Escape key — cierra cualquier modal abierto
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('[data-state="open"]').forEach(modal => {
      modal.setAttribute('data-state', 'closed');
    });
  }
});

// ─── Toast de notificación (añadido al carrito) ───
let toastTimer: ReturnType<typeof setTimeout> | null = null;

document.addEventListener('cart:added', ((e: CustomEvent) => {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  const productName = e.detail?.productName || 'Producto';

  // Limpiar timer anterior
  if (toastTimer) clearTimeout(toastTimer);

  // Resetear clases
  toast.classList.remove('hiding', 'visible');

  // Forzar reflow para reiniciar animación
  void toast.offsetWidth;

  toastMsg.textContent = `${productName} añadido a cotización`;
  toast.classList.add('visible');
  toast.setAttribute('aria-hidden', 'false');

  toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
    toast.classList.add('hiding');
    toast.setAttribute('aria-hidden', 'true');

    toastTimer = setTimeout(() => {
      toast.classList.remove('hiding');
    }, 600);
  }, 3000);
}) as EventListener);
