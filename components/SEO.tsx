import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, canonical }) => {
  useEffect(() => {
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } 
    
    
    
    else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = keywords;
        document.head.appendChild(meta);
      }

      
    }

    if (canonical) {
      const linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute('href', canonical);
      } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonical;
        document.head.appendChild(link);
      }

      // Handle hreflang tags
      const languages = ['fr', 'en', 'ar'];
      const currentPath = canonical.split('/').slice(4).join('/'); // Get path after domain/lang/
      const baseUrl = 'https://osalon-cars.ma';

      languages.forEach(lang => {
        const href = `${baseUrl}/${lang}${currentPath ? '/' + currentPath : ''}`;
        let linkHreflang = document.querySelector(`link[hreflang="${lang}"]`);
        if (linkHreflang) {
          linkHreflang.setAttribute('href', href);
        } else {
          const link = document.createElement('link');
          link.rel = 'alternate';
          link.hreflang = lang;
          link.href = href;
          document.head.appendChild(link);
        }
      });

      // x-default (usually same as main language)
      let linkDefault = document.querySelector('link[hreflang="x-default"]');
      const defaultHref = `${baseUrl}/fr${currentPath ? '/' + currentPath : ''}`;
      if (linkDefault) {
        linkDefault.setAttribute('href', defaultHref);
      } else {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = 'x-default';
        link.href = defaultHref;
        document.head.appendChild(link);
      }
    }
    
    // OG Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl && canonical) ogUrl.setAttribute('content', canonical);

  }, [title, description, keywords, canonical]);

  return null;
};

export default SEO;
