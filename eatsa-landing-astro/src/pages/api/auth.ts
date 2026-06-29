export const prerender = false;
import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    const envUser = import.meta.env.ADMIN_USER;
    const envHash = import.meta.env.ADMIN_PASSWORD_HASH;
    const secret = import.meta.env.JWT_SECRET;

    console.log('--- DEBUG AUTH ---');
    console.log('Req User:', username);
    console.log('Env User:', envUser);
    console.log('Req Pass:', password);
    console.log('Env Hash:', envHash);

    if (!username || !password || username !== envUser) {
      console.log('Falla validación inicial');
      return new Response(JSON.stringify({ error: 'Credenciales inválidas' }), { status: 401 });
    }

    const isValid = await bcrypt.compare(password.toString(), envHash);

    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Credenciales inválidas' }), { status: 401 });
    }

    // Sign JWT
    const jwt = await new SignJWT({ user: username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('8h')
      .sign(new TextEncoder().encode(secret));

    // Set cookie
    cookies.set('admin_session', jwt, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 60 * 60 * 8 // 8 horas
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error del servidor' }), { status: 500 });
  }
};
