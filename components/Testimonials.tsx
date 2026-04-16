import React from 'react';
import { REVIEWS } from '../constants';
import { Star, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../lib/LanguageContext';

const Testimonials: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="reviews" className="py-16 md:py-24 bg-luxury-900 relative overflow-hidden">
      {/* Sticky Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 md:bg-fixed bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url("/bg-image.png")' }}
        ></div>
        <div className="absolute inset-0 bg-luxury-900/70"></div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal animation="fade-up" duration={800}>
          <div className={`text-center mb-10 md:mb-16 ${isRTL ? 'font-arabic' : ''}`}>
            <span className="text-primary-500 font-bold tracking-wider uppercase text-sm">{t('testimonials.tagline')}</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-2">{t('testimonials.title')}</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto mt-4"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {REVIEWS.map((review, index) => (
            <ScrollReveal key={review.id} animation="fade-up" delay={index * 150} duration={800}>
              <div className={`bg-[#1a2130] p-6 md:p-8 rounded-xl border border-white/5 relative h-full ${isRTL ? 'text-right' : 'text-left'}`}>
                <Quote className={`absolute top-6 text-white/5 ${isRTL ? 'left-6' : 'right-6'}`} size={48} />
                
                <div className={`flex gap-1 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < review.rating ? "fill-gold-500 text-gold-500" : "text-gray-700"} 
                    />
                  ))}
                </div>

                <p className={`text-gray-300 italic mb-6 leading-relaxed relative z-10 text-sm md:text-base ${isRTL ? 'font-arabic' : ''}`}>
                  "{t('testimonials.r' + review.id + '.text')}"
                </p>

                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h4 className={`font-bold text-white text-sm ${isRTL ? 'font-arabic' : ''}`}>{review.name}</h4>
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs text-gray-500">{review.date}</span>
                      {t(`testimonials.r${review.id}.is_darija`) === 'true' && (
                          <span className="text-[10px] bg-primary-500/10 text-primary-400 px-2 py-0.5 rounded-full uppercase tracking-wide border border-primary-500/10">Darija</span>
                      )}
                    </div>
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

export default Testimonials;