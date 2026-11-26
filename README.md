# Portfolio

A dark, type-led personal portfolio. Multi-page (Next.js App Router), animated with
Framer Motion and Lenis, styled with Tailwind.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Making it yours

Almost everything lives in **`lib/content.ts`** — name, bio, projects, skills, links.
Every placeholder string in there is marked with a `PLACEHOLDER` comment. You should
not need to touch a component to change the words.

### Images

Drop your own files into `/public`, keeping the names:

| File | What it is | Notes |
| --- | --- | --- |
| `photo-cutout.png` | Hero portrait | **Transparent PNG.** Background removed — that is what lets the giant word show through behind you. Portrait crop, ~900×1200 or larger. |
| `photo.jpg` | About-page portrait | Normal photo, 4:5 crop, ~1000×1250 or larger. |
| `projects/*.jpg` | One screenshot per project | 16:10 works best. Point `image` in `lib/content.ts` at whatever you name them. |
| `resume.pdf` | Your CV | Not included, and not linked from anywhere yet. `contact.resumeHref` in `lib/content.ts` already points at it — drop the file in and add the link back on `/contact`. |

If you have no cut-out, point the hero at `/photo.jpg` in `components/home/Hero.tsx`.
It still works; it just reads as a framed picture rather than a layered cut-out.

### Accent colour

One value, in `tailwind.config.ts`:

```ts
accent: { DEFAULT: '#e2683a', deep: '#b2542f' }
```

Change `DEFAULT` and the whole site follows — links, buttons, counters, progress rails.

## Structure

```
app/
  page.tsx            Home — layered hero, scroll-lit statement, marquee, work teaser
  about/              Bio, facts, count-up stats
  skills/             Grouped lists, revealed line by line
  work/               Pinned showcase that scrubs through projects as you scroll
  work/[slug]/        One static page per project
  contact/            Email, socials, mailto form
components/           One component per section or behaviour
lib/content.ts        All copy and project data
```

## How the motion works

- **Lenis** (`components/SmoothScroll.tsx`) smooths the scroll so scrubbed sections
  feel continuous. Disabled entirely under `prefers-reduced-motion`.
- **`WorkScrub`** is one viewport tall per project with a `sticky` inner panel. Scroll
  position maps to the active index — nothing is hijacked, and a given flick of the
  wheel moves the page exactly as far as it would anywhere else. Below `lg` it is
  replaced by `WorkList`, a plain list, because pinning on a phone fights the browser
  chrome.
- **`DisplayHeading`** masks each line and slides it up from below.
- Everything else uses **`Reveal`**, a single rise-and-fade on entry.

Every animation degrades to a plain fade, or nothing, when the visitor has reduced
motion turned on.

## Deploying

Push to a Git repo and import it on Vercel. No environment variables, no config —
every route is static, including the project pages.

## Notes

- The contact form has no backend of its own. It POSTs to FormSubmit, which takes the
  destination address in the URL rather than an API key, so the site stays a static
  deploy with nothing to configure. The first submission triggers a one-time
  confirmation email to that address — until someone clicks it, messages are held
  rather than delivered. To send some other way, replace the body of `handleSubmit` in
  `components/ContactForm.tsx`.
- Dark is the default. A light theme ships alongside it: the palette lives as CSS
  variables in `app/globals.css`, a `light` class on `<html>` swaps it, and the inline
  script in `app/layout.tsx` applies the stored or system preference before first
  paint so there is no flash.
- The social card at `app/opengraph-image.tsx` and the `sitemap`/`robots` routes all
  read from `lib/content.ts`, so changing your name, role or URL there updates them
  too. Set `site.url` to your real domain before deploying — the sitemap and the
  canonical URLs are built from it.
