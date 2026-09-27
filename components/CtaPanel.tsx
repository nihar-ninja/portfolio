import Link from 'next/link'
import DisplayHeading from '@/components/DisplayHeading'
import Reveal from '@/components/Reveal'
import { contact } from '@/lib/content'

/* The closing panel, reused at the bottom of most pages so every route ends
   somewhere useful rather than in the footer. */
export default function CtaPanel() {
  return (
    <section className="panel px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow">Talk</p>
        </Reveal>

        <DisplayHeading
          lines={contact.headline}
          className="mt-8 text-[clamp(2.75rem,10vw,8rem)]"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" delay={0.05}>
            <p className="max-w-prose text-chalk/60">{contact.blurb}</p>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <a
              href={`mailto:${contact.email}`}
              className="link-wipe text-[clamp(1.25rem,3vw,2rem)] text-accent"
            >
              {contact.email}
            </a>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-chalk px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-accent"
              >
                Start a project
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
