import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Near-black canvas. `panel` is a hair lighter so stacked sections
        // separate from the page behind them without needing a border.
        void: '#050608',
        panel: '#0b0d11',
        chalk: '#f2f1ef',
        /* The single accent. Swap this one value to re-colour the whole site —
           e.g. '#3b5bfd' for electric blue. */
        accent: {
          DEFAULT: '#3b5bfd',
          deep: '#b2542f',
        },
      },
      fontFamily: {
        // Heavy condensed face — used only at display sizes, never for reading.
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Serif italic, used for the logotype and the odd pull quote.
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
      },
      maxWidth: {
        prose: '58ch',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'cue-line': {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '45%': { transform: 'scaleX(1)', transformOrigin: 'left' },
          '55%': { transform: 'scaleX(1)', transformOrigin: 'right' },
          '100%': { transform: 'scaleX(0)', transformOrigin: 'right' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'cue-line': 'cue-line 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
