'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { home, site } from '@/lib/content'

/* The statement reads in as you scroll: each word brightens in turn, driven by
   scroll position rather than a timer, so it tracks exactly how fast you move.
   Reduced motion gets the finished sentence, fully lit. */
export default function Statement() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.55'],
  })

  const words = home.statement.split(' ')

  return (
    <section className="panel px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">
          {site.role} — {site.location}
        </p>

        <div ref={ref} className="mt-10">
          <p className="max-w-5xl text-[clamp(1.35rem,3.4vw,2.6rem)] font-light leading-[1.25] tracking-[-0.01em]">
            {words.map((word, i) => (
              <Word
                key={`${word}-${i}`}
                progress={scrollYProgress}
                range={[i / words.length, (i + 1.5) / words.length]}
                reduceMotion={reduceMotion}
              >
                {word}
              </Word>
            ))}
          </p>
        </div>

        <Link href="/about" className="link-wipe mt-12 inline-block text-sm text-accent">
          More about how I work
        </Link>
      </div>
    </section>
  )
}

function Word({
  children,
  progress,
  range,
  reduceMotion,
}: {
  children: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
  reduceMotion: boolean | null
}) {
  const opacity = useTransform(progress, range, [0.18, 1])

  return (
    <span className="inline-block">
      <motion.span style={reduceMotion ? undefined : { opacity }}>{children}</motion.span>
      {' '}
    </span>
  )
}
