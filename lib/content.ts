/* =============================================================================
   PLACEHOLDER CONTENT — the only file you need to edit to make the site yours.
   Every string below is invented. Replace it with your own.

   Images live in /public:
     photo.jpg          portrait, used on /about
     photo-cutout.png   background-removed portrait, layered into the hero type
     projects/*.jpg     one per project
   ========================================================================== */

export const site = {
  // Shown in the hero, split across the display type.
  name: 'Nihar Prabhakar',
  // What the browser tab says on the home page.
  title: 'Nihar - Portfolio',
  // The serif logotype in the top-left. Initials work best.
  logotype: 'N.P',
  role: 'Product Designer',
  description:
    'Product designer working on internal tools — dispatch boards, inspection apps, the software people are stuck with all day.',
  // PLACEHOLDER: used for canonical and Open Graph URLs once you deploy.
  url: 'https://example.com',
  location: 'Bangalore, IN',
}

export const nav = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Contact', href: '/contact' },
]

export const home = {
  // PLACEHOLDER: the giant word behind your photo. One word, 8–10 characters
  // reads best — longer than that and it stops filling the screen.
  displayWord: 'PORTFOLIO',
  // The two labels flanking the figure.
  flankLeft: 'NIHAR',
  flankRight: 'PRABHAKAR',
  /* Describes the hero image for screen readers and for anyone whose images
     fail to load. Rewrite this whenever you change /public/photo-cutout.png. */
  imageAlt:
    'Illustration of a figure in a pink embroidered sherwani and cream trousers, head bowed',
  // PLACEHOLDER: one real sentence. It sits under the fold on the home page.
  statement:
    "Ten years of product design, almost all of it on tools for people whose job isn't using software — dispatchers, surveyors, bookkeepers. I'm more interested in the third screen than the landing page.",
  // PLACEHOLDER: the looping ticker. Keep them short and uppercase.
  marquee: ['PRODUCT DESIGN', 'DESIGN SYSTEMS', 'RESEARCH', 'PROTOTYPING', 'INTERFACE'],
}

export const about = {
  /* PLACEHOLDER BIO — first-person and specific on purpose. Rewrite it in your
     own voice; the specifics are what stop it reading like marketing copy. */
  paragraphs: [
    'I started out making zines in a university print room and ended up in enterprise software, which makes more sense than it sounds. Both are mostly about cramming a lot into a small space without making it ugly.',
    'These days I work on internal tools — the screens nobody posts on Dribbble, that someone opens two hundred times a day. Less about visual style, more about arguing for fewer fields, better defaults, and error messages that say what actually went wrong.',
    'I think best on long walks and worst in meetings after 4pm. Outside of work I am slowly restoring a 1972 Vespa and I am still, three years in, bad at it.',
  ],
  // PLACEHOLDER: these count up when they scroll into view. `value` is a number.
  stats: [
    { value: 10, suffix: '+', label: 'years designing' },
    { value: 34, suffix: '', label: 'products shipped' },
    { value: 1, suffix: '', label: 'person, no studio' },
  ],
  facts: [
    { label: 'Based in', value: 'Bangalore, IN' },
    { label: 'Currently', value: 'Design lead at Freightline' },
    { label: 'Before that', value: 'Two product studios, then freelance' },
    { label: 'Open to', value: 'Contract work from March' },
  ],
}

export type Project = {
  slug: string
  title: string
  year: string
  /** The one-line summary on the work index. */
  blurb: string
  /** Two or three specific sentences, used on the index and the detail page. */
  description: string
  tags: string[]
  image: string
  imageAlt: string
  liveHref?: string
  repoHref?: string
  /** Detail-page only. */
  detail: {
    role: string
    timeline: string
    /** The short version of what the problem was. */
    problem: string
    /** What you actually did. Each entry is one line. */
    contributions: string[]
    /** What changed because of it. Keep these measurable where you can. */
    outcomes: string[]
  }
}

