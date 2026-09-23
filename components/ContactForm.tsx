'use client'

import { useState, type FormEvent } from 'react'
import { contact } from '@/lib/content'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/* Webmail compose windows, pre-addressed and pre-filled. These are used in
   place of a `mailto:` link, which hands off to whatever desktop client the
   machine has registered — usually an Outlook nobody has ever signed into.
   Gmail is first because it is the default we open on submit. */
const mailProviders = [
  {
    label: 'Gmail',
    compose: (to: string, subject: string, body: string) =>
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        to,
      )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  },
  {
    label: 'Outlook',
    compose: (to: string, subject: string, body: string) =>
      `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
        to,
      )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  },
  {
    label: 'Yahoo',
    compose: (to: string, subject: string, body: string) =>
      `https://compose.mail.yahoo.com/?to=${encodeURIComponent(
        to,
      )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  },
]

const gmailComposeUrl = mailProviders[0].compose

/* Two modes, decided by whether contact.formAccessKey is filled in.

   With a key: the message is POSTed to Web3Forms, which emails it to the
   address the key was issued for. Nothing to deploy, no server, and the
   visitor never leaves the page.

   Without one: nothing can be delivered from the page itself, so the message
   is handed to the visitor's own mail instead. Submitting opens Gmail compose
   in a new tab, and the panel offers Outlook and Yahoo, a desktop mail app, a
   copy button and the address in plain text. It never fires a bare `mailto:`
   on its own — that hands off to whatever client the machine has registered,
   which on Windows is an Outlook most people have never signed into. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [fallback, setFallback] = useState<{ subject: string; body: string } | null>(null)
  const [popupBlocked, setPopupBlocked] = useState(false)
  const [copied, setCopied] = useState(false)

  const hasEndpoint = contact.formAccessKey.trim().length > 0

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Held onto before the first await: React nulls out currentTarget as soon
    // as the handler yields, so reaching for it later throws.
    const formEl = e.currentTarget
    const form = new FormData(formEl)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()
    const subject = `Portfolio enquiry — ${name || 'website'}`

    if (!hasEndpoint) {
      // The sender's address goes in the body too: whichever route they end up
      // using, it may not be the account the address field belongs to.
      const body = `${message}\n\n— ${name}\n${email}`
      setFallback({ subject, body })
      setCopied(false)
      /* Opened synchronously, still inside the submit gesture, so the popup
         blocker lets it through. If it is blocked anyway, `open` returns null
         and the panel below carries the same link to click manually. */
      const opened = window.open(
        gmailComposeUrl(contact.email, subject, body),
        '_blank',
        'noopener,noreferrer',
      )
      setPopupBlocked(!opened)
      return
    }

    setStatus('sending')
    setError('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contact.formAccessKey,
          subject,
          from_name: name,
          // Lets you hit reply in Gmail and have it go to them.
          replyto: email,
          name,
          email,
          message,
          // Honeypot: a real person never fills this in.
          botcheck: form.get('botcheck') ?? '',
        }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'That did not go through.')
      }

      setStatus('sent')
      formEl.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  async function copyMessage() {
    if (!fallback) return
    try {
      await navigator.clipboard.writeText(`${fallback.subject}\n\n${fallback.body}`)
      setCopied(true)
    } catch {
      // Clipboard blocked. The text is still on screen in the form.
      setCopied(false)
    }
  }

  const gmailHref = fallback
    ? gmailComposeUrl(contact.email, fallback.subject, fallback.body)
    : '#'

  const field =
    'mt-2 w-full border-b rule bg-transparent py-3 text-[0.9375rem] placeholder:text-chalk/25 focus:border-accent focus:outline-none disabled:opacity-50'

  if (status === 'sent') {
    return (
      <div aria-live="polite" className="py-6">
        <p className="display text-2xl text-accent">Sent.</p>
        <p className="mt-3 text-sm text-chalk/60">
          It is in my inbox. I will get back to you, usually the same day.
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

      {/* Spam trap — hidden from people, irresistible to bots. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-chalk disabled:opacity-60"
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

      {fallback && (
        <div
          aria-live="polite"
          className="mt-8 rounded-xl bg-void/60 p-5 ring-1 ring-inset ring-chalk/10"
        >
          <p className="text-sm text-chalk/70">
            {popupBlocked
              ? 'Your browser blocked the new tab — open your mail from here instead.'
              : 'Gmail is open in a new tab with the message ready. Use something else?'}
          </p>

          <ul className="mt-4 flex flex-wrap items-center gap-2">
            {mailProviders.map((provider) => (
              <li key={provider.label}>
                <a
                  href={provider.compose(contact.email, fallback.subject, fallback.body)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-chalk/20 px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  {provider.label}
                  <span aria-hidden="true" className="text-xs">
                    ↗
                  </span>
                </a>
              </li>
            ))}
            <li>
              {/* For anyone who does have a desktop client set up. */}
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent(
                  fallback.subject,
                )}&body=${encodeURIComponent(fallback.body)}`}
                className="inline-flex items-center rounded-full border border-chalk/20 px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                Mail app
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={copyMessage}
                className="inline-flex items-center rounded-full border border-chalk/20 px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </li>
          </ul>

          <p className="mt-4 text-sm text-chalk/45">
            Or write to{' '}
            <a href={`mailto:${contact.email}`} className="link-wipe text-chalk/70">
              {contact.email}
            </a>
          </p>
        </div>
      )}
    </form>
  )
}
