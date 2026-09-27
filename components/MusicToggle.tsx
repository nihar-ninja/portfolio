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
        {/* Four bars that bounce while it plays and sit flat when it does not,
            so the state is readable without relying on colour alone. */}
        <span className="flex h-[15px] items-end gap-[3px]" aria-hidden="true">
          {[0, 1, 2, 3].map((bar) => (
            <span
              key={bar}
              className={`w-[2px] rounded-sm bg-current transition-[height] duration-300 ${
                playing ? 'animate-eq' : 'h-[3px]'
              }`}
              style={
                playing
                  ? { animationDelay: `${bar * 0.15}s`, animationDuration: `${0.9 + bar * 0.1}s` }
                  : undefined
              }
            />
          ))}
        </span>
      </button>
    </>
  )
}
