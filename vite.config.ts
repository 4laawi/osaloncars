import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';

// All blog slugs — keep in sync with data/blogs.ts
const BLOG_SLUGS = [
  'que-faire-a-rabat-guide-ultime',
  'location-voiture-aeroport-rabat-sale',
  'visiter-sale-joyaux-caches',
  'meilleurs-endroits-autour-rabat',
  'conduire-rabat-sale-regles-astuces',
  'pourquoi-louer-voiture-sala-al-jadida',
];

const LANGS = ['fr', 'en', 'ar'];

// Build the full list of routes to prerender
const routesToPrerender: string[] = [];

for (const lang of LANGS) {
  routesToPrerender.push(`/${lang}`);              // home
  routesToPrerender.push(`/${lang}/flotte`);        // fleet
  routesToPrerender.push(`/${lang}/contact`);       // contact
  routesToPrerender.push(`/${lang}/blog`);          // blog list
  for (const slug of BLOG_SLUGS) {
    routesToPrerender.push(`/${lang}/blog/${slug}`); // blog posts
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      ...vitePrerenderPlugin({
        renderTarget: '#root',
        prerenderScript: path.resolve(__dirname, 'prerender.tsx'),
        additionalPrerenderRoutes: routesToPrerender,
        previewMiddlewareFallback: '/fr/index.html',
      }),
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
