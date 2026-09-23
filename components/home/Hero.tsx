'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import ScrollCue from '@/components/ScrollCue'
import { home, site } from '@/lib/content'

/* The layered hero: the display word sits behind the portrait, the portrait
   sits in front of it, and the two move at different rates as you scroll.
   That parallax is the whole trick — without it the layers read as one flat
   image. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const wordY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-55%'])
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '14%'])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.08])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduceMotion ? 1 : 0])

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-[4.5rem]">
      {/* Accent glow behind the subject. Kept very low opacity — it should read
          as rim light, not as a gradient background. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[58%] h-[65vh] w-[65vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[130px]"
      />

      <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-7xl flex-col px-6 lg:px-10">
        {/* Layer 1 — the word. */}
        <motion.h1
          style={{ y: wordY, opacity: fade }}
          className="display pointer-events-none absolute inset-x-0 top-[13svh] z-0 text-center text-[clamp(4rem,19vw,17rem)] text-chalk/[0.13] sm:top-[10svh]"
        >
          <span className="sr-only">
            {site.name} — {site.role}
          </span>
          <span aria-hidden="true">{home.displayWord}</span>
        </motion.h1>

        {/* Layer 2 — the portrait, in front of the word. */}
        <motion.div
          style={{ y: photoY, scale: photoScale }}
          className="relative z-10 mt-auto flex justify-center"
        >
          {/* Sized by height rather than by aspect ratio: the artwork is a tall
              full-body figure, and it needs to stand far enough up the screen
              that its head and shoulders cross the display word behind it. */}
          <div className="relative h-[min(78svh,46rem)] w-[min(72vw,22rem)] origin-bottom">
            {/* Swap /public/photo-cutout.png to change this. It must be a
                transparent PNG — that transparency is what lets the word show
                through behind the figure. */}
            <Image
              src="/photo-cutout.png"
              alt={home.imageAlt}
              fill
              priority
              sizes="(max-width: 640px) 72vw, 352px"
              className="object-contain object-bottom"
            />
          </div>
        </motion.div>

        {/* Layer 3 — the flanking labels, pinned either side of the portrait. */}
        <motion.div
          style={{ opacity: fade }}
          className="pointer-events-none absolute inset-x-6 bottom-[34svh] z-20 flex items-center justify-between lg:inset-x-10"
        >
          {[home.flankLeft, home.flankRight].map((label, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, x: i === 0 ? -24 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              /* Both labels are pinned to the outer edges, so the shorter of
                 the two ends up sitting further from the figure. The left one
                 gets nudged inward to even the gaps up — once there is room
                 for it, which there is not on a phone. */
              className={`display text-[clamp(1.5rem,4.2vw,3.5rem)] ${
                i === 0 ? 'sm:ml-[6vw]' : ''
              }`}
            >
              {label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Fixed furniture along the bottom edge. */}
      <div className="pointer-events-none absolute inset-x-6 bottom-7 z-30 flex items-end justify-between lg:inset-x-10">
        <Link
          href="/work"
          className="pointer-events-auto group inline-flex items-center gap-3 rounded-full border border-chalk/20 py-2 pl-5 pr-2 text-sm transition-colors hover:border-accent"
        >
          See the work
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-void transition-transform duration-300 group-hover:translate-x-0.5">
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </Link>
        {/* Hidden on phones, where it would sit under the CTA. */}
        <div className="hidden sm:block">
          <ScrollCue />
        </div>
      </div>
    </section>
  )
}
