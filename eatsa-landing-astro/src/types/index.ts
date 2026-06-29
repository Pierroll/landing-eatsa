/**
 * Contratos de props de los componentes UI base (src/components/ui/).
 * Centralizar aquí evita duplicar interfaces entre componentes y garantiza
 * consistencia de la API pública del design system.
 */

export type Variant = 'primary' | 'secondary';
export type Size = 'md' | 'lg';
export type Surface = 'cream' | 'white';

export interface ButtonProps {
  variant?: Variant;
  href?: string;
  size?: Size;
  /** type nativo cuando es <button> (no <a>) */
  type?: 'button' | 'submit' | 'reset';
  class?: string;
  [key: string]: unknown;
}

export interface CardProps {
  surface?: Surface;
  padding?: 'md' | 'lg';
  class?: string;
}

export interface BadgeProps {
  variant?: 'tag' | 'attribute' | 'price';
  label: string;
  class?: string;
}

export interface StatProps {
  value: string | number;
  label: string;
  /** Si true, el número se anima (count-up) al entrar en viewport */
  animated?: boolean;
  class?: string;
}

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Alineación del bloque de cabecera */
  align?: 'left' | 'center';
  class?: string;
}

export interface ContainerProps {
  class?: string;
}

/** Idiomas soportados por el sitio. */
export type Locale = 'es' | 'en';

/**
 * Clave de traducción. Re-exportada desde i18n/ui.ts para que los componentes
 * puedan importarla desde '@types' junto con Locale.
 */
export type TranslationKey = string;
