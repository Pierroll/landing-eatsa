import { d as deleteProducto, s as saveProducto } from '../../chunks/db_DsWhjv-W.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies }) => {
  if (!cookies.has("admin_session")) {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
  }
  try {
    const data = await request.json();
    await saveProducto(data);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al guardar producto" }), { status: 500 });
  }
};
const DELETE = async ({ request, cookies, url }) => {
  if (!cookies.has("admin_session")) {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
  }
  try {
    const id = url.searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ error: "ID requerido" }), { status: 400 });
    }
    await deleteProducto(id);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al eliminar producto" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
