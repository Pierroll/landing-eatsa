---
name: EATSA SAC — Landing Premium Cacao
description: Landing corporativa B2B de exportación de cacao premium con catálogo interactivo y cotización vía WhatsApp.
colors:
  primary: "#2D5B3E"
  neutral-bg: "#F7F1E5"
  neutral-text: "#3A2A1E"
  accent: "#B8924A"
  accent-link: "#6B4226"
  surface-white: "#FFFFFF"
  surface-cool: "#5C7A8A"
  border: "#E8E1D3"
  muted: "#9A8E7A"
  error: "#A23B3B"
typography:
  display:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.22
  body:
    fontFamily: "DM Sans Variable, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  price:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.21
  caption:
    fontFamily: "DM Sans Variable, sans-serif"
    fontSize: "0.8125rem"
    lineHeight: 1.54
  mono:
    fontFamily: "JetBrains Mono Variable, monospace"
rounded:
  btn: "8px"
  card: "12px"
spacing:
  section: "6rem"
  section-sm: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.btn}"
    padding: "14px 28px"
    typography: "body"
  button-primary-hover:
    backgroundColor: "#1F4530"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.btn}"
    padding: "14px 28px"
  button-primary-premium:
    extends: button-primary
    border: "2px solid rgba(184, 146, 74, 0.3)"
    description: "Variante aprobada para CTA de cotización. El borde dorado señala contexto de precio sin violar la regla del dorado como fondo. Ver DESIGN.md: Regla del Dorado (excepción documentada)."
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    border: "1.5px solid {colors.primary}"
    rounded: "{rounded.btn}"
    padding: "14px 28px"
  card-default:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.card}"
    padding: "32px"
---

# Design System: EATSA SAC — Landing Premium Cacao

## 1. Overview

**Creative North Star: "The Amazonian Pantry"**

EATSA SAC es una exportadora peruana de cacao premium. Su presencia digital debe saborearse como un ingrediente más: cálida, sustancial, auténtica. El sistema de diseño evita lo genérico corporativo y lo reemplaza con una atmósfera editorial-premium que evoca el origen, la artesanía y la confianza de una empresa que conoce su producto de adentro hacia afuera.

La paleta es enteramente cálida —crema, verde bosque, ébano, dorado antiguo— sin concesiones a los grises fríos o a los blancos quirúrgicos. Las superficies respiran. La tipografía es limpia pero con carácter: Manrope para los títulos (segura, con peso institucional) y DM Sans para el cuerpo (legible, moderna). El espacio es generoso, el ritmo es pausado, el lujo está en lo que NO se dice.

El sistema rechaza explícitamente: estética SaaS genérica, glassmorphism, gradient text, bordes laterales decorativos, tarjetas anidadas, grids de cards idénticos. Nada que pueda calificarse como "hecho por IA".

