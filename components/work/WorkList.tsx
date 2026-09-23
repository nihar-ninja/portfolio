import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import type { Project } from '@/lib/content'

/* The small-screen version of the showcase. Pinning a section on a phone
   fights the browser chrome and eats the whole viewport, so on mobile the same
   projects are simply a list. */
export default function WorkList({ projects }: { projects: Project[] }) {
  return (
    <div className="px-6 py-16">
      <ul className="space-y-16">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={0.04}>
            <Link href={`/work/${project.slug}`} className="block">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm text-chalk/40">{project.year}</span>
              </div>

              <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-inset ring-chalk/10">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <h2 className="display mt-6 text-3xl">{project.title}</h2>
              <p className="mt-3 text-chalk/60">{project.blurb}</p>
              <p className="mt-6 text-sm text-accent">Read the case ↗</p>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}
