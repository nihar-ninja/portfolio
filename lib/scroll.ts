import type Lenis from 'lenis'

/* SmoothScroll registers its Lenis instance here so anything else on the page
   can move the scroll position. Going through window.scrollTo directly would
   be undone by Lenis on the next frame. */
let instance: Lenis | null = null

export function registerLenis(lenis: Lenis | null) {
  instance = lenis
}

export function scrollToTop(immediate = false) {
  if (instance) {
    instance.scrollTo(0, { immediate })
    return
  }
  /* No Lenis means one of two things: the visitor asked for reduced motion, or
     this ran in the gap before SmoothScroll mounted. The first case is the one
     that matters — animating a full-page jump is exactly what they opted out
     of — so the fallback checks rather than assuming. The footer's back-to-top
     calls this with no argument, which is how that path used to animate for
     the only people who had asked it not to. */
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.scrollTo({ top: 0, behavior: immediate || reduced ? 'auto' : 'smooth' })
}
