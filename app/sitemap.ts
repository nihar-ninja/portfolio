import type { MetadataRoute } from 'next'
import { projects, site } from '@/lib/content'

/* Every route the site has, listed for crawlers. The project pages come from
   `projects` in lib/content.ts, so adding one adds it here too — there is no
   second list to keep in step. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/work', '/about', '/skills', '/contact'].map((path) => ({
    url: `${site.url}${path}`,
    // Home first, then the work, then the rest.
    priority: path === '' ? 1 : path === '/work' ? 0.9 : 0.7,
    changeFrequency: 'monthly' as const,
  }))

  const projectPages = projects.map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    priority: 0.6,
    changeFrequency: 'yearly' as const,
  }))

  return [...pages, ...projectPages]
}
