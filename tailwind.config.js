module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Deep Forest Green
        primary: {
          DEFAULT: "#2D5016", // deep-forest-green
          50: "#F4F7F0", // light-forest-green
          100: "#E8F0DC", // lighter-forest-green
          200: "#D1E1B9", // pale-forest-green
          300: "#B9D296", // medium-forest-green
          400: "#A2C373", // forest-green-400
          500: "#8BB450", // forest-green-500
          600: "#6B8A3E", // forest-green-600
          700: "#4B602C", // forest-green-700
          800: "#2D5016", // deep-forest-green
          900: "#1E3610", // darkest-forest-green
        },
        
        // Secondary Colors - Rich Cacao Brown
        secondary: {
          DEFAULT: "#8B4513", // rich-cacao-brown
          50: "#F7F3F0", // light-cacao-brown
          100: "#EFE7E0", // lighter-cacao-brown
          200: "#DFCFC1", // pale-cacao-brown
          300: "#CFB7A2", // medium-cacao-brown
          400: "#BF9F83", // cacao-brown-400
          500: "#AF8764", // cacao-brown-500
          600: "#9F6F45", // cacao-brown-600
          700: "#8B4513", // rich-cacao-brown
          800: "#6B3410", // dark-cacao-brown
          900: "#4B230B", // darkest-cacao-brown
        },
        
        // Accent Colors - Premium Gold
        accent: {
          DEFAULT: "#DAA520", // premium-gold
          50: "#FEFCF7", // light-premium-gold
          100: "#FDF9EF", // lighter-premium-gold
          200: "#FBF3DF", // pale-premium-gold
          300: "#F9EDCF", // medium-premium-gold
          400: "#F7E7BF", // premium-gold-400
          500: "#F5E1AF", // premium-gold-500
          600: "#F3DB9F", // premium-gold-600
          700: "#F1D58F", // premium-gold-700
          800: "#DAA520", // premium-gold
          900: "#B8891B", // dark-premium-gold
        },
        
        // Background Colors
        background: "#FEFEFE", // clean-canvas
        surface: "#F8F6F0", // warm-neutral
        
        // Text Colors
        text: {
          primary: "#1A1A1A", // maximum-contrast
          secondary: "#4A4A4A", // supporting-text
        },
        
        // Status Colors
        success: {
          DEFAULT: "#228B22", // forest-green-success
          50: "#F0F8F0", // light-success
          100: "#E1F1E1", // lighter-success
          200: "#C3E3C3", // pale-success
          300: "#A5D5A5", // medium-success
          400: "#87C787", // success-400
          500: "#69B969", // success-500
          600: "#4BAB4B", // success-600
          700: "#2D9D2D", // success-700
          800: "#228B22", // forest-green-success
          900: "#1A6B1A", // dark-success
        },
        
        warning: {
          DEFAULT: "#FF8C00", // harvest-urgency
          50: "#FFF7F0", // light-warning
          100: "#FFEFDF", // lighter-warning
          200: "#FFDFBF", // pale-warning
          300: "#FFCF9F", // medium-warning
          400: "#FFBF7F", // warning-400
          500: "#FFAF5F", // warning-500
          600: "#FF9F3F", // warning-600
          700: "#FF8C00", // harvest-urgency
          800: "#E67A00", // dark-warning
          900: "#CC6800", // darkest-warning
        },
        
        error: {
          DEFAULT: "#DC143C", // form-validation
          50: "#FDF2F4", // light-error
          100: "#FBE5E9", // lighter-error
          200: "#F7CBD3", // pale-error
          300: "#F3B1BD", // medium-error
          400: "#EF97A7", // error-400
          500: "#EB7D91", // error-500
          600: "#E7637B", // error-600
          700: "#E34965", // error-700
          800: "#DC143C", // form-validation
          900: "#C31235", // dark-error
        },
        
        // Border Colors
        border: "#E5E5E5", // minimal-border
        "border-accent": "#DAA520", // premium-certification-border
      },
      
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'heading-xl': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-lg': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-md': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'cta': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],
      },
      
      boxShadow: {
        'cta': '0 4px 12px rgba(45, 80, 22, 0.15)',
        'cta-hover': '0 6px 16px rgba(45, 80, 22, 0.2)',
        'certification': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'certification-hover': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'accent': '0 4px 12px rgba(218, 165, 32, 0.15)',
        'accent-hover': '0 6px 16px rgba(218, 165, 32, 0.2)',
      },
      
      borderWidth: {
        '1': '1px',
        '2': '2px',
      },
      
      transitionDuration: {
        '250': '250ms',
      },
      
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      scale: {
        '102': '1.02',
      }
    },
  },
  plugins: [],
}