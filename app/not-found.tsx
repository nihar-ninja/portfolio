import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col justify-center px-6 pt-40 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-6 text-[clamp(3rem,14vw,11rem)]">Not here</h1>
        <p className="mt-6 max-w-prose text-chalk/60">
          That page does not exist — or it did once and no longer does.
        </p>
        <Link href="/" className="link-wipe mt-8 inline-block text-accent">
          Back to the start
        </Link>
      </div>
    </section>
  )
}
