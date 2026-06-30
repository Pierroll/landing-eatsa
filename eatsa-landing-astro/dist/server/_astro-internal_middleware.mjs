import { d as defineMiddleware, s as sequence } from './chunks/index_s_5BI9vZ.mjs';
import { jwtVerify } from 'jose';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_BxOP5AmQ.mjs';
import '@astrojs/internal-helpers/path';
import 'cookie';

const onRequest$1 = defineMiddleware(async ({ request, cookies, redirect, url }, next) => {
  if (url.pathname.startsWith("/admin") && !url.pathname.includes("/admin/login")) {
    const token = cookies.get("admin_session")?.value;
    if (!token) {
      return redirect("/admin/login");
    }
    try {
      const secret = "qWxC0D4L+Sh4XTqQ9GQawQegv8N7A6Uus7tM0ds41vs=";
      await jwtVerify(token, new TextEncoder().encode(secret));
      return next();
    } catch (error) {
      cookies.delete("admin_session", { path: "/" });
      return redirect("/admin/login");
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
