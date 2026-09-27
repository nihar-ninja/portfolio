import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      /* These are roles, not fixed colours. The actual values live as CSS
         variables in app/globals.css and swap with the theme, so every
         existing `bg-void`, `text-chalk/60`, `ring-chalk/10` follows along
         with no `dark:` variants anywhere.

           void   the page itself
           panel  a surface raised above it
           chalk  foreground — text, rules, hairlines
           accent the one colour, used sparingly

         `<alpha-value>` is what keeps the `/60` opacity shorthands working. */
      colors: {
        void: 'rgb(var(--c-void) / <alpha-value>)',
        panel: 'rgb(var(--c-panel) / <alpha-value>)',
        chalk: 'rgb(var(--c-chalk) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          deep: 'rgb(var(--c-accent-deep) / <alpha-value>)',
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
  plugins: [
    /* `light:` for the rare case where a colour swap is not enough and the
       light theme needs a different rule outright. Most of the site never
       needs it — the CSS variables above do the work. */
    plugin(({ addVariant }) => {
      addVariant('light', ':root.light &')
    }),
  ],
}

export default config
