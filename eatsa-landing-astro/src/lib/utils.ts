import type { Locale } from '@types';

/**
 * Utils puros del proyecto. Sin dependencias externas.
 * El color de marca (dorado/verde) se aplica SIEMPRE en el JSX del componente,
 * nunca aquí — estos helpers solo formatean valores.
 */

/**
 * Join condicional de clases (estilo clsx minimal, sin dependencia).
 * Filtra falsy (false, null, undefined, '') y une con espacio.
 *
 * @example cn('px-4', isActive && 'bg-verde', null) → 'px-4 bg-verde'
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formatea un número como precio B2B.
 * El color Dorado Antiguo se aplica en el componente (<span class="text-price">),
 * este helper solo devuelve el string formateado.
 *
 * @example formatPrice(4.5, 'en') → '$4.50 USD/kg'
 */
export function formatPrice(value: number, lang: Locale = 'es'): string {
  const locale = lang === 'en' ? 'en-US' : 'es-PE';
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return `$${formatted} USD/kg`;
}

/**
 * Formatea una fecha localizada según el idioma activo.
 *
 * @example formatDate('2024-03-15', 'es') → '15 de marzo de 2024'
 */
export function formatDate(date: string | Date, lang: Locale = 'es'): string {
  const locale = lang === 'en' ? 'en-US' : 'es-PE';
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}
