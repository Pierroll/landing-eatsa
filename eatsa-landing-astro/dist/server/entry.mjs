import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_41eyFENl.mjs';
import { manifest } from './manifest_Dw23_aHm.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin/login.astro.mjs');
const _page3 = () => import('./pages/admin/productos.astro.mjs');
const _page4 = () => import('./pages/admin.astro.mjs');
const _page5 = () => import('./pages/api/auth.astro.mjs');
const _page6 = () => import('./pages/api/contact.astro.mjs');
const _page7 = () => import('./pages/api/debug.astro.mjs');
const _page8 = () => import('./pages/api/productos.astro.mjs');
const _page9 = () => import('./pages/robots.txt.astro.mjs');
const _page10 = () => import('./pages/_lang_/404.astro.mjs');
const _page11 = () => import('./pages/_lang_.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin/login.astro", _page2],
    ["src/pages/admin/productos/index.astro", _page3],
    ["src/pages/admin/index.astro", _page4],
    ["src/pages/api/auth.ts", _page5],
    ["src/pages/api/contact.ts", _page6],
    ["src/pages/api/debug.ts", _page7],
    ["src/pages/api/productos.ts", _page8],
    ["src/pages/robots.txt.ts", _page9],
    ["src/pages/[lang]/404.astro", _page10],
    ["src/pages/[lang]/index.astro", _page11],
    ["src/pages/index.astro", _page12]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///Users/pierol/Documents/Proyectos/Trabajo/Acopio-Export-Cacao/Lading-Page/eatsa-landing-astro/dist/client/",
    "server": "file:///Users/pierol/Documents/Proyectos/Trabajo/Acopio-Export-Cacao/Lading-Page/eatsa-landing-astro/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
{
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
