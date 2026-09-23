'use client'

import { useState, type FormEvent } from 'react'
import { contact } from '@/lib/content'

/* No backend. On submit this composes a mailto: link and hands it to the
   visitor's mail client, so the site stays a static deploy. To POST to
   Formspree, Resend or a route handler instead, replace the body of
   handleSubmit — the markup below can stay exactly as it is. */
export default function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') ?? '')
    const message = String(form.get('message') ?? '')

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      `Project enquiry — ${name || 'website'}`,
    )}&body=${encodeURIComponent(`${message}\n\n— ${name}`)}`
    setSent(true)
  }

  const field =
    'mt-2 w-full border-b rule bg-transparent py-3 text-[0.9375rem] placeholder:text-chalk/25 focus:border-accent focus:outline-none'

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" className="eyebrow">
        Your name
      </label>
      <input id="name" name="name" type="text" required className={field} />

      <label htmlFor="email" className="eyebrow mt-8 block">
        Your email
      </label>
      <input id="email" name="email" type="email" required className={field} />

      <label htmlFor="message" className="eyebrow mt-8 block">
        What are you working on?
      </label>
      <textarea id="message" name="message" rows={3} required className={`${field} resize-y`} />

      <button
        type="submit"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-chalk"
      >
        Send it
      </button>

      <p aria-live="polite" className="mt-4 h-5 text-[0.8125rem] text-chalk/40">
        {sent ? 'Opening your mail app…' : ''}
      </p>
    </form>
  )
}