**Key Characteristics:**
- **Cálido por identidad, no por decoración.** La crema (#F7F1E5) es el fondo global no negociable. El blanco puro es una excepción reservada a tarjetas y testimonios.
- **Una sola voz de autoridad.** El verde (#2D5B3E) es el color de acción exclusivo: CTA, H1, H2, links en hover. No compite con otros acentos.
- **El dorado es moneda, no adorno.** #B8924A se usa exclusivamente en precios y ofertas. Nunca como detalle decorativo.
- **El espacio es el lujo.** Secciones amplias (6rem de padding vertical), tipografía aireada, márgenes generosos.

## 2. Colors: La Paleta Terroir

La paleta completa está definida en OKLCH implícitamente a través de los valores hex que la componen. Cada color tiene un rol estructural, no decorativo.

### Primary
- **Verde Bosque** (`#2D5B3E`): El color de acción y autoridad. Botones primarios, titulares (H1, H2), navegación activa. Es el ancla visual de la marca.
- **Verde Bosque Dark** (`#1F4530`): Hover de botones primarios. Un paso más profundo pero manteniendo el tono verde.

### Accent
- **Dorado Antiguo** (`#B8924A`): Exclusivo para precios y montos. Nunca decorativo. Usar con moderación — su rareza comunica valor.
- **Cacao** (`#6B4226`): Enlaces dentro del texto. Siempre subrayados. Conecta visualmente con el producto.

### Neutral
- **Crema** (`#F7F1E5`): Fondo global de TODA la web. No usar blanco excepto en tarjetas/testimonios.
- **Ébano** (`#3A2A1E`): Color de texto corporal. Más cálido y descansado que el negro puro sobre crema.
- **Gris Claro** (`#E8E1D3`): Bordes y divisores. Derivado cálido de la crema.
- **Gris Medio** (`#9A8E7A`): Placeholder, metadatos, fechas. Texto secundario.

### Surface
- **Blanco** (`#FFFFFF`): Solo para tarjetas (Card) y testimonios. Rompe la crema intencionalmente para crear jerarquía.
- **Azul Apagado** (`#5C7A8A`): Único color frío del sistema. Reservado a la sección de certificaciones/garantías como fondo de superficie.

### Semantic
- **Error** (`#A23B3B`): Rojo terroso para errores en formularios. Mantiene la coherencia cálida del sistema.
- **Success**: Reutiliza Verde Bosque (`#2D5B3E`). No introducir verde nuevo.
- **Warning**: Reutiliza Dorado Antiguo (`#B8924A`).

### Named Rules
**La Regla del Verde Único.** El verde es el color de acción exclusivo. Nunca se usa en párrafos largos, fondos de sección (excepto CTA final), ni elementos decorativos. Su presencia es siempre funcional.

**La Regla del Dorado como Moneda.** El dorado solo aparece en contextos de precio/valor económico. Si no es un monto, no es dorado.

**Excepción aprobada — Borde dorado en CTA de cotización.** El botón `.btn-premium` usa un borde `border-dorado/30` sobre fondo `bg-verde` para señalar el contexto de precio sin usar dorado como fondo ni como color decorativo. Esta es la ÚNICA excepción documentada a la Regla del Dorado.

**La Regla Azul Frío.** El azul (#5C7A8A) es la única superficie fría permitida. Reservada a certificaciones. Cualquier otro uso rompe la calidez del sistema.

## 3. Typography

**Display Font:** Manrope Variable (sans-serif)
**Body Font:** DM Sans Variable (sans-serif)
**Mono Font:** JetBrains Mono Variable (monospace)

**Character:** La dupla Manrope + DM Sans es limpia y segura. Manrope tiene el peso institucional que los titulares necesitan sin ser frío. DM Sans es moderna, legible y no compite con Manrope porque opera en un rango de peso distinto (400 vs 600). JetBrains Mono se usa con moderación para énfasis técnico y código.

### Hierarchy
- **Hero** (600, `clamp(3.25rem, 7vw, 52px)` / 60px): Portada, primera vista. Solo una por página.
- **Heading XL** (600, `clamp(2rem, 5vw, 36px)` / 44px): Títulos de sección principales.
- **Heading MD** (500, `clamp(1.25rem, 3vw, 24px)` / 32px): Subtítulos, encabezados de tarjetas.
- **Body** (400, 1rem / 28px, `65-75ch`): Texto de lectura. Párrafos, descripciones, UI.
- **Body LG** (400, 18px / 28px): Texto destacado, intro de sección.
- **Price** (600, 28px / 34px): Precios y montos. Usa `text-dorado`.
- **Caption** (400, 13px / 20px): Metadatos, fechas, textos secundarios.
- **Mono** (400, 0.875rem, JetBrains Mono): Énfasis técnico, datos de trazabilidad.

### Named Rules
**La Regla de los 75 Caracteres.** Todo bloque de texto corporal debe tener un ancho máximo de 75 caracteres por línea. Nadie lee párrafos infinitos.

**La Regla del H1 Único.** Solo un H1 por página. El hero lo lleva. Nadie compite con él.

## 4. Elevation

El sistema es predominantemente **plano con sombras sutiles y cálidas**. La profundidad se comunica mediante superposición de superficies (crema → blanco) más que mediante sombras dramáticas. Las sombras existen solo donde hay superposición física: tarjetas sobre fondo.

No hay sombras en estado de reposo para la navegación, botones, inputs, o secciones de fondo completo. La elevación es una excepción, no la regla.

### Shadow Vocabulary
- **Card** (`0px 2px 8px rgba(58, 42, 30, 0.08)`): Sombra base para tarjetas sobre fondo crema. Es la única sombra del sistema. El color de la sombra usa ébano (#3A2A1E) con opacidad baja, manteniendo calidez.
- **Elevated** (`0px 4px 16px rgba(58, 42, 30, 0.06)`): Variante más suave y amplia para modales y tarjetas elevadas (testimonios destacados).

### Named Rules
**La Regla de la Sombra Cálida.** Toda sombra usa ébano con opacidad, no negro o gris frío. Una sombra fría sobre un fondo crema rompe instantáneamente la calidez del sistema.

## 5. Components

### Buttons
- **Shape:** Esquinas rectas de 8px. NUNCA pill/redondeado completo.
- **Primary:** Fondo `verde` (#2D5B3E), texto `crema` (#F7F1E5), padding 14px 28px. Transition de color 200ms.
- **Hover:** `verde-dark` (#1F4530).
- **Focus:** Ring de 2px `verde` con offset sobre fondo crema.
- **Secondary:** Borde 1.5px `verde`, fondo transparente, texto `verde`. Hover con 5% de opacidad verde.
- **Size LG:** Texto 18px, padding 32px 48px. Para CTA hero.

### Cards
- **Corner Style:** 12px border-radius. Más suave que botones para diferenciar contenedores de acciones.
- **Background:** Blanco (`#FFFFFF`) — rompe el fondo crema intencionalmente.
- **Shadow:** `shadow-card` (2px / 8px / rgba-ebano).
- **Border:** 1px solid `gris-claro` (#E8E1D3).
- **Internal Padding:** 32px (padding-lg) o 24px (padding-md).
- **Variants:** `surface="white"` (default) o `surface="cream"` (cuando la card vive sobre fondo blanco/azul).

### Inputs / Fields
- **Style:** Borde 1px `gris-claro`, fondo blanco, texto ébano, placeholder gris-medio.
- **Shape:** 8px border-radius (alineado con botones).
- **Focus:** Borde cambia a `verde`, ring de 1px `verde`.
- **Error:** Borde `error` (#A23B3B).
- **Padding interno:** 12px 16px.

### Navigation
- **Style:** Texto ébano en reposo, hover a verde. Sin fondos, sin bordes. Transparencia es la regla.
- **Header:** Fijo, fondo `crema` con `backdrop-blur-sm`, altura 64px (mobile) / 80px (desktop).
- **Mobile:** Menú hamburguesa con overlay. Navegación vertical con mismos colores.
- **Active:** Sin marcadores especiales — el hover y el scroll position son suficientes.

### Section Surfaces
- **Section Cream** (`bg-crema`): Default. La mayoría de las secciones usan este fondo.
- **Section White** (`bg-white`): Excepción para testimonios o tarjetas elevadas que necesitan destacar sobre crema.
- **Section Verde** (`bg-verde text-crema`): Sección de CTA final o cierre con autoridad de marca.
- **Section Azul** (`bg-azul text-white`): Exclusivo para certificaciones/garantías. Único fondo frío.

### Cart / Cotización
- **CartWidget:** Ícono de carrito en el header con contador de items.
- **CartDrawer:** Drawer lateral (no modal) con lista de productos, cantidades, total y botón de "Continuar por WhatsApp".
- **Checkout Flow:** Botón → mensaje estructurado pre-cargado → redirección a WhatsApp. Sin pasarela de pago.

## 6. Do's and Don'ts

### Do:
- **Do** usar `crema` (#F7F1E5) como fondo global de la web. Es el color que define la identidad visual.
- **Do** usar `verde` como color de acción exclusivo — CTA, H1/H2, links hover.
- **Do** usar `dorado` solo para precios y montos. Es su contexto exclusivo.
- **Do** usar tarjetas blancas sobre fondo crema para crear jerarquía visual.
- **Do** mantener 75 caracteres máximos por línea en párrafos.
- **Do** animar con transiciones suaves (ease-out 0.6s) y `@media (prefers-reduced-motion: reduce)`.
- **Do** usar text-wrap: balance en H1-H3 para evitar huérfanos tipográficos.
- **Do** subrayar los enlaces dentro del texto (color cacao, siempre visibles).
- **Do** usar sombras cálidas basadas en ébano, no en negro.

### Don't:
- **Don't** usar blanco (#FFFFFF) como fondo de página. Solo en tarjetas y testimonios.
- **Don't** usar dorado como color decorativo. Solo en precios.
- **Don't** usar grises fríos en ningún contexto. Todos los grises derivan de la crema y ébano.
- **Don't** crear botones pill/redondeados. 8px es el máximo para botones.
- **Don't** usar gradient text, glassmorphism, side-stripe borders, ni ningún patrón de "AI slop".
- **Don't** usar tarjetas anidadas. Una card dentro de otra siempre es error de diseño.
- **Don't** usar grids de cards idénticos con icono + heading + texto. Variar el contenido.
- **Don't** poner small caps tracked (eyebrow) sobre cada sección. Es el patrón AI más saturado.
- **Don't** usar azul frío fuera de la sección de certificaciones. Rompe la calidez.
- **Don't** animar propiedades de layout (width, height, top, left). Usar transform y opacity.
