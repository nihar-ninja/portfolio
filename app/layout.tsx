import type { Metadata } from 'next'
import { Archivo_Black, Inter, Instrument_Serif } from 'next/font/google'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import PageTransition from '@/components/PageTransition'
import SmoothScroll from '@/components/SmoothScroll'
import { site } from '@/lib/content'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

/* Display face, only ever used large. Archivo Black rather than a condensed
   poster face: open counters and even proportions hold up at 17rem, where a
   tightly condensed face closes up and starts to look cheap. It is much wider
   per character, so the type scales below were brought down to suit. */
const display = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

// Serif italic, for the logotype and the occasional pull quote.
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    // Inner pages read "Work — Nihar Prabhakar", "About — Nihar Prabhakar".
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    type: 'website',
  },
}

export const viewport = {
  colorScheme: 'dark light' as const,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#050608' },
    { media: '(prefers-color-scheme: light)', color: '#f4f3f1' },
  ],
}

/* Runs before the first paint, so a visitor who prefers light never sees a
   black flash (or the reverse). An explicit choice wins; otherwise the
   system preference decides. Kept as a string because it has to be inline
   and synchronous — a module would load too late to help. */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var light = stored
      ? stored === 'light'
      : window.matchMedia('(prefers-color-scheme: light)').matches;
    if (light) document.documentElement.classList.add('light');
  } catch (e) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-5 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-void"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Nav />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
