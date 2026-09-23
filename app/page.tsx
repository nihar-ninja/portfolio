import CtaPanel from '@/components/CtaPanel'
import Marquee from '@/components/Marquee'
import Hero from '@/components/home/Hero'
import Statement from '@/components/home/Statement'
import WorkTeaser from '@/components/home/WorkTeaser'
import { home } from '@/lib/content'

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Each panel below sits on top of the one before it — the rounded top
          edge and the ring are what make the overlap read. */}
      <Statement />
      <div className="relative z-10 bg-panel">
        <Marquee items={home.marquee} />
      </div>
      <WorkTeaser />
      <CtaPanel />
    </>
  )
}
