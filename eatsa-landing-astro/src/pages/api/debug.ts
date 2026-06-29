export const prerender = false;
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    importMetaUser: import.meta.env.ADMIN_USER,
    processEnvUser: process.env.ADMIN_USER,
    importMetaHash: import.meta.env.ADMIN_PASSWORD_HASH,
    processEnvHash: process.env.ADMIN_PASSWORD_HASH,
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
