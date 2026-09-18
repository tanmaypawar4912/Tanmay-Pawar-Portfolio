/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 30px 80px rgba(3, 17, 58, 0.22)',
        glow: '0 0 80px rgba(47, 91, 255, 0.3)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        floatSlow: 'float 11s ease-in-out infinite',
        marquee: 'marquee 22s linear infinite',
        pulseSoft: 'pulseSoft 3.6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(0.95)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
      },
    },
  },
  plugins: [],
}
