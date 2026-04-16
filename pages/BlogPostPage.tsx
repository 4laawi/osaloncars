import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { getBlogBySlug } from '../data/blogs';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language, isRTL } = useLanguage();
  
  const post = getBlogBySlug(slug || '', language);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to={`/${language}/blog`} replace />;
  }

  return (
    <div className={`font-sans text-gray-900 bg-white min-h-screen flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
      <SEO 
        title={`${post.title} | O'Salon Blog`}
        description={post.excerpt}
        canonical={`https://osaloncars.ma/${language}/blog/${post.slug}`}
      />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <article itemScope itemType="http://schema.org/BlogPosting">
          {/* Header Section */}
          <header className="relative h-[40vh] md:h-[60vh] min-h-[300px] w-full">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              itemProp="image"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center container mx-auto px-6 text-center">
              <div className="max-w-4xl">
                <Link 
                  to={`/${language}/blog`} 
                  className={`inline-flex items-center text-white/80 hover:text-white mb-6 font-medium transition-colors ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
                >
                  <ArrowLeft size={18} className={isRTL ? 'ml-2 rotate-180' : 'mr-2'} /> {t('blog.back')}
                </Link>
                <h1 className={`text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6 ${isRTL ? 'font-arabic' : ''}`} itemProp="headline">
                  {post.title}
                </h1>
                <div className={`flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm md:text-base font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Calendar size={18} />
                    <time itemProp="datePublished" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-MA' : language === 'en' ? 'en-US' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                  </span>
                  <span className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`} itemProp="author" itemScope itemType="http://schema.org/Person">
                    <User size={18} />
                    <span itemProp="name">{post.author}</span>
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Content Section */}
          <div className="container mx-auto px-6 py-16">
            <div className="max-w-3xl mx-auto">
              <div className={`bg-gray-50 rounded-xl p-6 mb-12 border-primary-500 shadow-sm ${isRTL ? 'border-r-4' : 'border-l-4'}`}>
                <p className={`text-xl italic text-gray-700 font-medium ${isRTL ? 'font-arabic' : ''}`} itemProp="abstract">
                  {post.excerpt}
                </p>
              </div>

              {/* Prose Content */}
              <div 
                className={`prose prose-lg md:prose-xl max-w-none text-gray-800 
                  prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-bold
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                  prose-li:mb-2
                  ${isRTL ? 'prose-rtl font-arabic font-medium text-right' : ''}
                `}
                itemProp="articleBody"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <div className={`flex items-center gap-3 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`flex items-center gap-2 text-gray-600 font-medium ${isRTL ? 'ml-2' : 'mr-2'}`}>
                    <Tag size={18} /> {t('blog.tags_label')} :
                  </span>
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-16 bg-primary-50 rounded-2xl p-8 md:p-12 text-center">
                <h3 className={`text-2xl font-serif font-bold mb-4 text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>{t('blog.cta_title')}</h3>
                <p className={`text-lg text-gray-700 mb-8 max-w-xl mx-auto ${isRTL ? 'font-arabic font-medium' : ''}`}>
                  {t('blog.cta_text')}
                </p>
                <div className={`flex flex-col sm:flex-row justify-center gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                  <Link to={`/${language}/#booking`} className={`bg-primary-500 text-white px-8 py-3 rounded hover:bg-primary-600 font-bold transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                    {t('blog.cta_button')}
                  </Link>
                  <a href="https://wa.me/212661492612" target="_blank" rel="noopener noreferrer" className={`bg-white border-2 border-primary-500 text-primary-500 px-8 py-3 rounded hover:bg-primary-50 font-bold transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                    {t('blog.cta_contact')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
