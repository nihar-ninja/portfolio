'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ElementType } from 'react'

type DisplayHeadingProps = {
  /** One entry per line. Lines are masked and rise independently. */
  lines: string[]
  as?: ElementType
  className?: string
  delay?: number
}

/* The signature move: each line sits inside an overflow-hidden box and slides
   up from below it, so the type appears to be revealed rather than faded in.
   Every line is still a single readable string for screen readers. */
export default function DisplayHeading({
  lines,
  as: Tag = 'h2',
  className = '',
  delay = 0,
}: DisplayHeadingProps) {
  const reduceMotion = useReducedMotion()

  return (
    <Tag className={`display ${className}`}>
      {lines.map((line, i) => (
        <span key={line + i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={reduceMotion ? { opacity: 0 } : { y: '105%' }}
            whileInView={reduceMotion ? { opacity: 1 } : { y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: reduceMotion ? 0.25 : 0.9,
              delay: reduceMotion ? 0 : delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
