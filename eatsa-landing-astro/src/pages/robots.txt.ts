import type { APIRoute } from 'astro';

// robots.txt dinámico. Apunta al sitemap generado por @astrojs/sitemap.
// output: 'hybrid' prerenderiza endpoints por defecto; este puede ser estático.
export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('https://amazonicatropical.com')).href.replace(/\/$/, '');
  const body = `User-agent: *
Allow: /

# Sitemap multi-idioma generado por @astrojs/sitemap
Sitemap: ${base}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
