'use client'

import { useState, type FormEvent } from 'react'
import { contact } from '@/lib/content'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/* The message is POSTed and delivered by email. The visitor never leaves the
   page: no compose window, no mail client, no second step.

   FormSubmit takes the destination address in the URL rather than an API key,
   so there is nothing to configure and no account behind it. It will only ever
   deliver to the address in that URL, and the first submission triggers a
   one-time confirmation to the owner — that is how it stops anyone pointing a
   form at an address they do not own.

   If the request fails the form says so and offers the address directly,
   rather than pretending the message went anywhere. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Held before the first await: React nulls currentTarget once the handler
    // yields, so reaching for it afterwards throws.
    const formEl = e.currentTarget
    const form = new FormData(formEl)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()

    setStatus('sending')
    setError('')

    try {
      const response = await fetch(`${contact.formEndpoint}${contact.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          /* Reply-To first, and the plain `email` field kept alongside it —
             FormSubmit falls back to the first email-looking field when the
             explicit one is not picked up, so both are supplied. Hitting
             Reply should then reach the sender rather than your own inbox. */
          _replyto: email,
          email,
          /* The From address always belongs to the sending service — mail
             providers reject forged senders — so the visitor's name leads the
             subject instead. That is what shows in the inbox list. */
          _subject: `${name || 'Someone'} — portfolio enquiry`,
          name,
          message,
          _template: 'table',
          // Their captcha page would defeat the point of staying on the site.
          _captcha: 'false',
          // Honeypot: a real person never fills this in.
          _honey: String(form.get('_honey') ?? ''),
        }),
      })

      const result = await response.json()
      // Their AJAX endpoint answers with the string "true", not a boolean.
      if (!response.ok || String(result.success) !== 'true') {
        throw new Error(result.message || 'That did not go through.')
      }

      setStatus('sent')
      formEl.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const field =
    'mt-2 w-full border-b rule bg-transparent py-3 text-[0.9375rem] placeholder:text-chalk/25 focus:border-accent focus:outline-none disabled:opacity-50'

  if (status === 'sent') {
    return (
      <div aria-live="polite" className="py-6">
        <p className="display text-2xl text-accent">Sent.</p>
        <p className="mt-3 text-sm text-chalk/60">
          It is on its way to my inbox. I will get back to you, usually the same day.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="link-wipe mt-6 text-sm text-chalk/60"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" className="eyebrow">
        Your name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        required
        disabled={status === 'sending'}
        className={field}
      />

      <label htmlFor="email" className="eyebrow mt-8 block">
        Your email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        disabled={status === 'sending'}
        className={field}
      />

      <label htmlFor="message" className="eyebrow mt-8 block">
        What are you working on?
      </label>
      <textarea
        id="message"
        name="message"
        rows={3}
        required
        disabled={status === 'sending'}
        className={`${field} resize-y`}
      />

      {/* Hidden from people, irresistible to bots. */}
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-chalk hover:text-void disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send it'}
      </button>

      {status === 'error' && (
        <p aria-live="polite" className="mt-4 text-sm text-accent">
          {error} You can also write to{' '}
          <a href={`mailto:${contact.email}`} className="link-wipe">
            {contact.email}
          </a>
          .
        </p>
      )}
    </form>
  )
}
