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
  window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}
