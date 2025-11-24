import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: {
            50: '#FFE5E5',
            100: '#FFB8B8',
            200: '#FF8A8A',
            300: '#FF5C5C',
            400: '#FF4444',
            500: '#DD2222',
            600: '#CC1111',
            700: '#AA0000',
            800: '#880000',
            900: '#660000',
          },
          gold: {
            50: '#FFFEF0',
            100: '#FFFACD',
            200: '#FFF59D',
            300: '#FFEE58',
            400: '#FFD700',
            500: '#FFA500',
            600: '#FF8C00',
            700: '#FF7700',
            800: '#FF6600',
            900: '#FF5500',
          },
        },
        background: {
          dark: '#1a1a1a',
          darker: '#0a0a0a',
          card: '#2a2a2a',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-serif)', 'serif'],
        display: ['var(--font-noto-sans-jp)', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-1': ['7rem', { lineHeight: '1', fontWeight: '700' }],
        'display-2': ['5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display-3': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 68, 68, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 68, 68, 0.8)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config

