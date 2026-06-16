/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--color-primary-base)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        },
        surface: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          card: 'var(--card-bg)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          gold: 'var(--text-gold)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          primary: 'var(--border-primary)',
          accent: 'var(--border-accent)',
        },
      },
      fontFamily: {
        amiri: ['Amiri', 'serif'],
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        scheherazade: ['Scheherazade New', 'serif'],
        aref: ['Aref Ruqaa', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 1.2s ease-out both',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-down': 'slideDown 0.8s ease-out both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%,100%': { textShadow: '0 0 20px rgba(230,187,81,0.4)' },
          '50%': { textShadow: '0 0 35px rgba(230,187,81,0.7)' },
        },
        slideDown: {
          from: { opacity: 0, transform: 'translateY(-20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'gold-sm': '0 0 25px rgba(230,187,81,0.25), 0 4px 20px rgba(0,0,0,0.4)',
        'gold-md': '0 0 40px rgba(230,187,81,0.3), 0 8px 30px rgba(0,0,0,0.5)',
        'gold-lg':
          '0 0 60px rgba(230,187,81,0.35), 0 15px 40px rgba(0,0,0,0.6)',
        card: 'var(--card-shadow)',
      },
    },
  },
  plugins: [],
};
