import type { Metadata } from 'next'
import CtaPanel from '@/components/CtaPanel'
import DisplayHeading from '@/components/DisplayHeading'
import Marquee from '@/components/Marquee'
import Reveal from '@/components/Reveal'
import { home, skillGroups } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Design, research, build and tools — what I actually work with.',
}

export default function SkillsPage() {
  return (
    <>
      <section className="px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow">What I work with</p>
          </Reveal>
          <DisplayHeading
            as="h1"
            lines={['Skills']}
            className="mt-6 text-[clamp(4rem,19vw,15rem)]"
          />
        </div>
      </section>

      <section className="panel px-6 py-16 sm:py-24 lg:px-10">
        <dl className="mx-auto max-w-7xl">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <div className="grid gap-5 border-t rule py-10 sm:grid-cols-12 sm:gap-8">
                <dt className="sm:col-span-4">
                  {/* The category is the display type here — the items stay
                      quiet underneath it, which is the opposite of an icon grid. */}
                  <span className="display text-[clamp(1.75rem,4vw,3rem)]">{group.title}</span>
                  {group.note && (
                    <span className="mt-2 block max-w-[26ch] text-sm leading-snug text-chalk/40">
                      {group.note}
                    </span>
                  )}
                </dt>
                <dd className="sm:col-span-7 sm:col-start-6">
                  <ul className="columns-1 gap-8 sm:columns-2">
                    {group.items.map((item) => (
                      <li key={item} className="break-inside-avoid border-b rule py-2.5 text-chalk/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      <div className="relative z-10 bg-panel">
        <Marquee items={home.marquee} />
      </div>

      <CtaPanel />
    </>
  )
}
