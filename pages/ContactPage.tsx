import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../lib/LanguageContext';

const ContactPage: React.FC = () => {
  const { t, language, isRTL } = useLanguage();

  return (
    <div className={`font-sans text-gray-900 bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
      <SEO 
        title={t('seo.contact_title')}
        description={t('seo.contact_desc')}
        canonical={`https://osaloncars.ma/${language}/contact`}
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-luxury-900 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero-contact.webp" 
              alt="Contact Osalon Car Rental" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-900/90 via-luxury-900/20 to-luxury-900/90"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal animation="fade-up">
              <span className="inline-block py-1 px-3 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold tracking-widest uppercase mb-6 border border-gold-500/30">
                {t('contact_page.hero_tag')}
              </span>
              <h1 className={`text-4xl md:text-6xl font-serif font-bold text-white mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                {t('contact_page.hero_title')}
              </h1>
              <p className={`text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light ${isRTL ? 'font-arabic font-medium' : ''}`}>
                {t('contact_page.hero_desc')}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className={`grid md:grid-cols-2 gap-16 ${isRTL ? 'md:grid-flow-col-reverse' : ''}`}>
              
              {/* Info Column */}
              <div className={isRTL ? 'order-2' : 'order-1'}>
                <ScrollReveal animation={isRTL ? "fade-left" : "fade-right"}>
                  <h2 className={`text-3xl font-serif font-bold mb-8 ${isRTL ? 'font-arabic' : ''}`}>{t('contact_page.info_title')}</h2>
                  <p className={`text-gray-600 mb-10 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                    {t('contact_page.info_desc')}
                  </p>
                  
                  <div className="space-y-8">
                    <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <h4 className={`font-bold text-lg mb-1 ${isRTL ? 'font-arabic' : ''}`}>{t('contact_page.label_address')}</h4>
                        <p className={`text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>{t('common.location')}</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 shrink-0">
                        <Phone size={24} />
                      </div>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <h4 className={`font-bold text-lg mb-1 ${isRTL ? 'font-arabic' : ''}`}>{t('contact_page.label_phone')}</h4>
                        <a href="https://wa.me/212661492612" dir="ltr" className="text-gold-600 hover:text-gold-700 font-medium">
                          +212 661-492612
                        </a>
                      </div>
                    </div>
                    
                    <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 shrink-0">
                        <Mail size={24} />
                      </div>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <h4 className={`font-bold text-lg mb-1 ${isRTL ? 'font-arabic' : ''}`}>{t('contact_page.label_email')}</h4>
                        <a href="mailto:contact@osaloncars.ma" className="text-gray-600 hover:text-gold-600 transition-colors">
                          contact@osaloncars.ma
                        </a>
                      </div>
                    </div>

                    <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 shrink-0">
                        <Clock size={24} />
                      </div>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <h4 className={`font-bold text-lg mb-1 ${isRTL ? 'font-arabic' : ''}`}>{t('contact_page.label_hours')}</h4>
                        <p className={`text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>{t('common.hours')}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Form Column */}
              <div className={`bg-luxury-50 p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-xl ${isRTL ? 'order-1' : 'order-2'}`}>
                <ScrollReveal animation={isRTL ? "fade-right" : "fade-left"}>
                  <h3 className={`text-2xl font-serif font-bold mb-6 ${isRTL ? 'font-arabic' : ''}`}>{t('contact_page.form_title')}</h3>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className={`space-y-2 ${isRTL ? 'text-right' : ''}`}>
                        <label className={`text-sm font-bold text-gray-700 ${isRTL ? 'font-arabic' : ''}`}>{t('contact_page.form_name_label')}</label>
                        <input 
                          type="text" 
                          placeholder={t('contact_page.form_name_placeholder')}
                          className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 bg-white ${isRTL ? 'text-right font-arabic' : ''}`}
                        />
                      </div>
                      <div className={`space-y-2 ${isRTL ? 'text-right' : ''}`}>
                        <label className={`text-sm font-bold text-gray-700 ${isRTL ? 'font-arabic' : ''}`}>{t('contact_page.form_phone_label')}</label>
                        <input 
                          type="tel" 
                          placeholder={t('contact_page.form_phone_placeholder')}
                          className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 bg-white ${isRTL ? 'text-right font-arabic' : ''}`}
                        />
                      </div>
                    </div>
                    
                    <div className={`space-y-2 ${isRTL ? 'text-right' : ''}`}>
                      <label className={`text-sm font-bold text-gray-700 ${isRTL ? 'font-arabic' : ''}`}>{t('contact_page.form_email_label')}</label>
                      <input 
                        type="email" 
                        placeholder={t('contact_page.form_email_placeholder')}
                        className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 bg-white ${isRTL ? 'text-right font-arabic' : ''}`}
                      />
                    </div>
                    
                    <div className={`space-y-2 ${isRTL ? 'text-right' : ''}`}>
                      <label className={`text-sm font-bold text-gray-700 ${isRTL ? 'font-arabic' : ''}`}>{t('contact_page.form_msg_label')}</label>
                      <textarea 
                        rows={4}
                        placeholder={t('contact_page.form_msg_placeholder')}
                        className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 bg-white resize-none ${isRTL ? 'text-right font-arabic' : ''}`}
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit"
                      className={`w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
                    >
                      <span>{t('contact_page.form_submit')}</span>
                      <Send size={18} className={isRTL ? 'rotate-180' : ''} />
                    </button>
                    <p className={`text-center text-sm text-gray-500 mt-4 ${isRTL ? 'font-arabic' : ''}`}>
                      {t('contact_page.form_footer')}
                    </p>
                  </form>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
