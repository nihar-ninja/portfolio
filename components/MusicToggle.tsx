'use client'

import { useEffect, useRef, useState } from 'react'
import { music } from '@/lib/content'

/* Background music, off by default.

   It deliberately never autoplays on a first visit: browsers block audio until
   the visitor has interacted with the page, and a portfolio that starts
   playing music at you unasked is worse than one that offers it. Pressing the
   button starts it; the choice is remembered, and on a later visit it tries to
   resume — if the browser refuses, the button simply shows as paused rather
   than pretending otherwise.

   The <audio> element lives here, inside the nav, which sits in the root
   layout. Route changes swap the page below it, so playback carries across
   navigation without a gap. */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = music.volume

    let cancelled = false
    try {
      if (localStorage.getItem('music') === 'on') {
        // May be refused until the visitor interacts with the page. That is a
        // normal outcome, not an error, so it stays quiet.
        audio.play().then(
          () => !cancelled && setPlaying(true),
          () => undefined,
        )
      }
    } catch {
      // Storage blocked — music just stays off.
    }

    return () => {
      cancelled = true
    }
  }, [])

  /* Only one tab should ever be playing. Without this, opening the site in a
     second tab gives two tracks over each other, and pressing pause in one
     leaves the other still going — which looks exactly like a broken pause
     button. The `storage` event fires in every OTHER tab, so whichever tab
     the visitor last touched wins and the rest fall silent. */
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== 'music-sync') return
      audioRef.current?.pause()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // Keeps the button honest if playback stops for any other reason.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [])

  async function toggle() {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      remember('off')
      return
    }

    try {
      await audio.play()
      remember('on')
    } catch {
      // Refused, or the file failed to load. Leave the button as it was.
      setPlaying(false)
    }
  }

  function remember(value: 'on' | 'off') {
    try {
      localStorage.setItem('music', value)
      /* A value that always changes. `storage` only fires when the stored
         value actually differs, so two tabs both pressing play would write
         'on' over 'on' and never hear about each other. */
      localStorage.setItem('music-sync', String(Date.now()))
    } catch {
      // Private window. Works for this page view, just is not remembered.
    }
  }

  return (
    <>
      {/* `preload="none"` matters: 2MB should not be downloaded by everyone
          who visits, only by the people who ask for it. */}
      <audio ref={audioRef} src={music.src} loop preload="none" />

      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Pause ${music.title}` : `Play ${music.title}`}
        title={playing ? `Pause ${music.title}` : `Play ${music.title}`}
        className="grid h-9 w-9 place-items-center rounded-full text-chalk/55 transition-colors hover:text-chalk"
      >
        {/* A speaker, crossed out when off. An abstract level meter read as
            three dots when paused — nobody recognised it as a sound control.
            The crossed-out speaker is the one icon everyone already knows. */}
        <svg
          viewBox="0 0 20 20"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2.5 7.5h3L9.5 4v12L5.5 12.5h-3z" />
          {playing ? (
            <>
              <path d="M12.4 7.4a3.6 3.6 0 0 1 0 5.2" />
              <path d="M14.8 5.2a7 7 0 0 1 0 9.6" />
            </>
          ) : (
            <path d="M12.6 8l4 4M16.6 8l-4 4" />
          )}
        </svg>
      </button>
    </>
  )
}
