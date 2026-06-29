# Product

## Register

brand

> **Nota:** El sistema tiene un componente híbrido — el frontend público es brand (la landing es el producto), pero el panel de administración CMS en subdominio es product (design SERVES the product). Para tareas del panel admin, sobrescribir register a `product` por tarea.

## Users

### Cliente / Visitante (Público)
- **Quiénes son:** Importadores internacionales, distribuidores, fabricantes de chocolate locales, compradores independientes.
- **Contexto:** Buscan cacao premium de aroma, café y nibs de alta calidad. Provienen de búsquedas orgánicas (SEO) o referencias directas. Operan desde desktop y mobile.
- **Job to be done:** Explorar catálogo, ver certificaciones, entender el origen del producto, y realizar un pedido B2B rápido vía WhatsApp sin fricción.
- **Emociones:** Confianza, profesionalismo, conexión con el origen artesanal.

### Administrador de Ventas (Interno)
- **Quiénes son:** Equipo de ventas de EATSA SAC.
- **Contexto:** Sin conocimientos técnicos de programación. Usan el panel desde cualquier dispositivo.
- **Job to be done:** Gestionar catálogo de productos, actualizar contenido de secciones estáticas, subir imágenes.
- **Necesidad:** Interfaz extremadamente sencilla, intuitiva y directa.

## Product Purpose

EATSA (Amazónica Tropical SAC) necesita una página web empresarial que actúe como su principal canal de presencia digital y venta B2B. La plataforma debe:

- Presentar la identidad corporativa, el origen y los valores de la empresa.
- Exhibir un catálogo interactivo de productos premium (cacao fino de aroma, café, nibs) con especificaciones, certificaciones y atributos.
- Permitir a clientes internacionales armar un carrito de cotización y procesar el pedido redirigiendo a WhatsApp con el resumen estructurado.
- Soportar multi-idioma (Español e Inglés) para alcance global.
- Proveer un panel de administración simple para que el equipo de ventas gestione contenido sin conocimientos técnicos.

**Éxito =** Clientes internacionales exploran, cotizan y contactan por WhatsApp en el menor número de clics posible.

## Brand Personality

Premium · Artesanal · Sostenible

- **Voz:** Cálida pero profesional. Habla desde la experiencia y la tradición, no desde lo corporativo frío.
- **Tono:** Acogedor, con autoridad en el rubro. Refleja el orgullo del origen peruano y el trabajo directo con agricultores.
- **Emociones:** Confianza, exclusividad, conexión con la tierra.

## Anti-references

Confío en el criterio de diseño para evitar patrones genéricos. Puntos clave a evitar:

- Interfaces que parezcan plantillas SaaS genéricas o Shopify básico.
- Paletas frías o grises que rompan la calidez del sistema (crema, verde bosque, dorado).
- Exceso de cards idénticas, side-stripe borders, gradient text, glassmorphism decorativo.
- Sonido a "hecho por IA" — el diseño debe sentirse artesanal y único, no generado.

## Design Principles

1. **La calidez es identidad, no decoración.** La paleta tierra (crema, verde bosque, ébano, dorado) no es un tema — es parte del ADN de la marca. Cada elección cromática debe reforzar el origen y la calidad del producto.

2. **Del catálogo a WhatsApp en dos clics.** El flujo de cotización debe ser el camino más corto y sin fricción del sitio. Cada paso intermedio es una oportunidad de pérdida.

3. **El producto es el héroe.** La fotografía del cacao, café y nibs debe tener el protagonismo. El diseño es el escenario, no la obra. Tipografía amplia, imágenes grandes, texto justo.

4. **Confianza a primera vista.** Certificaciones, trazabilidad y el origen peruano deben ser evidentes sin necesidad de buscar. El diseño comunica "esto es premium, esto es real".

5. **Idioma como puente, no como barrera.** Español e Inglés con paridad de calidad. El switch de idioma debe ser instantáneo y no romper el flujo del usuario.

## Accessibility & Inclusion

- WCAG nivel AA como objetivo base.
- Contraste mínimo 4.5:1 para texto corporal (el sistema de color actual con crema sobre ébano ya lo cumple).
- `@media (prefers-reduced-motion: reduce)` para todas las animaciones.
- Navegación por teclado funcional en todo el flujo de catálogo y carrito.
- Texto alternativo descriptivo en todas las imágenes de producto.