/* PLACEHOLDER PROJECTS — replace with your own. The /work page pins and scrubs
   through these in order, so keep the list between about four and eight.
   Screenshots are placeholder JPEGs in /public/projects. */
export const projects: Project[] = [
  {
    slug: 'freightline',
    title: 'Freightline Dispatch',
    year: '2024',
    blurb: 'A dispatch board for a 40-truck freight company.',
    description:
      'Their dispatchers were running the entire operation from a whiteboard and three browser tabs. I sat in the office for two weeks before drawing anything, then rebuilt the board around how they actually sequence loads rather than how the database was shaped.',
    tags: ['Product design', 'Field research', 'Design system', 'Figma'],
    image: '/projects/freightline.jpg',
    imageAlt: 'Dispatch board interface showing a timeline of truck assignments',
    liveHref: 'https://example.com',
    repoHref: 'https://github.com/example/freightline',
    detail: {
      role: 'Lead product designer',
      timeline: 'Jan – Jun 2024',
      problem:
        'Dispatchers held the day in their heads. Every load was assigned by shouting across the room, and the software existed mostly to record what had already been decided.',
      contributions: [
        'Two weeks of contextual inquiry on the dispatch floor before opening Figma',
        'Rebuilt the board around driver-hours rather than order IDs',
        'Designed the conflict states first, since that is where the job actually lives',
        'Shipped a 40-component system so the three internal apps stopped diverging',
      ],
      outcomes: [
        'Time to assign a load fell from about four minutes to forty seconds',
        'Double-booked drivers dropped to near zero in the first quarter',
        'The whiteboard came down in week three and did not go back up',
      ],
    },
  },
  {
    slug: 'tideline',
    title: 'Tideline',
    year: '2023',
    blurb: 'Tide and wind forecasts for sea kayakers.',
    description:
      'I got caught out by a turning tide off the Karnataka coast and decided that was, at least partly, a design problem. Tideline answers one question — is it safe to go out in the next six hours — instead of showing nine charts and letting you work it out yourself.',
    tags: ['Side project', 'iOS', 'SwiftUI'],
    image: '/projects/tideline.jpg',
    imageAlt: 'Mobile app screen showing a tide curve and a go or no-go summary',
    liveHref: 'https://example.com',
    repoHref: 'https://github.com/example/tideline',
    detail: {
      role: 'Designer and developer',
      timeline: 'Weekends, 2023',
      problem:
        'Every marine forecast app is built for people who already know how to read one. If you are two seasons in, you get nine charts and no answer.',
      contributions: [
        'Reduced the whole forecast to a single go / wait / no-go verdict',
        'Kept the raw charts one tap away, so it teaches rather than hides',
        'Built it in SwiftUI myself over about fifteen weekends',
      ],
      outcomes: [
        'Roughly 2,000 downloads with no marketing beyond one forum post',
        'Two local clubs use it for their beginner sessions',
      ],
    },
  },
  {
    slug: 'hoxton',
    title: 'Hoxton',
    year: '2022',
    blurb: 'A design system three teams actually adopted.',
    description:
      'Sixty-odd components, but the real work was political. I ran a weekly clinic for six months so engineers could bring me their edge cases instead of quietly forking the button.',
    tags: ['Design systems', 'Documentation', 'Figma', 'Storybook'],
    image: '/projects/hoxton.jpg',
    imageAlt: 'Grid of design system components with specification annotations',
    liveHref: 'https://example.com',
    detail: {
      role: 'Design systems lead',
      timeline: '2021 – 2022',
      problem:
        'Three product teams, three button components, and a shared codebase where none of them matched. Previous attempts had failed by mandate.',
      contributions: [
        'Audited every screen before proposing a single component',
        'Ran an open weekly clinic instead of a governance process',
        'Wrote the documentation as answers to questions people had actually asked',
      ],
      outcomes: [
        'Adoption went from one team to three without a mandate',
        'New-screen build time roughly halved by the end of the year',
      ],
    },
  },
  {
    slug: 'fieldbook',
    title: 'Fieldbook',
    year: '2021',
    blurb: 'Offline-first inspection app for building surveyors.',
    description:
      'Surveyors work in basements and stairwells with no signal, so every interaction had to survive losing connection halfway through a form. Most of the design work was deciding what to show someone when the app cannot be certain of anything.',
    tags: ['Offline-first', 'Mobile', 'User research'],
    image: '/projects/fieldbook.jpg',
    imageAlt: 'Tablet inspection form with an offline sync indicator',
    repoHref: 'https://github.com/example/fieldbook',
    detail: {
      role: 'Product designer',
      timeline: 'Mar – Nov 2021',
      problem:
        'The existing tool assumed a connection. Surveyors lost an afternoon of work often enough that most had gone back to paper and retyped it in the evening.',
      contributions: [
        'Shadowed four surveyors through full inspections, including the basements',
        'Designed a sync model the user can see and trust, rather than a spinner',
        'Made every destructive action recoverable, since the network is not reliable',
      ],
      outcomes: [
        'Paper fallback dropped from most inspections to almost none',
        'Evenings spent retyping notes, by their own estimate, went to zero',
      ],
    },
  },
  {
    slug: 'set-in-stone',
    title: 'Set in Stone',
    year: '2020',
    blurb: 'A tiny type-scale tool I still use every week.',
    description:
      'One page, two inputs, no account. I built it in a weekend because every other type scale generator wanted my email address first.',
    tags: ['Weekend build', 'TypeScript'],
    image: '/projects/set-in-stone.jpg',
    imageAlt: 'Type scale tool showing a ratio slider and preview text',
    liveHref: 'https://example.com',
    repoHref: 'https://github.com/example/set-in-stone',
    detail: {
      role: 'Designer and developer',
      timeline: 'One weekend, 2020',
      problem:
        'Every type scale generator online is a lead magnet with a tool attached.',
      contributions: [
        'Two inputs, live preview, copyable CSS custom properties',
        'No account, no analytics, no email capture',
      ],
      outcomes: ['Still the tool I reach for first, five years on'],
    },
  },
]

