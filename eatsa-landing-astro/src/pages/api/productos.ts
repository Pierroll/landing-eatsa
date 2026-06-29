export const prerender = false;
import type { APIRoute } from 'astro';
import { saveProducto, deleteProducto, type Producto } from '@/lib/db';

export const POST: APIRoute = async ({ request, cookies }) => {
  // Verificación de seguridad
  if (!cookies.has('admin_session')) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    const data = await request.json();
    await saveProducto(data as Producto);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al guardar producto' }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, cookies, url }) => {
  if (!cookies.has('admin_session')) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    const id = url.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID requerido' }), { status: 400 });
    }
    
    await deleteProducto(id);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al eliminar producto' }), { status: 500 });
  }
};
