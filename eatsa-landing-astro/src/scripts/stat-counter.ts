// ─── Stat Counter: animación de conteo (easeOutQuart) ───
// Este script se inyecta en main.ts y anima todos los elementos [data-stat-number]
// cuando entran en viewport. Dura 1.5s con easing easeOutQuart.

interface StatCounterConfig {
  duration: number; // ms
  easing: (t: number) => number;
}

const defaultConfig: StatCounterConfig = {
  duration: 1500,
  easing: (t: number) => 1 - Math.pow(1 - t, 4), // easeOutQuart
};

function parseTarget(value: string): { numeric: number; suffix: string } {
  const num = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '').trim();
  return { numeric: isNaN(num) ? 0 : num, suffix };
}

function animateStat(el: HTMLElement, config: StatCounterConfig = defaultConfig) {
  const targetStr = el.getAttribute('data-target');
  if (!targetStr) return;

  const { numeric: target, suffix } = parseTarget(targetStr);
  const isDecimal = targetStr.includes('.') && !targetStr.includes('%');
  const start = performance.now();

  function tick(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / config.duration, 1);
    const eased = config.easing(progress);
    const current = eased * target;

    if (isDecimal) {
      el.textContent = current.toFixed(1) + suffix;
    } else {
      el.textContent = Math.floor(current) + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      // Asegurar valor final exacto
      el.textContent = targetStr;
    }
  }

  requestAnimationFrame(tick);
}

export function initStatCounters() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const stats = document.querySelectorAll<HTMLElement>('[data-stat-number][data-animated="true"]');
  if (!stats.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStat(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  stats.forEach((stat) => observer.observe(stat));
}
