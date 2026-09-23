'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Stagger siblings by passing an increasing delay, in seconds. */
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article' | 'p' | 'span'
}

/* The workhorse entrance: a short rise and fade, once, as the element enters.
   Anything more elaborate belongs to the display type, not to body content. */
export default function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: reduceMotion ? 0.25 : 0.7,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
