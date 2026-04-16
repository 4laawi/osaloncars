import React from 'react';
import { Wallet, Car, Headphones, Plane, ShieldCheck, Eye } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../lib/LanguageContext';

const WhyChooseUs: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: <Wallet size={28} />,
      key: "flexibility"
    },
    {
      icon: <Car size={28} />,
      key: "recent"
    },
    {
      icon: <Headphones size={28} />,
      key: "support"
    },
    {
      icon: <Plane size={28} />,
      key: "airport"
    },
    {
      icon: <ShieldCheck size={28} />,
      key: "insurance"
    },
    {
      icon: <Eye size={28} />,
      key: "transparency"
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Background SVG with Low Opacity */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: 'url("/Wave.svg")' }}
      ></div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal animation="fade-up" duration={800}>
          <div className={`text-center mb-8 md:mb-20 ${isRTL ? 'font-arabic' : ''}`}>
            <span className="text-primary-500 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-2 md:mb-3 block">
              {t('why_choose_us.tagline')}
            </span>
            <h2 className={`text-2xl md:text-5xl font-serif font-bold text-gray-900 leading-tight ${isRTL ? 'font-arabic' : ''}`}>
              {t('why_choose_us.title_main')} <span className="text-primary-500">{t('why_choose_us.title_brand')}</span> {t('why_choose_us.title_suffix')}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {features.map((feature, index) => (
            <ScrollReveal 
              key={index} 
              animation="fade-up" 
              delay={index * 100} 
              duration={600}
            >
              <div 
                className={`group h-full p-3 md:p-8 rounded-xl md:rounded-[2rem] bg-gold-50/50 border border-gold-100/50 hover:border-gold-300 hover:bg-white transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.2)] relative overflow-hidden text-center md:text-left ${isRTL ? 'md:text-right' : ''}`}
              >
                {/* Hover Glow Effect (Desktop Only) */}
                <div className="hidden md:block absolute -right-10 -top-10 w-32 h-32 bg-gold-400/20 rounded-full blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>

                <div className={`relative z-10 flex flex-col items-center ${isRTL ? 'md:items-end' : 'md:items-start'}`}>
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white border border-gold-100 shadow-sm flex items-center justify-center text-primary-500 mb-3 md:mb-6 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white group-hover:border-gold-500 transition-all duration-300">
                      {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 20, className: "md:w-7 md:h-7" })}
                  </div>
                  
                  <h3 className={`text-sm md:text-xl font-serif font-bold text-gray-900 mb-1.5 md:mb-3 group-hover:text-primary-600 transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                    {t(`why_choose_us.features.${feature.key}.title`)}
                  </h3>
                  
                  <p className={`text-gray-500 leading-tight md:leading-relaxed text-[10px] md:text-sm group-hover:text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
                    {t(`why_choose_us.features.${feature.key}.desc`)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;