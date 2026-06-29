import { s as saveProducto } from '../../chunks/db_DJSxRCfF.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies }) => {
  if (!cookies.has("admin_session")) {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
  }
  try {
    const data = await request.json();
    if (!data.id || !data.name) {
      return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), { status: 400 });
    }
    const producto = {
      id: data.id,
      name: data.name,
      price: data.price ? Number(data.price) : null,
      image: data.image || "/assets/placeholder.jpg",
      status: data.status === "activo" ? "activo" : "inactivo"
    };
    await saveProducto(producto);
    return new Response(JSON.stringify({ success: true, producto }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al procesar" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
