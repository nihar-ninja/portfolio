import { Fragment } from 'react'

/* An endless ticker. The list is rendered twice and the track is translated by
   exactly -50%, so the loop point is invisible. Pure CSS — it costs nothing and
   keeps running while JavaScript is busy elsewhere. */
export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="mask-edges overflow-hidden border-y rule py-5" aria-hidden="true">
      <div className="animate-marquee flex w-max motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <Fragment key={copy}>
            {items.map((item, i) => (
              <span
                key={`${copy}-${item}-${i}`}
                className="display flex shrink-0 items-center gap-8 px-8 text-[clamp(1.5rem,3.5vw,2.75rem)] text-chalk/25"
              >
                {item}
                <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
