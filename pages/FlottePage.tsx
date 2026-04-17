import React from 'react';
import Navbar from '../components/Navbar';
import Fleet from '../components/Fleet';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { CARS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { CarFront, ShieldCheck, CheckCircle2, Phone, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../lib/LanguageContext';
import WaveDivider from '../components/WaveDivider';

const FlottePage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language, isRTL } = useLanguage();
  
  const handleCarSelection = (carId: string) => {
    navigate(`/${language}/#booking`);
    setTimeout(() => {
      const element = document.getElementById('booking');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const categories = [
    {
      icon: <CarFront size={40} />,
      key: "cat_citadine",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <ShieldCheck size={40} />,
      key: "cat_suv",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <CheckCircle2 size={40} />,
      key: "cat_berline",
      color: "bg-emerald-50 text-emerald-600"
    }
  ];

  const benefits = ["b1", "b2", "b3"];

  return (
    <div className={`font-sans text-gray-900 bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
      <SEO 
        title={t('seo.fleet_title')}
        description={t('seo.fleet_desc')}
        canonical={`https://osalon-cars.ma/${language}/flotte`}
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-luxury-900 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/aeroprt-herp.png"
              alt="Osalon Flotte"
              className="w-full h-full object-cover opacity-40" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-900/60 via-transparent to-luxury-900"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal animation="fade-up">
              <div className={`max-w-4xl ${isRTL ? 'mr-auto' : ''}`}>
                <span className="inline-block py-1 px-3 rounded-full bg-primary-500/20 text-primary-100 text-xs font-bold tracking-widest uppercase mb-6 border border-primary-500/30">
                  {t('flotte_page.hero_tag')}
                </span>
                <h1 className={`text-4xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight ${isRTL ? 'font-arabic' : ''}`}>
                  {t('flotte_page.hero_title')} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                    {t('flotte_page.hero_subtitle')}
                  </span>
                </h1>
                <p className={`text-gray-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                  {t('flotte_page.hero_desc')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Fleet Grid */}
        <Fleet cars={CARS} onSelectCar={handleCarSelection} />

        {/* Categories */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-16">
                <h2 className={`text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 ${isRTL ? 'font-arabic' : ''}`}>{t('flotte_page.categories_title')}</h2>
                <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
              </div>
            </ScrollReveal>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
              {categories.map((item, i) => (
                <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                  <div className={`p-8 rounded-3xl border border-gray-100 bg-luxury-50 hover:bg-white hover:shadow-2xl hover:border-transparent transition-all duration-300 h-full group ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${isRTL ? 'mr-auto ml-0' : ''}`}>
                      {item.icon}
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 ${isRTL ? 'font-arabic' : ''}`}>{t(`flotte_page.${item.key}.title`)}</h3>
                    <p className={`text-gray-500 mb-6 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>{t(`flotte_page.${item.key}.desc`)}</p>
                    <div className="pt-6 border-t border-gray-200">
                      <span className={`text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2 ${isRTL ? 'font-arabic' : ''}`}>Modèles Disponibles</span>
                      <p className={`font-semibold text-gray-900 ${isRTL ? 'font-arabic font-medium' : ''}`}>{t(`flotte_page.${item.key}.models`)}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Experience / Benefits */}
        <section className="py-24 bg-luxury-900 text-white overflow-hidden relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className={`flex flex-col lg:flex-row items-center gap-16 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2">
                <ScrollReveal animation={isRTL ? "fade-left" : "fade-right"}>
                  <h2 className={`text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight ${isRTL ? 'font-arabic' : ''}`}>
                    {t('flotte_page.experience_title')}<br/>
                    <span className="text-gold-500">{t('flotte_page.experience_accent')}</span>
                  </h2>
                  <div className="space-y-8">
                    {benefits.map((bKey, i) => (
                      <div key={i} className={`flex gap-6 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-500">
                          <CheckCircle2 size={24} />
                        </div>
                        <div>
                          <h4 className={`text-xl font-bold mb-2 text-white ${isRTL ? 'font-arabic' : ''}`}>{t(`flotte_page.benefits.${bKey}.title`)}</h4>
                          <p className={`text-gray-400 leading-relaxed font-light ${isRTL ? 'font-arabic' : ''}`}>{t(`flotte_page.benefits.${bKey}.text`)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
              <div className="lg:w-1/2 relative">
                <ScrollReveal animation={isRTL ? "fade-right" : "fade-left"}>
                  <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white/5">
                    <img 
                      src="/sportage-kia.png" 
                      alt="Osalon Flotte Premium" 
                      className={`w-full h-auto scale-[0.85] rotate-3 ${isRTL ? '-translate-x-4' : 'translate-x-4'}`}
                    />
                  </div>
                  <div className={`absolute -bottom-8 bg-white p-8 rounded-3xl shadow-2xl z-20 hidden md:block ${isRTL ? '-right-8' : '-left-8'}`}>
                    <div className="text-4xl font-bold text-primary-500 mb-1">100%</div>
                    <div className={`text-gray-500 font-bold uppercase tracking-widest text-xs ${isRTL ? 'font-arabic' : ''}`}>{t('flotte_page.stats_label')}</div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Wave Divider */}
        <WaveDivider 
          bottomColor="#851518" 
          isRTL={isRTL}
          className="-mt-6 md:-mt-10"
        />

        {/* Final CTA */}
        <section className="pt-16 pb-16 md:pt-24 md:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-500"></div>
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
             <ScrollReveal animation="scale-up">
                <h2 className={`text-4xl md:text-6xl font-serif font-bold mb-8 ${isRTL ? 'font-arabic' : ''}`}>{t('common.ready_to_road')}</h2>
                <p className={`text-xl md:text-2xl mb-12 opacity-90 font-light max-w-2xl mx-auto ${isRTL ? 'font-arabic font-medium' : ''}`}>
                  {t('common.cta_desc')}
                </p>
                <div className={`flex flex-col sm:flex-row justify-center gap-6 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                   <a 
                    href="https://wa.me/212661492612" 
                    className="group bg-white text-primary-500 px-10 py-5 rounded-none font-bold text-lg hover:bg-gold-500 hover:text-white transition-all flex items-center justify-center gap-3 shadow-2xl"
                   >
                     <Phone size={22} className="animate-pulse" />
                     {t('common.contact_whatsapp')}
                   </a>
                   <button 
                    onClick={() => navigate(`/${language}/#booking`)}
                    className="group bg-luxury-900 border border-white/20 text-white px-10 py-5 rounded-none font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-3 shadow-2xl"
                    style={{ backgroundColor: '#2C7873' }}
                   >
                     {t('booking.online_booking')}
                     <ArrowRight size={22} className={`group-hover:translate-x-2 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                   </button>
                </div>
             </ScrollReveal>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FlottePage;
