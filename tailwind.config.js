/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240, 80%, 50%)',
        accent: 'hsl(160, 70%, 45%)',
        bg: 'hsl(220, 15%, 95%)',
        surface: 'hsl(0, 0%, 100%)',
        text: 'hsl(220, 15%, 15%)',
        muted: 'hsl(220, 15%, 60%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220, 15%, 10%, 0.1)',
        'modal': '0 16px 48px hsla(220, 15%, 10%, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.45, 0, 0.15, 1)',
        'slide-up': 'slideUp 400ms cubic-bezier(0.45, 0, 0.15, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}