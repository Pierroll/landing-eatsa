/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // ─── Paleta EATSA — Web Empresarial (Cacao Premium) ───
        // Roles estrictos según design system. Ver REGLA en cada color.

        crema: '#F7F1E5', // Fondo global de TODA la web. No usar blanco excepto en tarjetas/testimonios.

        // Verde Bosque → único color de acción/autoridad (CTA + H1/H2 + links hover)
        verde: {
          DEFAULT: '#2D5B3E',
          dark: '#1F4530', // estado hover de botones primarios
        },

        ebano: '#3A2A1E', // Marrón Ébano → párrafos y texto de lectura (descansa más que negro puro sobre crema)

        dorado: '#B8924A', // Dorado Antiguo → EXCLUSIVO precios/ofertas. NUNCA decorativo.
        cacao: '#6B4226', // Marrón Cacao → enlaces dentro del texto (siempre subrayados)
        azul: '#5C7A8A', // Azul Apagado → fondo sección certificaciones/garantías (única superficie fría)

        // Neutros cálidos (los grises fríos rompen la calidez del sistema)
        gris: {
          claro: '#E8E1D3', // bordes y divisores sutiles sobre crema
          medio: '#7A6F5D', // texto placeholder, metadatos, fechas (Oscurecido para contraste WCAG AA)
        },

        // Semánticos (mantienen coherencia cálida incluso en error)
        error: '#A23B3B', // rojo terroso
        success: '#2D5B3E', // reutiliza Verde Bosque (no introducir verde nuevo)
        warning: '#B8924A', // reutiliza dorado atenuado
      },

      fontFamily: {
        display: ['Manrope Variable', 'sans-serif'], // Títulos H1/H2/H3 display + precios
        body: ['DM Sans Variable', 'sans-serif'], // Texto de lectura, UI, botones
        mono: ['JetBrains Mono Variable', 'monospace'], // Énfasis y código
        sans: ['Manrope Variable', 'sans-serif'], // Texto general
      },

      borderRadius: {
        btn: '8px', // botones primarios: NUNCA usar rounded-full (pill)
      },

      boxShadow: {
        // Sombras CÁLIDAS (rgba basado en ebano, no gris frío)
        card: '0px 2px 8px rgba(58, 42, 30, 0.08)',
        elevated: '0px 4px 16px rgba(58, 42, 30, 0.06)',
      },

      fontSize: {
        // Escala editorial del design system
        hero: ['52px', { lineHeight: '60px', fontWeight: '600' }],
        'heading-xl': ['36px', { lineHeight: '44px', fontWeight: '600' }],
        'heading-md': ['24px', { lineHeight: '32px', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '28px' }],
        caption: ['13px', { lineHeight: '20px' }],
        price: ['28px', { lineHeight: '34px', fontWeight: '600' }],
      },

      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },

      animation: {
        'fade-in': 'fade-in 0.6s var(--ease-out-quint) forwards',
        'slide-up': 'slide-up 0.6s var(--ease-out-quint) forwards',
        'fade-in-up': 'fade-in-up 0.6s var(--ease-out-quint) forwards',
        'fade-in-down': 'fade-in-down 0.6s var(--ease-out-quint) forwards',
        'fade-in-left': 'fade-in-left 0.6s var(--ease-out-quint) forwards',
        'fade-in-right': 'fade-in-right 0.6s var(--ease-out-quint) forwards',
        'scale-in': 'scale-in 0.6s var(--ease-out-quint) forwards',
      },
    },
  },
  plugins: [],
};
