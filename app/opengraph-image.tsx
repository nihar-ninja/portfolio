import { ImageResponse } from 'next/og'
import { site } from '@/lib/content'

/* The card that shows when the site is linked anywhere — a message, a DM, a
   post. Without this file the link renders as bare text, which for a portfolio
   is the one place a first impression is free.

   Built at build time rather than shipped as a flat PNG, so the name, role and
   location follow lib/content.ts and never drift from the site itself.

   Anton is fetched so the card is set in the same display face as the site. It
   is wrapped in a try/catch on purpose: if fonts.googleapis.com is unreachable
   during a deploy the card falls back to the default face rather than failing
   the build. A plain social card beats a broken deploy.

   Note: `satori` cannot read woff2, so the stylesheet is requested without a
   browser User-Agent — Google then answers with a TrueType URL. */

export const alt = `${site.name} — ${site.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadAnton(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch('https://fonts.googleapis.com/css2?family=Anton&display=swap').then(
      (res) => res.text(),
    )
    const url = css.match(/src:\s*url\((https:\/\/[^)]+)\)/)?.[1]
    if (!url) return null
    return await fetch(url).then((res) => res.arrayBuffer())
  } catch {
    return null
  }
}

export default async function OpengraphImage() {
  const anton = await loadAnton()
  // Falls through to satori's bundled face when the fetch did not land.
  const display = anton ? 'Anton' : undefined

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#050608',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* The same warm bloom the hero carries, flattened to a soft radial. */}
        <div
          style={{
            position: 'absolute',
            top: '38%',
            left: '50%',
            width: 760,
            height: 760,
            transform: 'translate(-50%, -50%)',
            borderRadius: 999,
            background:
              'radial-gradient(circle, rgba(226,104,58,0.30) 0%, rgba(226,104,58,0.08) 45%, rgba(226,104,58,0) 70%)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              fontSize: 34,
              fontStyle: 'italic',
              color: '#f2f1ef',
              fontFamily: 'Georgia, serif',
            }}
          >
            {site.logotype}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 132,
              lineHeight: 0.92,
              fontFamily: display,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: '#f2f1ef',
              textTransform: 'uppercase',
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 38,
              fontWeight: 500,
              color: '#e2683a',
            }}
          >
            {site.role}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 26,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(242,241,239,0.45)',
          }}
        >
          <span>{site.location}</span>
          <span>{site.url.replace(/^https?:\/\//, '')}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: anton
        ? [{ name: 'Anton', data: anton, weight: 400 as const, style: 'normal' as const }]
        : undefined,
    },
  )
}
