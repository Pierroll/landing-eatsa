import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies }) => {
  try {
    const data = await request.formData();
    const username = data.get("username");
    const password = data.get("password");
    const envUser = "admin";
    const envHash = "";
    const secret = "super_secret_eatsa_key_2026";
    if (!username || !password || username !== envUser) {
      return new Response(JSON.stringify({ error: "Credenciales inválidas" }), { status: 401 });
    }
    const isValid = await bcrypt.compare(password.toString(), envHash);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Credenciales inválidas" }), { status: 401 });
    }
    const jwt = await new SignJWT({ user: username }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("8h").sign(new TextEncoder().encode(secret));
    cookies.set("admin_session", jwt, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 8
      // 8 horas
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error del servidor" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
