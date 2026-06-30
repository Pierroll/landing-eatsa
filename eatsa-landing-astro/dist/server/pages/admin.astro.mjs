/* empty css                                 */
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Bg-g91To.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_DZwGbGC0.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8"> <h1 class="text-3xl font-bold text-verde mb-2">Bienvenido al Panel de Control</h1> <p class="text-gris-medio">Desde aquí puedes gestionar el contenido de la web de EATSA.</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <!-- Card Productos --> <a href="/admin/productos" class="bg-white p-6 rounded-xl shadow-sm border border-gris-claro hover:shadow-elevated transition-shadow group"> <div class="flex items-center gap-4 mb-4"> <div class="p-3 bg-cacao/10 rounded-lg text-cacao group-hover:bg-cacao group-hover:text-white transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path> <line x1="7" y1="7" x2="7.01" y2="7"></line> </svg> </div> <h2 class="text-xl font-bold text-ebano">Productos</h2> </div> <p class="text-gris-medio text-sm">Añade, edita o elimina los productos del catálogo, cambia sus imágenes y precios.</p> </a> <!-- Card Páginas --> <a href="/admin/paginas" class="bg-white p-6 rounded-xl shadow-sm border border-gris-claro hover:shadow-elevated transition-shadow group"> <div class="flex items-center gap-4 mb-4"> <div class="p-3 bg-verde/10 rounded-lg text-verde group-hover:bg-verde group-hover:text-white transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path> <polyline points="14 2 14 8 20 8"></polyline> <line x1="16" y1="13" x2="8" y2="13"></line> <line x1="16" y1="17" x2="8" y2="17"></line> <polyline points="10 9 9 9 8 9"></polyline> </svg> </div> <h2 class="text-xl font-bold text-ebano">Textos Estáticos</h2> </div> <p class="text-gris-medio text-sm">Modifica los textos de las secciones estáticas como Inicio, Nosotros, Certificaciones, etc.</p> </a> </div> ` })}`;
}, "/Users/pierol/Documents/Proyectos/Trabajo/Acopio-Export-Cacao/Lading-Page/eatsa-landing-astro/src/pages/admin/index.astro", void 0);

const $$file = "/Users/pierol/Documents/Proyectos/Trabajo/Acopio-Export-Cacao/Lading-Page/eatsa-landing-astro/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
