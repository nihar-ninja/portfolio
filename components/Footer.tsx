'use client'

import Link from 'next/link'
import { contact, nav, site } from '@/lib/content'
import { scrollToTop } from '@/lib/scroll'

export default function Footer() {
  return (
    <footer className="relative z-10 bg-void px-6 pb-10 pt-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 border-t rule pt-10 sm:flex-row sm:justify-between">
          <div>
            <Link href="/" className="font-serif text-3xl italic leading-none">
              {site.logotype}
            </Link>
            <p className="mt-4 max-w-xs text-sm text-chalk/45">
              {site.name} — {site.role}, {site.location}.
            </p>
          </div>

          <div className="flex gap-14">
            <nav aria-label="Footer">
              <p className="eyebrow">Pages</p>
              <ul className="mt-4 space-y-2 text-sm">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-chalk/60 transition-colors hover:text-chalk">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="eyebrow">Elsewhere</p>
              <ul className="mt-4 space-y-2 text-sm">
                {contact.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-chalk/60 transition-colors hover:text-chalk"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-4 text-xs text-chalk/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <button
            type="button"
            onClick={() => scrollToTop()}
            className="self-start text-chalk/45 transition-colors hover:text-chalk sm:self-auto"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
