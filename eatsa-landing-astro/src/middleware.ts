import { defineMiddleware } from 'astro:middleware';
import { jwtVerify } from 'jose';

export const onRequest = defineMiddleware(async ({ request, cookies, redirect, url }, next) => {
  // Proteger solo las rutas bajo /admin, excluyendo /admin/login
  if (url.pathname.startsWith('/admin') && !url.pathname.includes('/admin/login')) {
    const token = cookies.get('admin_session')?.value;
    
    if (!token) {
      return redirect('/admin/login');
    }

    try {
      const secret = import.meta.env.JWT_SECRET;
      // Verificar JWT
      await jwtVerify(token, new TextEncoder().encode(secret));
      // Token válido, continuar
      return next();
    } catch (error) {
      // Token inválido o expirado
      cookies.delete('admin_session', { path: '/' });
      return redirect('/admin/login');
    }
  }

  return next();
});
