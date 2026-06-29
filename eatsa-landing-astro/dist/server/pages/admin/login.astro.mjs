/* empty css                                    */
import { e as createAstro, c as createComponent, f as renderHead, d as renderTemplate } from '../../chunks/astro/server_Bg-g91To.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://amazonicatropical.com");
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  if (Astro2.cookies.has("admin_session")) {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Login - Administración EATSA</title>${renderHead()}</head> <body class="bg-crema min-h-screen flex items-center justify-center p-4 font-body"> <div class="bg-white p-8 rounded-xl shadow-elevated w-full max-w-md"> <div class="text-center mb-8"> <h1 class="text-2xl font-bold text-verde mb-2">Panel EATSA</h1> <p class="text-gris-medio">Ingresa tus credenciales para administrar el contenido</p> </div> <form id="login-form" class="flex flex-col gap-5"> <div> <label class="block text-sm font-medium text-ebano mb-1" for="username">Usuario</label> <input type="text" id="username" name="username" required class="w-full border border-gris-claro rounded-btn p-3 focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde"> </div> <div> <label class="block text-sm font-medium text-ebano mb-1" for="password">Contraseña</label> <input type="password" id="password" name="password" required class="w-full border border-gris-claro rounded-btn p-3 focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde"> </div> <div id="error-message" class="text-red-500 text-sm hidden bg-red-50 p-3 rounded-md"></div> <button type="submit" class="btn-primary w-full mt-2 flex justify-center items-center"> <span id="btn-text">Ingresar</span> <span id="btn-spinner" class="hidden ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> </button> </form> </div>  </body> </html>`;
}, "/Users/pierol/Documents/Proyectos/Trabajo/Acopio-Export-Cacao/Lading-Page/eatsa-landing-astro/src/pages/admin/login.astro", void 0);

const $$file = "/Users/pierol/Documents/Proyectos/Trabajo/Acopio-Export-Cacao/Lading-Page/eatsa-landing-astro/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
