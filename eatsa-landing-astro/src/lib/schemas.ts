import { z } from 'zod';

/**
 * Schemas Zod COMPARTIDOS entre:
 *  - Content Collections (src/content/config.ts) → validación en build
 *  - API route de contacto (src/pages/api/contact.ts) → validación en runtime
 *
 * No duplicar validación: si una regla cambia, cambia aquí y se propaga a ambos lados.
 */

// ─── Catálogos del formulario (estructura, no traducciones) ───────────────
export const countryCodes = [
  'PE', 'US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'MY', 'JP', 'NL', 'AU', 'OTHER',
] as const;

export const volumeRanges = ['1-5', '5-20', '20-50', '50+'] as const;

export const businessTypes = [
  'manufacturer', 'importer', 'retailer', 'processor', 'other',
] as const;

export const productOptions = [
  'cacao', 'cafe', 'jengibre', 'frutas',
] as const;

// ─── Schema del formulario de contacto B2B ────────────────────────────────
export const contactFormSchema = z.object({
  full_name: z.string().min(2).max(100),
  company: z.string().min(2).max(120),
  country: z.enum(countryCodes),
  email: z.email('Email inválido').max(120),
  phone: z.string().max(40).optional().or(z.literal('')),
  position: z.string().max(80).optional().or(z.literal('')),
  products: z.array(z.enum(productOptions)).optional().default([]),
  volume: z.enum(volumeRanges).optional().or(z.literal('')),
  business_type: z.enum(businessTypes).optional().or(z.literal('')),
  message: z.string().min(10).max(2000),
  terms: z.literal(true, { message: 'Debes aceptar los términos' }),

  // Honeypot anti-spam: debe llegar VACÍO. Si llega relleno → es un bot.
  // El campo se renderiza oculto vía CSS en ContactSection.astro (no type="hidden").
  company_website: z.string().max(0).or(z.literal('')).optional().default(''),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// ─── Tipos derivados de catálogos (para reutilizar en UI/data) ────────────
export type CountryCode = (typeof countryCodes)[number];
export type VolumeRange = (typeof volumeRanges)[number];
export type BusinessType = (typeof businessTypes)[number];
export type ProductOption = (typeof productOptions)[number];

// ─── Item de spec de producto (compartido entre ProductCard y modal spec) ─
export const specItemSchema = z.object({
  labelKey: z.string(),
  value: z.string(),
});

export type SpecItem = z.infer<typeof specItemSchema>;
