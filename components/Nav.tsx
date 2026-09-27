'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { nav, site } from '@/lib/content'
import MusicToggle from './MusicToggle'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the sheet on route change and on Escape.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={`pointer-events-auto transition-colors duration-500 ${
          scrolled ? 'bg-void/70 backdrop-blur-xl' : ''
        }`}
      >
        {/* Wider than the 7xl the page content uses, so the bar sits closer to
            the edges of a big screen instead of stranded in the middle. Enough
            padding is kept that nothing ever touches the edge. */}
        <div className="mx-auto flex h-[4.5rem] max-w-[104rem] items-center justify-between px-6 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="font-serif text-2xl italic leading-none"
            aria-label={`${site.name} — home`}
          >
            {site.logotype}
          </Link>

          {/* One row for everything on the right. The controls render exactly
              once each and are simply shown or hidden per breakpoint — the
              music button in particular owns an <audio> element, and a second
              copy would give two tracks playing over each other. */}
          <div className="flex items-center gap-1">
            <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive(item.href) ? 'text-chalk' : 'text-chalk/50 hover:text-chalk'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <span className="mx-1 hidden h-4 w-px bg-chalk/15 md:block" aria-hidden="true" />

            {/* Both toggles stay outside the mobile sheet, so they work
                without opening the menu first. */}
            <ThemeToggle />
            <MusicToggle />

            <Link
              href="/contact"
              className="ml-2 hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-void transition-colors hover:bg-chalk hover:text-void md:inline-block"
            >
              Hire me
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative z-10 grid h-10 w-10 place-items-center md:hidden"
            >
              <span className="relative block h-[11px] w-6" aria-hidden="true">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                    open ? 'top-[5px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                    open ? 'top-[5px] -rotate-45' : 'top-[11px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-bleed mobile sheet: the links are set at display size, which is
          the same type the pages are built from. */}
      <div
        id="mobile-nav"
        className={`pointer-events-auto fixed inset-0 -z-10 bg-void transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav aria-label="Primary" className="flex h-full flex-col justify-center px-6">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? undefined : -1}
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : '0ms' }}
              className={`display border-b rule py-5 text-[15vw] transition-all duration-500 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              } ${isActive(item.href) ? 'text-accent' : 'text-chalk'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
