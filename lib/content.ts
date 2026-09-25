/* =============================================================================
   SITE CONTENT — the only file you need to edit to change what the site says.

   Anything still marked PLACEHOLDER is something I could not know and you
   should replace: your email, your social handles, and the projects.

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
  // Appears in the footer and in the hero's screen-reader heading.
  role: 'Designer & Developer',
  description:
    'Nihar Prabhakar — designer and developer in Bangalore. Visual and UI design, photography, video and motion, web builds, and automation.',
  // Your live domain, so link previews and canonical URLs resolve properly.
  url: 'https://np-studio-one.vercel.app',
  location: 'Bangalore, IN',
}

export const nav = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Contact', href: '/contact' },
]

export const home = {
  // The giant word behind the figure. One word, 8–10 characters reads best.
  displayWord: 'PORTFOLIO',
  // The two labels flanking the figure.
  flankLeft: 'NIHAR',
  flankRight: 'PRABHAKAR',
  /* Describes the hero image for screen readers and for anyone whose images
     fail to load. Rewrite this whenever you change /public/photo-cutout.png. */
  imageAlt:
    'Illustration of a figure in a pink embroidered sherwani and cream trousers, head bowed',
  // Sits under the fold on the home page, lit word by word as you scroll.
  statement:
    'I shoot it, cut it, design it, and then build the thing it lives on. Most people pick one lane. I never saw the point, when the same idea has to survive all of them anyway.',
  // The looping ticker. Short and uppercase.
  marquee: [
    'PHOTOGRAPHY',
    'VIDEOGRAPHY',
    'UI DESIGN',
    'MOTION',
    'WEB DEVELOPMENT',
    'AUTOMATION',
  ],
}

export const about = {
  /* Written first-person from the disciplines you listed. Rewrite freely —
     it should sound like you, and right now it sounds like me guessing. */
  paragraphs: [
    'I work across design, camera and code. Interfaces and visual work on one side, photography and video on the other, and the web build that ties the two together — usually on the same project, which is the part I actually like.',
    'The camera side is shooting, editing, motion and grade. The design side is visual and UI work. The code side is the front end, and I build it with AI in the loop rather than pretending otherwise — it is faster, and I would rather be straight about how the work gets made.',
    'The last piece is automation. If I have done something by hand twice, I would rather lose an afternoon making it run itself than keep doing it for the next year.',
  ],
  /* The day you started. The first stat counts from here and looks after
     itself — "1 month in", "7 months in", then "1 year in" once twelve months
     have passed. Change this date to your real start and nothing else needs
     touching, ever. Format: YYYY-MM-DD. */
  experienceStart: '2026-08-23',
  /* The other two counters, which count up when they scroll into view.
     Deliberately things that are true rather than impressive-sounding numbers
     I invented — change them to whatever you can stand behind. */
  stats: [
    { value: 8, suffix: '', label: 'disciplines' },
    { value: 1, suffix: '', label: 'person, no studio' },
  ],
  /* Describes /public/photo.jpg. Rewrite it whenever you change that image —
     it is what a screen reader announces, and what shows if the file fails
     to load. */
  imageAlt:
    'Anime-style illustration of a young man in glasses and a striped shirt holding a phone, looking up at a bright blue sky, with hand-lettered signs reading "dream plan do repeat" and "same dude bigger dreams"',
  facts: [
    { label: 'Based in', value: 'Bangalore, IN' },
    { label: 'Works across', value: 'Design, film and code' },
    // PLACEHOLDER: change if you are not looking for work right now.
    { label: 'Available for', value: 'Freelance and collaborations' },
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

/* ===== NO PROJECTS YET ====================================================
   Empty on purpose — there is no real work to show yet, and inventing case
   studies under your own name is not worth it. While this list is empty, the
   work page and the home-page teaser both render a 'coming soon' state.

   Add an entry and everything switches on by itself: the pinned scrub on
   /work, the teaser rows on the home page, and a static page per project at
   /work/<slug>. The shape is the Project type above. Example:

   {
     slug: 'sherwani-series',
     title: 'Sherwani Series',
     year: '2026',
     blurb: 'A portrait series shot over three weekends.',
     description: 'Two or three sentences on what it was and what you made.',
     tags: ['Photography', 'Editing'],
     image: '/projects/sherwani.jpg',
     imageAlt: 'Describe the screenshot or frame',
     liveHref: 'https://example.com',
     detail: {
       role: 'Photographer and editor',
       timeline: 'Feb 2026',
       problem: 'What the brief was.',
       contributions: ['What you shot', 'What you cut'],
       outcomes: ['Where it ran'],
     },
   },
   ========================================================================= */
export const projects: Project[] = []

/* Shown wherever projects would be, for as long as `projects` is empty.
   Once you add one, none of this appears anywhere. */
export const workEmpty = {
  eyebrow: 'In progress',
  headline: ['NOTHING', 'HERE YET'],
  blurb:
    'I am putting the first pieces together — a shoot, an edit, and a build. They will go up here as they are finished rather than all at once.',
  // The disciplines listed under the headline.
  disciplines: [
    'Photography',
    'Videography',
    'Editing',
    'Visual & UI design',
    'Motion',
    'Web development',
    'Automation',
  ],
  ctaLabel: 'Want to be the first one?',
}

/* The /skills page reveals these line by line. `note` is optional and only
   worth adding when a group needs a caveat. */
export const skillGroups = [
  {
    title: 'Design',
    note: 'Interfaces and everything around them.',
    items: ['Visual design', 'UI design', 'Layout & typography', 'Prototyping'],
  },
  {
    title: 'Camera',
    note: 'Shot and finished by the same person.',
    items: ['Photography', 'Videography', 'Lighting', 'Editing'],
  },
  {
    title: 'Motion',
    items: ['Motion graphics', 'Titles & transitions', 'Colour grading'],
  },
  {
    title: 'Build',
    note: 'Built with AI in the loop, which I would rather say than hide.',
    items: ['Web development', 'Front-end', 'Vibe coding'],
  },
  {
    title: 'Automation',
    note: 'Anything I have had to do by hand twice.',
    items: ['Workflow automation', 'Integrations', 'Scripting'],
  },
]

export const contact = {
  email: 'niharprabhakara11@gmail.com',
  /* Paste your Web3Forms access key here and the contact form starts
     delivering straight to the inbox above — no server, no Vercel settings.

     Get one at https://web3forms.com : type in niharprabhakara11@gmail.com,
     they email you a key, paste it below. Free, no account, no card.

     While this is empty the form falls back to opening a mail app / Gmail
     compose window, which is what it did before. The key is designed to be
     public — it only ever sends to the address it was issued for. */
  formAccessKey: '',
  headline: ['WANT TO WORK', 'TOGETHER?'],
  blurb:
    'A shoot, an edit, an interface, a site, or something that should have been automated months ago. Send a brief or one sentence — either works.',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/nihar_prabhakar', handle: '@nihar_prabhakar' },
    { label: 'GitHub', href: 'https://github.com/nihar-ninja', handle: '@nihar-ninja' },
  ],
  // PLACEHOLDER: drop your CV at /public/resume.pdf, or remove this link.
  resumeHref: '/resume.pdf',
}
