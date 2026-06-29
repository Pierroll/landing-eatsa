// ─── Parallax sutil en Hero (desktop only) ───
// La imagen se mueve 15% más lento que el scroll, creando profundidad.
// Solo en desktop (>1024px) para no gastar batería en mobile.

export function initHeroParallax() {
  const heroSection = document.querySelector<HTMLElement>('[data-hero-section]');
  if (!heroSection) return;

  // Solo en desktop
  if (window.innerWidth < 1024) return;

  const heroImg = (heroSection as HTMLElement).querySelector<HTMLElement>('img');
  if (!heroImg) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const heroHeight = (heroSection as HTMLElement).offsetHeight;
    
    // Solo aplicar parallax mientras el Hero esté visible
    if (scrollY < heroHeight) {
      const parallaxOffset = scrollY * 0.15;
      (heroImg as HTMLElement).style.transform = `translateY(${parallaxOffset}px)`;
    }
    
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}
