import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../lib/LanguageContext';

const FAQ: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <section id="faq" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <ScrollReveal animation="fade-up" duration={800}>
          <div className={`text-center mb-10 md:mb-16 ${isRTL ? 'font-arabic' : ''}`}>
            <span className="text-primary-500 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-2 md:mb-3 block">
              {t('faq.tagline')}
            </span>
            <h2 className="text-2xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
              {t('faq.title_main')}<span className="text-primary-500">{t('faq.title_accent')}</span> ?
            </h2>
            <p className="text-gray-600 mt-4 text-sm md:text-base max-w-2xl mx-auto">
              {t('faq.desc')}
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqItems.map((num) => (
            <ScrollReveal 
              key={num} 
              animation="fade-up" 
              delay={num * 50} 
              duration={600}
            >
              <div className="bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:border-luxury-200 hover:shadow-md">
                <button
                  onClick={() => toggleItem(num)}
                  className={`w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between outline-none focus:outline-none active:outline-none rounded-none transition-colors group ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}
                  aria-expanded={openIndex === num}
                  aria-controls={`faq-answer-${num}`}
                >
                  <h3 className={`text-base md:text-lg font-serif font-semibold text-gray-900 group-hover:text-primary-600 transition-colors ${isRTL ? 'font-arabic pl-4' : 'pr-4'}`}>
                    {t(`faq.items.i${num}.q`)}
                  </h3>
                  <ChevronDown
                    size={24}
                    className={`flex-shrink-0 text-primary-500 transition-transform duration-300 ${
                      openIndex === num ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  id={`faq-answer-${num}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === num ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`px-6 md:px-8 pb-5 md:pb-6 pt-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <p className={`text-gray-600 leading-relaxed text-sm md:text-base ${isRTL ? 'font-arabic' : ''}`}>
                      {t(`faq.items.i${num}.a`)}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
