import type { Metadata } from 'next'
import Image from 'next/image'
import CountUp from '@/components/CountUp'
import CtaPanel from '@/components/CtaPanel'
import DisplayHeading from '@/components/DisplayHeading'
import Reveal from '@/components/Reveal'
import { about, site } from '@/lib/content'
import { experienceStat } from '@/lib/experience'

export const metadata: Metadata = {
  title: 'About',
  description: about.paragraphs[0],
}

/* The experience counter is worked out when the page renders, so the page has
   to be rebuilt periodically or it would freeze at whatever it said on the day
   it was deployed. Once a day is far more often than a month-counter needs. */
export const revalidate = 86400

export default function AboutPage() {
  // Counts months, then years, from about.experienceStart.
  const stats = [experienceStat(about.experienceStart), ...about.stats]

  return (
    <>
      {/* The heading sits behind the portrait here too, but cropped by the
          viewport rather than centred — same idea, different framing, so the
          page does not read as a repeat of the home page. */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <DisplayHeading
            as="h1"
            lines={['About', 'me']}
            className="text-[clamp(4rem,17vw,14rem)] text-chalk/90"
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-inset ring-chalk/10">
                {/* PLACEHOLDER IMAGE: replace /public/photo.jpg with a real
                    portrait. A 4:5 crop at 1000×1250 or larger works best. */}
                <Image
                  src="/photo.jpg"
                  alt={`${site.name} in ${site.location}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              {about.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p
                    className={
                      i === 0
                        ? 'text-[clamp(1.35rem,2.6vw,2rem)] font-light leading-snug'
                        : 'mt-6 max-w-prose leading-relaxed text-chalk/60'
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={0.2}>
                <dl className="mt-12 border-t rule">
                  {about.facts.map((fact) => (
                    <div key={fact.label} className="flex justify-between gap-6 border-b rule py-3.5 text-sm">
                      <dt className="text-chalk/40">{fact.label}</dt>
                      <dd className="text-right">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Counters. They run once, when they reach the viewport. */}
      <section className="panel px-6 py-24 sm:py-28 lg:px-10">
        <dl className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <dd className="display text-[clamp(3.5rem,9vw,7rem)] text-accent">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-3 text-sm text-chalk/50">{stat.label}</dt>
            </Reveal>
          ))}
        </dl>
      </section>

      <CtaPanel />
    </>
  )
}
