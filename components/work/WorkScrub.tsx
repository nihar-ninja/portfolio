'use client'

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import type { Project } from '@/lib/content'

/* The pinned showcase. The outer element is one viewport tall per project, the
   inner one sticks — so the page keeps scrolling normally while the content
   inside swaps. Nothing is hijacked: scroll distance maps straight to index,
   and a flick of the wheel still moves the page the amount you'd expect.

   Rendered on large screens only (see WorkList for the small-screen version),
   which is why the hooks here never have to care about touch. */
export default function WorkScrub({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    // The last slice has to reach 1.0, hence the clamp rather than a floor on
    // value * length alone.
    const next = Math.min(projects.length - 1, Math.floor(value * projects.length))
    setActive((current) => (current === next ? current : next))
  })

  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const current = projects[active]

  return (
    <div ref={ref} style={{ height: `${projects.length * 100}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-6 pt-[4.5rem] lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-baseline justify-between">
            <p className="eyebrow">The case</p>
            <p className="font-display text-sm tracking-widest text-chalk/45">
              <span className="text-chalk">{String(active + 1).padStart(2, '0')}</span>
              <span className="mx-1">/</span>
              {String(projects.length).padStart(2, '0')}
            </p>
          </div>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Copy column. Keyed on slug so each project's text animates in
                rather than mutating in place. */}
            <div className="relative lg:col-span-5">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-sm text-chalk/40">{current.year}</p>
                <h2 className="display mt-3 text-[clamp(2.25rem,4.5vw,4.5rem)]">
                  {current.title}
                </h2>
                <p className="mt-6 max-w-prose text-chalk/60">{current.description}</p>

                <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-chalk/40">
                  {current.tags.map((tag, i) => (
                    <li key={tag} className="flex items-center gap-3">
                      {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-chalk/15" />}
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap items-center gap-6 text-sm">
                  <Link
                    href={`/work/${current.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-chalk px-5 py-2.5 font-medium text-void transition-colors hover:bg-accent"
                  >
                    Read the case
                  </Link>
                  {current.liveHref && (
                    <a
                      href={current.liveHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-wipe text-accent"
                    >
                      Live site ↗
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Image column. All of them are mounted and crossfaded, so there
                is no flash of an unloaded image when the index changes. */}
            <div className="relative aspect-[16/10] w-full lg:col-span-7">
              {projects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  aria-hidden={i !== active}
                  initial={false}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    scale: i === active ? 1 : 1.04,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 overflow-hidden rounded-xl ring-1 ring-inset ring-chalk/10"
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress rail. */}
          <div className="mt-10 h-px w-full bg-chalk/10">
            <motion.div
              style={{ scaleX: progressScale, originX: 0 }}
              className="h-full w-full bg-accent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
