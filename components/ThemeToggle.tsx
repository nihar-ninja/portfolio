'use client'

import { useEffect, useState } from 'react'

/* The inline script in app/layout.tsx has already put the right class on
   <html> by the time this mounts, so all this does is read it back and let
   you flip it.

   Both icons are always in the DOM and CSS picks which one shows, so there is
   nothing to swap during hydration and no flicker on the first paint. */
export default function ThemeToggle() {
  const [light, setLight] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLight(document.documentElement.classList.contains('light'))
    setMounted(true)
  }, [])

  function toggle() {
    const next = !light
    setLight(next)
    document.documentElement.classList.toggle('light', next)
    try {
      // An explicit choice, so it outranks the system preference from now on.
      localStorage.setItem('theme', next ? 'light' : 'dark')
    } catch {
      // Private window, or storage blocked. The toggle still works for this
      // page view, it just will not be remembered.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      /* Until it has mounted we cannot know the state, so the label stays
         neutral rather than claiming the wrong one. */
      aria-label={mounted ? (light ? 'Switch to dark theme' : 'Switch to light theme') : 'Switch theme'}
      aria-pressed={mounted ? light : undefined}
      className="grid h-9 w-9 place-items-center rounded-full text-chalk/55 transition-colors hover:text-chalk"
    >
      {/* Sun — shown while dark is active, i.e. the thing you switch TO. */}
      <svg
        viewBox="0 0 20 20"
        className="h-[18px] w-[18px] light:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="3.6" />
        <path d="M10 2v1.8M10 16.2V18M18 10h-1.8M3.8 10H2M15.7 4.3l-1.3 1.3M5.6 14.4l-1.3 1.3M15.7 15.7l-1.3-1.3M5.6 5.6L4.3 4.3" />
      </svg>
      {/* Moon — shown while light is active. */}
      <svg
        viewBox="0 0 20 20"
        className="hidden h-[18px] w-[18px] light:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16.5 12.4A7 7 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9Z" />
      </svg>
    </button>
  )
}
