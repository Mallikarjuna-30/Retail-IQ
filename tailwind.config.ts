import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9FAFB',
        surface: {
          DEFAULT: '#FFFFFF',
          border: '#E5E7EB',
          muted: '#F3F4F6',
        },
        primary: {
          DEFAULT: '#16A34A',
          hover: '#15803D',
          tint: '#F0FDF4',
          foreground: '#FFFFFF',
        },
        status: {
          healthy: {
            text: '#16A34A',
            bg: '#DCFCE7',
            border: '#BBF7D0',
          },
          warning: {
            text: '#D97706',
            bg: '#FEF3C7',
            border: '#FDE68A',
          },
          danger: {
            text: '#DC2626',
            bg: '#FEE2E2',
            border: '#FECACA',
          },
          info: {
            text: '#2563EB',
            bg: '#DBEAFE',
            border: '#BFDBFE',
          },
          slow: {
            text: '#9333EA',
            bg: '#F3E8FF',
            border: '#E9D5FF',
          },
        },
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-devanagari)', 'var(--font-kannada)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

