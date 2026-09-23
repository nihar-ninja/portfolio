'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

/* Route changes get a short wipe: the outgoing page fades under a panel that
   sweeps up, the incoming one lifts into place. Keyed on the pathname, so
   `mode="wait"` guarantees the two never overlap. */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <>{children}</>

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
        {/* The sweep itself. It only ever covers the page on the way out. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] bg-void"
          initial={{ scaleY: 1, originY: 0 }}
          animate={{ scaleY: 0, originY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
