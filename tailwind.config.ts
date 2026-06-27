import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080B14',
        surface: '#0D1117',
        card: '#111827',
        border: '#1E2A3A',
        violet: '#7C3AED',
        cyan: '#06B6D4',
        glow: '#A855F7',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
