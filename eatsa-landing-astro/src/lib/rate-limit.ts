/**
 * Rate-limit simple EN MEMORIA por IP (sin Redis).
 *
 * Suficiente para volumen B2B bajo. Si el tráfico escala, migrar a Redis/Upstash.
 *
 * Uso:
 *   const { allowed, retryAfter } = checkRateLimit(ip);
 *   if (!allowed) return new Response(null, { status: 429 });
 */

const WINDOW_MS = 60_000; // 1 minuto
const HOUR_MS = 3_600_000; // 1 hora
const MAX_PER_MINUTE = 5;
const MAX_PER_HOUR = 20;

type Hits = { minute: number[]; hour: number[] };
const store = new Map<string, Hits>();

// Limpieza periódica del Map para evitar memory leak por IPs fantasma.
const GC_INTERVAL_MS = 10 * 60_000; // cada 10 min
let lastGc = Date.now();

function gc(now: number) {
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

export function checkRateLimit(ip: string): { allowed: true } | { allowed: false; retryAfter: number } {
  const now = Date.now();
  gc(now);

  const hits = store.get(ip) ?? { minute: [], hour: [] };

  // Filtra timestamps caducados
  hits.minute = hits.minute.filter((t) => now - t < WINDOW_MS);
  hits.hour = hits.hour.filter((t) => now - t < HOUR_MS);

  if (hits.minute.length >= MAX_PER_MINUTE || hits.hour.length >= MAX_PER_HOUR) {
    // Calcula cuántos segundos hasta poder reintentar (ventana por minuto)
    const oldestMinute = hits.minute[0] ?? now;
    const retryAfter = Math.ceil((WINDOW_MS - (now - oldestMinute)) / 1000);
    return { allowed: false, retryAfter: Math.max(retryAfter, 1) };
  }

  hits.minute.push(now);
  hits.hour.push(now);
  store.set(ip, hits);

  return { allowed: true };
}

/** Extrae la IP real del cliente, considerando proxies/reverse proxies. */
export function getClientIP(request: Request): string {
  const headers = request.headers;
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}