/* PLACEHOLDER SKILLS — the /skills page reveals these line by line.
   `note` is optional and only worth adding when a group needs a caveat. */
export const skillGroups = [
  {
    title: 'Design',
    note: 'Where most of my time goes.',
    items: [
      'Interaction design',
      'Design systems',
      'Information architecture',
      'Prototyping',
      'Typography',
    ],
  },
  {
    title: 'Research',
    note: 'Enough to run it myself, not enough to call myself a researcher.',
    items: ['Contextual inquiry', 'Usability testing', 'Survey design', 'Synthesis workshops'],
  },
  {
    title: 'Build',
    note: 'I ship my own prototypes and read the team’s pull requests.',
    items: ['HTML & CSS', 'React', 'TypeScript', 'SwiftUI (slowly)'],
  },
  {
    title: 'Tools',
    items: ['Figma', 'Storybook', 'Linear', 'Framer', 'Git'],
  },
]

/* PLACEHOLDER CONTACT — swap in your real email and profiles. */
export const contact = {
  email: 'hello@example.com',
  // PLACEHOLDER: the big statement on /contact. Direct beats clever here.
  headline: ['WANT TO WORK', 'TOGETHER?'],
  blurb:
    'Send a brief, a half-formed idea, or one sentence. You get a straight answer and a timeline back, usually the same day.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/example', handle: '@example' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/example', handle: '/in/example' },
    { label: 'X', href: 'https://x.com/example', handle: '@example' },
  ],
  // PLACEHOLDER: drop your CV at /public/resume.pdf.
  resumeHref: '/resume.pdf',
}
