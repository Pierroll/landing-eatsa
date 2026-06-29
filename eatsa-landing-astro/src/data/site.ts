/**
 * ⚠️ DATA vs CONTENT (regla fija del proyecto)
 * Este archivo SOLO contiene configuración estructural que NO cambia
 * por idioma de contenido: estructura de nav, stats numéricos,
 * config del formulario (options, countries), datos de empresa.
 * Cualquier texto editorial ES/EN → va en src/content/* + i18n/ui.ts
 * NUNCA duplicar strings traducibles aquí.
 */

export const siteConfig = {
  /** Razón social legal */
  legalName: 'Exportadora Amazónica Tropical S.A.C.',
  /** Nombre comercial */
  name: 'EATSA SAC',
  /** RUC (registro tributario peruano) */
  ruc: '20614960389',
  /** Dirección física */
  address: 'Av Marginal s/n esq. Carlos Honores, Nuevo Progreso, Tocache, San Martín, 22551',
  /** Correos corporativos (orden: gerencia → subgerencia → comercial) */
  emails: [
    { address: 'gerencia@amazonicatropical.com', roleKey: 'contact.info.roleManagement' },
    { address: 'subgerencia@amazonicatropical.com', roleKey: 'contact.info.roleSubmanagement' },
    { address: 'comercial@amazonicatropical.com', roleKey: 'contact.info.roleCommercial' },
  ],
  /** Teléfonos unificados (resuelve inconsistencia de 3 teléfonos distintos en REFERENCE.html) */
  phones: [
    { number: '+51 980 228 368', roleKey: 'contact.info.roleWhatsapp', isWhatsApp: true },
    { number: '+51 930 369 251', roleKey: 'contact.info.roleOffice', isWhatsApp: false },
  ],
  /** Horarios de atención */
  hoursKey: 'contact.info.hours',
  /** Redes sociales */
  socials: [
    { platform: 'facebook', url: 'https://facebook.com/share/1GMDaQehW5/' },
  ],
  /** Calendly para agendar reuniones */
  calendlyUrl: 'https://calendly.com/comercial-amazonicatropical/30min',
  /** Logo SVG (permanece en /public porque astro:assets no procesa SVGs) */
  logo: '/logo23.svg',
} as const;

/** Estructura de la navegación principal. Las labels se resuelven vía i18n/ui.ts. */
export const navItems = [
  { id: 'productos', href: '#productos', labelKey: 'nav.products' },
  { id: 'origen', href: '#origen', labelKey: 'nav.origin' },
  { id: 'certificaciones', href: '#certificaciones', labelKey: 'nav.certifications' },
  { id: 'proceso', href: '#proceso', labelKey: 'nav.process' },
  { id: 'contacto', href: '#contacto', labelKey: 'nav.contact' },
] as const;

/** Stats del Hero (valores numéricos, labels vía i18n) */
export const heroStats = [
  { value: '10+', labelKey: 'hero.experience' },
  { value: '100+', labelKey: 'hero.producers' },
  { value: '100+', labelKey: 'hero.tonsPerMonth' },
] as const;

/** Tarjetas de Problem Statement (stats + datos, labels vía i18n) */
export const problems = [
  { iconType: 'error' as const, stat: '45%', titleKey: 'problems.quality.title', descKey: 'problems.quality.desc' },
  { iconType: 'warning' as const, stat: '60%', titleKey: 'problems.traceability.title', descKey: 'problems.traceability.desc' },
  { iconType: 'error' as const, stat: '70%', titleKey: 'problems.certifications.title', descKey: 'problems.certifications.desc' },
] as const;

/** Stats de capacidad de exportación */
export const exportStats = [
  { value: '100+', labelKey: 'export.tonsMonth' },
  { value: '5+', labelKey: 'export.countries' },
  { value: '48h', labelKey: 'export.response' },
  { value: '99.8%', labelKey: 'export.onTime' },
] as const;

/** Config del formulario de contacto (estructura, sin labels traducibles) */
export const contactForm = {
  countries: ['PE', 'US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'MY', 'JP', 'NL', 'AU', 'OTHER'],
  productOptions: ['cacao', 'cafe', 'jengibre', 'frutas'],
  volumes: ['1-5', '5-20', '20-50', '50+'],
  businessTypes: ['manufacturer', 'importer', 'retailer', 'processor', 'other'],
  /** Web3Forms access key legacy (se mantiene como fallback; la ruta principal es la API route) */
  web3formsKey: '4a32783d-facb-4b17-8111-e1d9fa378dee',
} as const;
