import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CtaPanel from '@/components/CtaPanel'
import DisplayHeading from '@/components/DisplayHeading'
import Reveal from '@/components/Reveal'
import { projects } from '@/lib/content'

type Params = { params: { slug: string } }

// Every project is known at build time, so the detail pages are fully static.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return { title: project.title, description: project.blurb }
}

export default function ProjectPage({ params }: Params) {
  const index = projects.findIndex((p) => p.slug === params.slug)
  if (index === -1) notFound()

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      <article>
        <header className="px-6 pb-14 pt-40 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Link href="/work" className="link-wipe text-sm text-chalk/50">
                ← All work
              </Link>
            </Reveal>

            <DisplayHeading
              as="h1"
              lines={[project.title]}
              className="mt-8 text-[clamp(2.5rem,9vw,7rem)]"
              delay={0.05}
            />

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-prose text-lg text-chalk/60">{project.description}</p>
            </Reveal>

            <Reveal delay={0.16}>
              <dl className="mt-12 grid gap-px overflow-hidden rounded-xl bg-chalk/10 sm:grid-cols-3">
                {[
                  { label: 'Role', value: project.detail.role },
                  { label: 'Timeline', value: project.detail.timeline },
                  { label: 'Year', value: project.year },
                ].map((item) => (
                  <div key={item.label} className="bg-void p-5">
                    <dt className="eyebrow">{item.label}</dt>
                    <dd className="mt-2 text-sm">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </header>

        <Reveal className="px-6 lg:px-10">
          <div className="relative mx-auto aspect-[16/9] max-w-7xl overflow-hidden rounded-2xl ring-1 ring-inset ring-chalk/10">
            {/* PLACEHOLDER IMAGE — swap for a real screenshot. */}
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <section className="panel mt-20 px-6 py-24 sm:py-32 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h2 className="eyebrow">The problem</h2>
              <p className="mt-6 text-[clamp(1.25rem,2.4vw,1.75rem)] font-light leading-snug">
                {project.detail.problem}
              </p>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <h2 className="eyebrow">What I did</h2>
                <ul className="mt-6">
                  {project.detail.contributions.map((item) => (
                    <li key={item} className="border-b rule py-4 text-chalk/70">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.08}>
                <h2 className="eyebrow mt-14">What changed</h2>
                <ul className="mt-6 space-y-4">
                  {project.detail.outcomes.map((item) => (
                    <li key={item} className="flex gap-4 text-chalk/70">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {(project.liveHref || project.repoHref) && (
                <Reveal delay={0.12}>
                  <div className="mt-14 flex flex-wrap gap-8 text-sm">
                    {project.liveHref && (
                      <a
                        href={project.liveHref}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-wipe text-accent"
                      >
                        Visit the live site ↗
                      </a>
                    )}
                    {project.repoHref && (
                      <a
                        href={project.repoHref}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-wipe text-chalk/60"
                      >
                        Source on GitHub ↗
                      </a>
                    )}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* Next project — keeps people moving through the work rather than
            dead-ending on a case study. */}
        <section className="panel px-6 py-20 lg:px-10">
          <Link href={`/work/${next.slug}`} className="group mx-auto block max-w-7xl">
            <p className="eyebrow">Next project</p>
            <div className="mt-5 flex items-end justify-between gap-6">
              <span className="display text-[clamp(2rem,7vw,5rem)] transition-colors duration-300 group-hover:text-accent">
                {next.title}
              </span>
              <span className="mb-2 shrink-0 text-sm text-chalk/40 transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </div>
          </Link>
        </section>
      </article>

      <CtaPanel />
    </>
  )
}
