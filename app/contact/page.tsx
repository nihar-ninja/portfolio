import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import DisplayHeading from '@/components/DisplayHeading'
import Reveal from '@/components/Reveal'
import { contact, site } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact',
  description: contact.blurb,
}

export default function ContactPage() {
  return (
    <section className="px-6 pb-24 pt-40 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow">Contact</p>
        </Reveal>

        <DisplayHeading
          as="h1"
          lines={contact.headline}
          className="mt-6 text-[clamp(2.75rem,11vw,9rem)]"
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-prose text-lg text-chalk/60">{contact.blurb}</p>
            </Reveal>

            <Reveal delay={0.06}>
              <a
                href={`mailto:${contact.email}`}
                className="link-wipe mt-10 inline-block text-[clamp(1.25rem,3vw,2rem)] text-accent"
              >
                {contact.email}
              </a>
            </Reveal>

            <Reveal delay={0.12}>
              <ul className="mt-12 border-t rule">
                {contact.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-baseline justify-between gap-4 border-b rule py-4"
                    >
                      <span className="display text-xl transition-colors group-hover:text-accent">
                        {social.label}
                      </span>
                      <span className="text-sm text-chalk/40">{social.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-10 text-sm text-chalk/40">
                Based in {site.location}. {/* PLACEHOLDER: drop your CV at /public/resume.pdf. */}
                <a href={contact.resumeHref} className="link-wipe ml-1 text-chalk/60">
                  Résumé (PDF)
                </a>
              </p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <div className="rounded-2xl bg-panel p-8 ring-1 ring-inset ring-chalk/[0.07] sm:p-10">
              {/* The form behaves differently depending on whether a form key
                  is set in lib/content.ts, so the label has to say which. */}
              <p className="mb-8 text-sm text-chalk/45">
                {contact.formAccessKey
                  ? 'Or use this — it goes straight to my inbox, and I usually reply the same day.'
                  : 'Or use this — it opens the message in your mail, ready to send. Gmail by default, with other options once you submit.'}
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
