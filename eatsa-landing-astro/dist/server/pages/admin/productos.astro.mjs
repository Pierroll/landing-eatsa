/* empty css                                    */
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_Bg-g91To.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_C-CbQ7NA.mjs';
import { g as getProductos } from '../../chunks/db_DsWhjv-W.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const productos = await getProductos();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Gesti\xF3n de Productos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between mb-8"> <div> <h1 class="text-2xl font-bold text-verde mb-1">Productos</h1> <p class="text-sm text-gris-medio">Administra el catálogo de EATSA</p> </div> <button id="add-product-btn" class="btn-primary">
+ Nuevo Producto
</button> </div> <div class="bg-white rounded-xl shadow-sm border border-gris-claro overflow-hidden"> <table class="w-full text-left border-collapse"> <thead> <tr class="bg-crema border-b border-gris-claro text-sm text-gris-medio"> <th class="p-4 font-medium">Imagen</th> <th class="p-4 font-medium">ID / Slug</th> <th class="p-4 font-medium">Nombre</th> <th class="p-4 font-medium">Estado</th> <th class="p-4 font-medium text-right">Acciones</th> </tr> </thead> <tbody> ${productos.length === 0 ? renderTemplate`<tr> <td colspan="5" class="p-8 text-center text-gris-medio">No hay productos registrados.</td> </tr>` : productos.map((p) => renderTemplate`<tr class="border-b border-gris-claro last:border-0 hover:bg-gray-50 transition-colors"> <td class="p-4"> <img${addAttribute(p.image, "src")}${addAttribute(p.name, "alt")} class="w-16 h-16 object-cover rounded-md border border-gris-claro"> </td> <td class="p-4 text-sm text-gris-medio font-mono">${p.id}</td> <td class="p-4 font-medium text-ebano"> ${p.name} <div class="text-xs text-gris-medio mt-1">${p.tag}</div> </td> <td class="p-4"> <span${addAttribute(`inline-block px-2 py-1 text-xs rounded-full ${p.status === "activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, "class")}> ${p.status} </span> </td> <td class="p-4 text-right"> <button class="text-sm text-verde hover:text-cacao transition-colors font-medium edit-btn mr-4"${addAttribute(JSON.stringify(p), "data-product")}>Editar</button> <button class="text-sm text-red-500 hover:text-red-700 transition-colors font-medium delete-btn"${addAttribute(p.id, "data-id")}>Eliminar</button> </td> </tr>`)} </tbody> </table> </div>  <div id="product-modal" class="fixed inset-0 bg-ebano/50 z-50 hidden flex items-center justify-center p-4"> <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto"> <h2 id="modal-title" class="text-xl font-bold text-verde mb-4">Nuevo Producto</h2> <form id="product-form" class="flex flex-col gap-4"> <div class="grid grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-ebano mb-1">ID / Slug</label> <input type="text" name="id" required class="w-full border border-gris-claro rounded-btn p-2"> </div> <div> <label class="block text-sm font-medium text-ebano mb-1">Nombre</label> <input type="text" name="name" required class="w-full border border-gris-claro rounded-btn p-2"> </div> </div> <div class="grid grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-ebano mb-1">Tag (ej. Exportación)</label> <input type="text" name="tag" required class="w-full border border-gris-claro rounded-btn p-2"> </div> <div> <label class="block text-sm font-medium text-ebano mb-1">Ruta Imagen</label> <input type="text" name="image" value="/assets/hero/cacao-hero.jpg" required class="w-full border border-gris-claro rounded-btn p-2"> </div> </div> <div> <label class="block text-sm font-medium text-ebano mb-1">Atributos (separados por coma)</label> <input type="text" name="attributes" placeholder="Orgánico, Comercio Justo" class="w-full border border-gris-claro rounded-btn p-2"> </div> <div> <label class="block text-sm font-medium text-ebano mb-1">Especificaciones (Una por línea, formato: "Label: Valor")</label> <textarea name="specs" rows="3" placeholder="Humedad: 7%
Fermentación: 80%" class="w-full border border-gris-claro rounded-btn p-2 font-mono text-sm"></textarea> </div> <div> <label class="block text-sm font-medium text-ebano mb-1">Estado</label> <select name="status" class="w-full border border-gris-claro rounded-btn p-2"> <option value="activo">Activo</option> <option value="inactivo">Inactivo</option> </select> </div> <div class="flex justify-end gap-2 mt-4 pt-4 border-t border-gris-claro"> <button type="button" id="close-modal-btn" class="btn-secondary">Cancelar</button> <button type="submit" class="btn-primary">Guardar Producto</button> </div> </form> </div> </div>  ` })}`;
}, "/Users/pierol/Documents/Proyectos/Trabajo/Acopio-Export-Cacao/Lading-Page/eatsa-landing-astro/src/pages/admin/productos/index.astro", void 0);

const $$file = "/Users/pierol/Documents/Proyectos/Trabajo/Acopio-Export-Cacao/Lading-Page/eatsa-landing-astro/src/pages/admin/productos/index.astro";
const $$url = "/admin/productos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
