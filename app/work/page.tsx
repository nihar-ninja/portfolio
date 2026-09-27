import type { Metadata } from 'next'
import CtaPanel from '@/components/CtaPanel'
import DisplayHeading from '@/components/DisplayHeading'
import Reveal from '@/components/Reveal'
import ScrollCue from '@/components/ScrollCue'
import WorkEmpty from '@/components/work/WorkEmpty'
import WorkList from '@/components/work/WorkList'
import WorkScrub from '@/components/work/WorkScrub'
import { projects } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Photography, video, motion, interface design and web builds by Nihar Prabhakar.',
}

export default function WorkPage() {
  const hasProjects = projects.length > 0

  return (
    <>
      <section className="px-6 pb-16 pt-40 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {hasProjects && (
            <Reveal>
              <p className="eyebrow">
                {projects.length} {projects.length === 1 ? 'project' : 'projects'}
              </p>
            </Reveal>
          )}

          <DisplayHeading
            as="h1"
            lines={['Work']}
            className="mt-6 text-[clamp(4rem,20vw,16rem)]"
          />

          {hasProjects && (
            <div className="mt-10 grid gap-8 lg:grid-cols-12">
              <Reveal className="lg:col-span-5 lg:col-start-7" delay={0.1}>
                <p className="max-w-prose text-chalk/60">
                  Shot, cut, designed and built — usually all four on the same job. Each
                  case below is the short version.
                </p>
                <div className="mt-10 hidden lg:block">
                  <ScrollCue label="Scroll to browse" />
                </div>
              </Reveal>
            </div>
          )}

          {/* Until `projects` in lib/content.ts has an entry. */}
          {!hasProjects && <WorkEmpty />}
        </div>
      </section>

      {/* Pinned scrub on desktop, plain list on phones and tablets. */}
      {hasProjects && (
        <>
          <div className="hidden lg:block">
            <WorkScrub projects={projects} />
          </div>
          <div className="lg:hidden">
            <WorkList projects={projects} />
          </div>
        </>
      )}

      <CtaPanel />
    </>
  )
}
