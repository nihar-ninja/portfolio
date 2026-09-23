import type { Metadata } from 'next'
import CtaPanel from '@/components/CtaPanel'
import DisplayHeading from '@/components/DisplayHeading'
import Reveal from '@/components/Reveal'
import ScrollCue from '@/components/ScrollCue'
import WorkList from '@/components/work/WorkList'
import WorkScrub from '@/components/work/WorkScrub'
import { projects } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected product design work — dispatch tools, inspection apps and design systems.',
}

export default function WorkPage() {
  return (
    <>
      <section className="px-6 pb-16 pt-40 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow">{projects.length} projects · 2020–2024</p>
          </Reveal>
          <DisplayHeading
            as="h1"
            lines={['Work']}
            className="mt-6 text-[clamp(4rem,20vw,16rem)]"
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-5 lg:col-start-7" delay={0.1}>
              <p className="max-w-prose text-chalk/60">
                {/* PLACEHOLDER: one or two sentences framing the work. */}
                Mostly internal tools, mostly for people who did not choose the software they
                use. Each case below is the short version — what was broken, what I did, and
                what changed.
              </p>
              <div className="mt-10 hidden lg:block">
                <ScrollCue label="Scroll to browse" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pinned scrub on desktop, plain list on phones and tablets. */}
      <div className="hidden lg:block">
        <WorkScrub projects={projects} />
      </div>
      <div className="lg:hidden">
        <WorkList projects={projects} />
      </div>

      <CtaPanel />
    </>
  )
}
