import Image from 'next/image'
import Link from 'next/link'
import DisplayHeading from '@/components/DisplayHeading'
import Reveal from '@/components/Reveal'
import WorkEmpty from '@/components/work/WorkEmpty'
import { projects } from '@/lib/content'

/* Three projects on the home page, as rows rather than cards. The image only
   appears on hover on desktop, which keeps the list quiet until you engage
   with it — and on touch it simply renders inline instead.

   With no projects in lib/content.ts yet, the same panel carries the
   coming-soon state instead, so the home page never has a gap in it. */
export default function WorkTeaser() {
  const shortlist = projects.slice(0, 3)

  if (shortlist.length === 0) {
    return (
      <section className="panel px-6 py-24 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <WorkEmpty compact />
        </div>
      </section>
    )
  }

  return (
    <section className="panel px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <DisplayHeading lines={['Selected', 'work']} className="text-[clamp(2.5rem,8vw,6.5rem)]" />
          <Reveal delay={0.1}>
            <Link href="/work" className="link-wipe mb-2 shrink-0 text-sm text-chalk/60">
              All {projects.length} projects
            </Link>
          </Reveal>
        </div>

        <ul className="mt-16 border-t rule">
          {shortlist.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 0.06}>
              <Link
                href={`/work/${project.slug}`}
                className="group grid items-center gap-4 border-b rule py-8 sm:grid-cols-12 sm:gap-8"
              >
                <span className="eyebrow sm:col-span-1">{String(i + 1).padStart(2, '0')}</span>

                <span className="display text-[clamp(1.75rem,4.5vw,3.25rem)] transition-colors duration-300 group-hover:text-accent sm:col-span-5">
                  {project.title}
                </span>

                {/* Thumbnail: collapsed to nothing until hover on desktop. */}
                <span className="relative block h-28 w-full overflow-hidden rounded-lg sm:col-span-3 sm:h-0 sm:opacity-0 sm:transition-all sm:duration-500 sm:ease-out sm:group-hover:h-28 sm:group-hover:opacity-100">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 260px"
                    className="object-cover"
                  />
                </span>

                <span className="text-sm text-chalk/50 sm:col-span-2">{project.blurb}</span>
                <span className="text-right text-sm text-chalk/35 sm:col-span-1">
                  {project.year}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
