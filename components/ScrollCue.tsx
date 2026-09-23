// Bottom-right scroll marker: a word and a line that wipes left to right.
export default function ScrollCue({ label = 'Scroll' }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 text-[0.6875rem] uppercase tracking-[0.22em] text-chalk/35">
      {label}
      <span className="block h-px w-16 overflow-hidden bg-chalk/15">
        <span className="animate-cue-line block h-full w-full bg-accent motion-reduce:animate-none" />
      </span>
    </div>
  )
}
