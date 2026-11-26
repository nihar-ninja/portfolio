import type { MetadataRoute } from 'next'
import { site } from '@/lib/content'

/* Nothing here is private, so everything is crawlable. The point of the file
   is the sitemap line — it is how a crawler finds the inner pages without
   having to walk the nav. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
