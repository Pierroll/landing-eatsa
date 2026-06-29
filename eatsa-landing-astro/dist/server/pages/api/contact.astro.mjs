import 'resend';
import { z } from 'zod';
export { renderers } from '../../renderers.mjs';

const countryCodes = [
  "PE",
  "US",
  "CA",
  "GB",
  "DE",
  "FR",
  "IT",
  "ES",
  "MY",
  "JP",
  "NL",
  "AU",
  "OTHER"
];
const volumeRanges = ["1-5", "5-20", "20-50", "50+"];
const businessTypes = [
  "manufacturer",
  "importer",
  "retailer",
  "processor",
  "other"
];
const productOptions = [
  "cacao",
  "cafe",
  "jengibre",
  "frutas"
];
const contactFormSchema = z.object({
  full_name: z.string().min(2).max(100),
  company: z.string().min(2).max(120),
  country: z.enum(countryCodes),
  email: z.email("Email inválido").max(120),
  phone: z.string().max(40).optional().or(z.literal("")),
  position: z.string().max(80).optional().or(z.literal("")),
  products: z.array(z.enum(productOptions)).optional().default([]),
  volume: z.enum(volumeRanges).optional().or(z.literal("")),
  business_type: z.enum(businessTypes).optional().or(z.literal("")),
  message: z.string().min(10).max(2e3),
  terms: z.literal(true, { message: "Debes aceptar los términos" }),
  // Honeypot anti-spam: debe llegar VACÍO. Si llega relleno → es un bot.
  // El campo se renderiza oculto vía CSS en ContactSection.astro (no type="hidden").
  company_website: z.string().max(0).or(z.literal("")).optional().default("")
});
z.object({
  labelKey: z.string(),
  value: z.string()
});

const WINDOW_MS = 6e4;
const HOUR_MS = 36e5;
const MAX_PER_MINUTE = 5;
const MAX_PER_HOUR = 20;
const store = /* @__PURE__ */ new Map();
const GC_INTERVAL_MS = 10 * 6e4;
let lastGc = Date.now();
function gc(now) {
  if (now - lastGc < GC_INTERVAL_MS) return;
  for (const [ip, hits] of store) {
    hits.minute = hits.minute.filter((t) => now - t < WINDOW_MS);
    hits.hour = hits.hour.filter((t) => now - t < HOUR_MS);
    if (hits.minute.length === 0 && hits.hour.length === 0) {
      store.delete(ip);
    }
  }
  lastGc = now;
}
function checkRateLimit(ip) {
  const now = Date.now();
  gc(now);
  const hits = store.get(ip) ?? { minute: [], hour: [] };
  hits.minute = hits.minute.filter((t) => now - t < WINDOW_MS);
  hits.hour = hits.hour.filter((t) => now - t < HOUR_MS);
  if (hits.minute.length >= MAX_PER_MINUTE || hits.hour.length >= MAX_PER_HOUR) {
    const oldestMinute = hits.minute[0] ?? now;
    const retryAfter = Math.ceil((WINDOW_MS - (now - oldestMinute)) / 1e3);
    return { allowed: false, retryAfter: Math.max(retryAfter, 1) };
  }
  hits.minute.push(now);
  hits.hour.push(now);
  store.set(ip, hits);
  return { allowed: true };
}
function getClientIP(request) {
  const headers = request.headers;
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}

const prerender = false;
function json(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders }
  });
}
const POST = async ({ request }) => {
  const ip = getClientIP(request);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return json(
      { success: false, message: "Demasiadas solicitudes. Intenta más tarde." },
      429,
      { "Retry-After": String(limit.retryAfter) }
    );
  }
  let raw;
  try {
    const formData = await request.formData();
    raw = Object.fromEntries(formData.entries());
    raw.products = formData.getAll("products");
  } catch {
    return json({ success: false, message: "Formato de solicitud inválido." }, 400);
  }
  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Datos inválidos.";
    return json({ success: false, message: firstError }, 422);
  }
  const data = parsed.data;
  if (data.company_website && data.company_website.length > 0) {
    return json({ success: true, message: "Gracias por tu mensaje." }, 200);
  }
  {
    console.error("[contact] Falta RESEND_API_KEY en el entorno.");
    return json({ success: false, message: "El servicio de email no está configurado." }, 500);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
