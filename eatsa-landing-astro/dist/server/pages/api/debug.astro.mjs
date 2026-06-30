export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async () => {
  return new Response(JSON.stringify({
    importMetaUser: "admin",
    processEnvUser: process.env.ADMIN_USER,
    importMetaHash: "$2b$10$jk4ntlBQsFJAL/U.V1245ufmgfI2tP6kwD56VRpG9e8DvBmdL/mEO",
    processEnvHash: process.env.ADMIN_PASSWORD_HASH
  }), { status: 200, headers: { "Content-Type": "application/json" } });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
