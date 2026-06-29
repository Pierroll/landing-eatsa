// Reduced motion detection
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    
    // If it's a cross-page anchor like /es/#productos, let standard navigation happen
    if (href.startsWith('/')) return;
    
    e.preventDefault();
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
  const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .scale-in, .stagger-children');

  // Si el usuario prefiere movimiento reducido, revelar todo inmediatamente sin animación
  if (prefersReducedMotion()) {
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
        // Si el elemento tiene hijos con stagger
        if (entry.target.classList.contains('stagger-children')) {
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

// En Astro, los scripts empaquetados se ejecutan cuando el DOM ya está listo (tipo module).
// Por lo tanto, no necesitamos esperar a DOMContentLoaded, simplemente lo ejecutamos:
initHeroEntrance();
initAnimations();

// Si usamos View Transitions en algún momento, también lo necesitamos en page-load:
document.addEventListener('astro:page-load', () => {
  initHeroEntrance();
  initAnimations();
});

// Modals
document.querySelectorAll('.open-spec-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.getElementById('spec-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  });
});

document.querySelectorAll('.open-price-modal, #hero-price-btn, #header-price-btn, #final-price-btn, #header-price-btn-mobile').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.getElementById('price-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  });
});

document.querySelectorAll('.modal-close-btn').forEach(btn => {
  btn.addEventListener('click', function(this: HTMLButtonElement) {
    const modalId = this.getAttribute('data-modal-close');
    if (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }
  });
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
