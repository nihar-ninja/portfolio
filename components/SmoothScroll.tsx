'use client'

import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { registerLenis, scrollToTop } from '@/lib/scroll'

/* Lenis is what makes the scrubbed sections feel continuous instead of steppy.
   It is skipped entirely when the visitor asks for reduced motion — native
   scrolling is the right answer there, not a slower version of this one. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      touchMultiplier: 1.6,
    })
    registerLenis(lenis)

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      registerLenis(null)
    }
  }, [])

  // Every route should start at the top, immediately, with no easing.
  useEffect(() => {
    scrollToTop(true)
  }, [pathname])

  return <>{children}</>
}
