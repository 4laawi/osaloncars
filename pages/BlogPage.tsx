import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { getLocalizedBlogs } from '../data/blogs';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const BlogPage: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const localizedBlogs = getLocalizedBlogs(language);

  return (
    <div className={`font-sans text-gray-900 bg-gray-50 min-h-screen flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
      <SEO 
        title={t('seo.blog_title')}
        description={t('seo.blog_desc')}
        canonical={`https://osaloncars.ma/${language}/blog`}
      />
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-luxury-900 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/blog-hero.webp" 
              alt="Osalon" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-900/90 via-luxury-900/30 to-luxury-900/90"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <ScrollReveal animation="fade-up">
              <span className="inline-block py-1 px-3 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold tracking-widest uppercase mb-6 border border-gold-500/30">
                {t('blog.tag')}
              </span>
              <h1 className={`text-4xl md:text-6xl font-serif font-bold text-white mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                {t('blog.title')}
              </h1>
              <p className={`text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed ${isRTL ? 'font-arabic font-medium' : ''}`}>
                {t('blog.desc')}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Content Section */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isRTL ? 'md:grid-flow-row-dense' : ''}`}>
              {localizedBlogs.map((post, index) => (
                <ScrollReveal key={post.id} animation="fade-up" delay={index * 100}>
                  <article className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full ${isRTL ? 'text-right' : 'text-left'}`}>
                    <Link to={`/${language}/blog/${post.slug}`} className="block relative overflow-hidden h-64">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className={`absolute top-4 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full ${isRTL ? 'left-4' : 'right-4'}`}>
                        {post.tags[0]}
                      </div>
                    </Link>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className={`flex items-center gap-4 text-sm text-gray-500 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-MA' : language === 'en' ? 'en-US' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {post.author}
                        </span>
                      </div>
                      
                      <Link to={`/${language}/blog/${post.slug}`} className={`block group-hover:text-primary-500 transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                        <h2 className="text-xl font-bold mb-3 leading-tight">{post.title}</h2>
                      </Link>
                      
                      <p className={`text-gray-600 mb-6 flex-grow line-clamp-3 ${isRTL ? 'font-arabic font-medium' : ''}`}>
                        {post.excerpt}
                      </p>
                      
                      <Link 
                        to={`/${language}/blog/${post.slug}`}
                        className={`inline-flex items-center text-primary-500 font-bold hover:text-primary-600 transition-colors mt-auto ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
                      >
                        {t('blog.read_article')} <ArrowRight size={16} className={`mx-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                      </Link>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
