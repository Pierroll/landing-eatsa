import { e as createAstro, c as createComponent, f as renderHead, h as renderSlot, d as renderTemplate } from './astro/server_Bg-g91To.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro("https://amazonicatropical.com");
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} - Admin EATSA</title>${renderHead()}</head> <body class="bg-crema text-ebano font-body min-h-screen flex flex-col"> <!-- Navbar Admin --> <header class="bg-verde text-crema shadow-md"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"> <div class="flex items-center gap-4"> <a href="/admin" class="font-bold text-lg tracking-wider">EATSA Admin</a> <div class="flex items-center gap-6 text-sm font-medium"> <a href="/admin/productos" class="text-white/80 hover:text-white transition-colors">Productos</a> </div> </div> <div> <button id="logout-btn" class="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-btn transition-colors">Cerrar Sesión</button> </div> </div> </header> <!-- Main Content --> <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8"> ${renderSlot($$result, $$slots["default"])} </main>  </body> </html>`;
}, "/Users/pierol/Documents/Proyectos/Trabajo/Acopio-Export-Cacao/Lading-Page/eatsa-landing-astro/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
