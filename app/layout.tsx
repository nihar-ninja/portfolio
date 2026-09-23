import type { Metadata } from 'next'
import { Anton, Inter, Instrument_Serif } from 'next/font/google'
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

// Heavy condensed display face. Only ever used large.
const display = Anton({
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
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    type: 'website',
  },
}

// The site is dark by design, not by preference — this tells the browser so
// form controls and scrollbars match.
export const viewport = { colorScheme: 'dark' as const, themeColor: '#050608' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${serif.variable}`}>
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
