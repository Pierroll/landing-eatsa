import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { contactFormSchema, type ContactForm } from '@lib/schemas';
import { checkRateLimit, getClientIP } from '@lib/rate-limit';

// output: 'hybrid' prerenderiza todo por defecto; esta ruta debe correr en servidor.
export const prerender = false;

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const RESEND_FROM = import.meta.env.RESEND_FROM ?? 'onboarding@resend.dev';
const RESEND_TO = import.meta.env.RESEND_TO ?? 'comercial@amazonicatropical.com';

type ResponseBody = { success: boolean; message: string };

function json(body: ResponseBody, status: number, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

export const POST: APIRoute = async ({ request }) => {
  // ─── 1. Rate-limit por IP ───
  const ip = getClientIP(request);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return json(
      { success: false, message: 'Demasiadas solicitudes. Intenta más tarde.' },
      429,
      { 'Retry-After': String(limit.retryAfter) },
    );
  }

  // ─── 2. Parse + validación Zod (mismo schema que Content Collections) ───
  let raw: Record<string, unknown>;
  try {
    const formData = await request.formData();
    raw = Object.fromEntries(formData.entries()) as Record<string, unknown>;
    // products[] llega como múltiples entradas con mismo key → reagrupar
    raw.products = formData.getAll('products');
  } catch {
    return json({ success: false, message: 'Formato de solicitud inválido.' }, 400);
  }

  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Datos inválidos.';
    return json({ success: false, message: firstError }, 422);
  }
  const data: ContactForm = parsed.data;

  // ─── 3. Honeypot: si viene relleno → es bot. Respondemos 200 para no delatarnos. ───
  if (data.company_website && data.company_website.length > 0) {
    return json({ success: true, message: 'Gracias por tu mensaje.' }, 200);
  }

  // ─── 4. Envío de email vía Resend (API key SOLO en servidor) ───
  if (!RESEND_API_KEY) {
    console.error('[contact] Falta RESEND_API_KEY en el entorno.');
    return json({ success: false, message: 'El servicio de email no está configurado.' }, 500);
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: RESEND_TO,
      replyTo: data.email,
      subject: `Solicitud B2B — ${data.company} (${data.country})`,
      html: buildEmailHtml(data),
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return json({ success: false, message: 'No se pudo enviar el mensaje.' }, 502);
    }

    return json({ success: true, message: 'Gracias por tu solicitud. Te responderemos en 48h.' }, 200);
  } catch (err) {
    console.error('[contact] Excepción enviando email:', err);
    return json({ success: false, message: 'Error inesperado al enviar.' }, 500);
  }
};

/** Construye el HTML del email a partir de los datos validados. */
function buildEmailHtml(d: ContactForm): string {
  const rows = [
    ['Nombre', d.full_name],
    ['Empresa', d.company],
    ['País', d.country],
    ['Email', d.email],
    ['Teléfono', d.phone || '—'],
    ['Cargo', d.position || '—'],
    ['Productos', d.products.length ? d.products.join(', ') : '—'],
    ['Volumen', d.volume || '—'],
    ['Tipo de negocio', d.business_type || '—'],
    ['Mensaje', d.message],
  ];

  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #E8E1D3;font-weight:600;color:#3A2A1E;">${k}</td><td style="padding:8px 12px;border:1px solid #E8E1D3;color:#3A2A1E;">${v}</td></tr>`,
    )
    .join('');

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto;background:#F7F1E5;padding:24px;">
      <h1 style="color:#2D5B3E;font-family:Fraunces,serif;margin:0 0 16px;">Nueva solicitud B2B</h1>
      <table style="border-collapse:collapse;width:100%;background:#fff;border-radius:8px;overflow:hidden;">${rowsHtml}</table>
      <p style="color:#9A8E7A;font-size:12px;margin-top:16px;">Este mensaje fue enviado desde el formulario de contacto de amazonicatropical.com (IP registrada para control de abuso).</p>
    </div>
  `;
}
