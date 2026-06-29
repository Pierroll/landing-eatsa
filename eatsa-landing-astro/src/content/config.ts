/**
 * ⚠️ DATA vs CONTENT (regla fija del proyecto)
 * Las collections SOLO contienen contenido editorial versionable:
 * productos, certificaciones, FAQ, testimonios, proceso, servicios.
 * Los textos usan `nameKey`/`descKey` → claves de i18n/ui.ts.
 * Config estructural (nav, stats numéricos) → src/data/site.ts
 */

import { defineCollection, z } from 'astro:content';

const products = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    /** Clave i18n para el nombre del producto */
    nameKey: z.string(),
    /** Imagen importada via astro:assets (ruta relativa a src/assets/) */
    image: z.string(),
    /** Clave i18n para la etiqueta flotante (Premium, Altura, Artesanal) */
    tagKey: z.string(),
    /** Specs técnicas (3 por producto): label → clave i18n, value → texto fijo */
    specs: z.array(z.object({
      labelKey: z.string(),
      value: z.string(),
    })),
    /** Badges de atributos (Orgánico, Fair Trade, etc.) → claves i18n */
    attributes: z.array(z.string()),
    /** data-product-id para el modal de especificaciones */
    productId: z.string(),
    /** Si es producto destacado en el grid principal (false = solo en formulario) */
    featured: z.boolean().default(true),
    /** Descripción opcional para SEO por entidad */
    metaDescription: z.string().optional(),
  }),
});

const certifications = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    nameKey: z.string(),
    icon: z.string(),
    yearKey: z.string(),
    /** Si la certificación está activa (comentadas en REFERENCE.html → false) */
    enabled: z.boolean().default(true),
  }),
});

const process = defineCollection({
  type: 'content',
  schema: z.object({
    number: z.number(),
    titleKey: z.string(),
    descKey: z.string(),
    icon: z.string(),
    photo: z.string(),
    tags: z.array(z.string()),
    /** 'left' | 'right' para el layout zigzag del timeline */
    side: z.enum(['left', 'right']),
  }),
});

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    roleKey: z.string(),
    company: z.string(),
    /** Imagen de avatar (opcional) */
    avatar: z.string().optional(),
    rating: z.number().min(1).max(5).default(5),
    quoteKey: z.string(),
    /** Si el testimonio está activo (comentado en REFERENCE.html → false) */
    enabled: z.boolean().default(false),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    titleKey: z.string(),
    descKey: z.string(),
  }),
});

const faq = defineCollection({
  type: 'content',
  schema: z.object({
    questionKey: z.string(),
    answerKey: z.string(),
  }),
});

export const collections = {
  products,
  certifications,
  process,
  testimonials,
  services,
  faq,
};
