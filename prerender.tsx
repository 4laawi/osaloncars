import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoutes } from './App';
import fr from './locales/fr.json';
import en from './locales/en.json';
import ar from './locales/ar.json';
import { getBlogBySlug } from './data/blogs';

const locales: Record<string, any> = { fr, en, ar };

export async function prerender(data: { url: string }) {
  // 1. Render the main React app to a static HTML string
  const html = renderToString(
    <StaticRouter location={data.url}>
      <AppRoutes />
    </StaticRouter>
  );

  // 2. Dynamically determine SEO tags for the generated HTML's <head>
  const urlParts = data.url.replace(/^\/|\/$/g, '').split('/');
  const lang = ['fr', 'en', 'ar'].includes(urlParts[0]) ? urlParts[0] : 'fr';
  const page = urlParts[1] || 'home';
  const slug = urlParts[2];

  const t = locales[lang] || fr;
  let title = t.seo.home_title;
  let description = t.seo.home_desc;

  if (page === 'flotte') {
    title = t.seo.fleet_title;
    description = t.seo.fleet_desc;
  } else if (page === 'contact') {
    title = t.seo.contact_title;
    description = t.seo.contact_desc;
  } else if (page === 'blog') {
    if (slug) {
      // It's a blog post details page
      const post = getBlogBySlug(slug, lang);
      if (post) {
        title = `${post.title} | O'Salon Car`;
        description = post.excerpt;
      } else {
        title = t.seo.blog_title;
        description = t.seo.blog_desc;
      }
    } else {
      // It's the blog listing page
      title = t.seo.blog_title;
      description = t.seo.blog_desc;
    }
  }

  // Generate head element objects for the plugin to inject
  const headElements = [
    { type: 'meta', props: { name: 'description', content: description } },
    { type: 'meta', props: { property: 'og:title', content: title } },
    { type: 'meta', props: { property: 'og:description', content: description } },
    { type: 'meta', props: { property: 'og:url', content: `https://osalon-cars.ma${data.url}` } },
    { type: 'meta', props: { name: 'twitter:title', content: title } },
    { type: 'meta', props: { name: 'twitter:description', content: description } },
    { type: 'meta', props: { name: 'twitter:url', content: `https://osalon-cars.ma${data.url}` } },
    { type: 'link', props: { rel: 'canonical', href: `https://osalon-cars.ma${data.url}` } }
  ];

  return {
    html,
    head: {
      lang,
      title,
      elements: new Set(headElements)
    }
  };
}
