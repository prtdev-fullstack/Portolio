/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#08090C',
        surface: '#0F1115',
        'surface-hover': '#15171C',
        border: '#1F2228',
        text: '#F5F5F7',
        'text-muted': '#9B9FA8',
        accent: {
          DEFAULT: '#6E56CF',
          soft: 'rgba(110, 86, 207, 0.1)',
          border: 'rgba(110, 86, 207, 0.35)',
        },
      },
      fontFamily: {
        heading: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        '6xl': '72rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        marquee: 'marquee 30s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
    },
  },
  plugins: [],
};
