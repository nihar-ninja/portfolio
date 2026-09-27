import Link from 'next/link'
import DisplayHeading from '@/components/DisplayHeading'
import Reveal from '@/components/Reveal'
import { workEmpty } from '@/lib/content'

/* The state the work page sits in until there is real work to show. It is
   built like any other section rather than looking like a page that failed to
   load — an empty portfolio is a stage, not an error. */
export default function WorkEmpty({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? '' : 'mt-16'}>
      <Reveal>
        <p className="eyebrow">{workEmpty.eyebrow}</p>
      </Reveal>

      <DisplayHeading
        lines={workEmpty.headline}
        className={
          compact
            ? 'mt-5 text-[clamp(2.25rem,7vw,5rem)]'
            : 'mt-6 text-[clamp(2.75rem,10vw,8rem)]'
        }
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5" delay={0.06}>
          <p className="max-w-prose text-chalk/60">{workEmpty.blurb}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-chalk"
          >
            {workEmpty.ctaLabel}
          </Link>
        </Reveal>

        {/* What the work will be, while there is none of it to point at. */}
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.12}>
          <ul className="border-t rule">
            {workEmpty.disciplines.map((item) => (
              <li
                key={item}
                className="flex items-center justify-between gap-4 border-b rule py-3.5"
              >
                <span className="display text-lg sm:text-xl">{item}</span>
                <span className="text-xs text-chalk/30">Soon</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  )
}
