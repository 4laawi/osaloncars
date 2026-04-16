import React from 'react';
import { Car } from '../types';
import { 
  Fuel, 
  Settings, 
  Star, 
  ArrowRight, 
  Zap, 
  Crown, 
  Flame, 
  Sparkles,
  Check,
  CircleDot,
  AlertCircle,
  Package,
  Wifi,
  Baby
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../lib/LanguageContext';

interface FleetProps {
  cars: Car[];
  onSelectCar: (carId: string) => void;
  children?: React.ReactNode;
}

const Fleet: React.FC<FleetProps> = ({ cars, onSelectCar, children }) => {
  const { t, isRTL } = useLanguage();

  // Helper to get the correct icon component
  const getBadgeIcon = (iconName?: string) => {
    switch(iconName) {
      case 'Fire': return <Flame size={14} className="fill-current" />;
      case 'Crown': return <Crown size={14} className="fill-current" />;
      case 'Zap': return <Zap size={14} className="fill-current" />;
      case 'Sparkles': return <Sparkles size={14} className="fill-current" />;
      default: return <Star size={14} className="fill-current" />;
    }
  };

  const getBadgeKey = (badge: string) => {
    const map: Record<string, string> = {
      'Économique': 'economic',
      'Populaire': 'popular',
      'Confort': 'comfort',
      'Nouveau': 'new',
      'Premium': 'premium',
      'Exclusif': 'exclusive'
    };
    return map[badge] || badge.toLowerCase();
  };

  const buttonColor = '#b8860b'; // Gold-600 constant to match WhatsApp button

  return (
    <section id="fleet" className="py-12 md:py-20 bg-[#F5F5F5] relative overflow-hidden">
      {/* Background Texture (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* Curve Line SVG Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.15] mix-blend-multiply flex items-center justify-center overflow-hidden"
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)' 
        }}
      >
        <img 
          src="/Curve Line (2).svg" 
          alt="Background curve" 
          className="w-full h-full object-cover mt-12 md:mt-20"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal animation="fade-up" duration={800}>
          <div className="text-center mb-10 md:mb-20">
            <span className="text-primary-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">{t('fleet.tagline')}</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
              {t('fleet.title')}
            </h2>
            <p className="mt-4 md:mt-6 text-gray-500 max-w-2xl mx-auto font-light text-base md:text-lg">
              {t('fleet.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Dynamic Grid Layout */}
        <div id="car-list" className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-12 items-stretch">
          {cars.map((car, index) => (
            <ScrollReveal 
              key={car.id} 
              animation="fade-up" 
              delay={Math.min(index * 100, 500)} 
              duration={500}
              className="h-full"
            >
              <div 
                className={`group relative bg-white rounded-[24px] overflow-hidden border border-black/5 h-full flex flex-col transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.18)] ${!car.isAvailable ? 'opacity-80 grayscale-[0.5]' : ''} ${index % 2 !== 0 ? 'md:translate-y-12' : ''}`}
                style={{ 
                  willChange: 'transform, box-shadow'
                }}
              >
                {/* Top Accent Stripe */}
                <div 
                  className="relative z-20 h-2 w-full" 
                  style={{ backgroundColor: car.isAvailable ? car.accentColor : '#9ca3af' }}
                />

                {/* Card Background SVG */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
                  <img 
                    src={index % 2 === 0 ? "/Curve Line (2).svg" : "/Curve Line (3).svg"} 
                    alt="Card Background" 
                    className="w-full h-full object-cover scale-[1.2]"
                  />
                </div>

                {/* Image Section */}
                <div className="relative z-10 h-72 md:h-96 overflow-hidden bg-transparent shrink-0">
                  <img 
                    src={car.image} 
                    alt={`${car.make} ${car.model} - ${t('car.types.' + car.type)}`}
                    className={`w-full h-full transition-transform duration-500 ease-out ${
                      car.model === '208'
                        ? 'object-contain scale-[0.8] md:scale-[1.08] md:group-hover:scale-[1.18]'
                        : ['Sportage', 'Clio 5'].includes(car.model) 
                          ? 'object-contain scale-[0.85] md:scale-[1.15] md:group-hover:scale-[1.25]' 
                          : car.model === 'Logan'
                            ? 'object-contain scale-[0.95] md:object-cover md:scale-100 md:group-hover:scale-105'
                            : 'object-contain scale-[0.8] md:object-cover md:scale-100 md:group-hover:scale-105'
                    }`}
                    loading="lazy"
                    decoding="async"
                    style={{ willChange: 'transform' }}
                  />
                  
                  {/* Floating Badge (Only if available) */}
                  {car.isAvailable && car.badge && (
                    <div 
                      className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-lg uppercase tracking-wide flex items-center gap-2 shadow-lg"
                      style={{ backgroundColor: `${car.accentColor}ee` }}
                    >
                      {getBadgeIcon(car.badgeIcon)}
                      {t('fleet.badges.' + getBadgeKey(car.badge))}
                    </div>
                  )}

                  {/* Unavailable Overlay */}
                  {!car.isAvailable && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                         <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl border-2 border-white">
                             {t('common.out_of_stock')}
                         </div>
                    </div>
                  )}

                  {/* Rating Overlay */}
                  <div className={`absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white ${isRTL ? 'right-4 left-auto md:right-6 md:left-auto' : 'left-4 md:left-6'}`}>
                    <div className="flex items-center gap-1.5 mb-1 bg-black/50 px-3 py-1.5 rounded-full border border-white/20">
                      <Star size={14} className="fill-brand-yellow text-brand-yellow" />
                      <span className="font-bold text-base leading-none">{car.rating.toFixed(1)}</span>
                      <span className={`text-gray-200 text-xs font-normal ml-1 border-l border-white/30 pl-2 ${isRTL ? 'mr-1 border-r border-l-0 pr-2 ml-0 pl-0' : ''}`}>{car.reviewCount} {t('nav.reviews')}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`relative z-10 p-4 md:p-6 flex flex-col flex-grow ${isRTL ? 'text-right' : 'text-left'}`}>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4 md:mb-5">
                    <div className={isRTL ? 'order-last text-right' : ''}>
                      <span 
                        className="block text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] mb-1 md:mb-2 opacity-80"
                        style={{ color: car.isAvailable ? car.accentColor : '#6b7280' }}
                      >
                        {t('car.types.' + car.type)}
                      </span>
                      <h3 className="text-xl md:text-3xl font-serif text-gray-900 leading-none tracking-tight">
                        <span className="font-semibold text-gray-600 text-base md:text-xl block mb-0.5">{car.make}</span>
                        <span className="font-bold">{car.model}</span>
                      </h3>
                    </div>
                    
                    {/* Availability Pill */}
                    <div className={`flex flex-col items-end ${isRTL ? 'items-start' : 'items-end'}`}>
                      {car.isAvailable ? (
                        <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-emerald-100 shadow-sm">
                            <CircleDot size={8} className="fill-emerald-500 text-emerald-500 animate-pulse" />
                            {car.availableCount} {t('common.avail')}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-red-700 bg-red-50 px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-red-100 shadow-sm">
                            <AlertCircle size={10} className="text-red-500" />
                            {t('common.out_of_stock')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features Grid - 2 Columns */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 md:gap-y-3 md:gap-x-6 mb-4 md:mb-6 flex-grow">
                    {/* Transmission */}
                    <div className={`flex items-center gap-2 md:gap-3 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                        <Settings size={14} className="text-gray-600 md:w-4 md:h-4" />
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {car.transmission.split('/').map((transmissionType, idx) => (
                          <span 
                            key={idx}
                            className="text-xs md:text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md"
                          >
                            {t('car.transmission.' + transmissionType.trim())}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Fuel */}
                    <div className={`flex items-center gap-2 md:gap-3 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                        <Fuel size={14} className="text-gray-600 md:w-4 md:h-4" />
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {car.fuel.split('/').map((fuelType, idx) => (
                          <span 
                            key={idx}
                            className="text-xs md:text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md"
                          >
                            {t('car.fuel.' + fuelType.trim())}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Top 2 Custom Features */}
                    {car.features.slice(0, 2).map((feature, i) => (
                      <div key={i} className={`flex items-center gap-2 md:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div 
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 border border-opacity-10"
                          style={{ 
                            backgroundColor: car.isAvailable ? `${car.accentColor}10` : '#f3f4f6',
                            borderColor: car.isAvailable ? car.accentColor : '#e5e7eb' 
                            }}
                        >
                          <Check size={14} style={{ color: car.isAvailable ? car.accentColor : '#9ca3af' }} className="md:w-4 md:h-4" />
                        </div>
                        <span className="text-xs md:text-sm font-semibold text-gray-700 truncate">{t('car.features.' + feature)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Accessories Section */}
                  {car.accessories && car.accessories.length > 0 && (
                    <div className="mb-4 md:mb-5">
                      <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Package size={16} className="text-gray-500 md:w-5 md:h-5" />
                        <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">{t('fleet.features')}</span>
                      </div>
                      <div className={`flex flex-wrap gap-1.5 md:gap-2 ${isRTL ? 'justify-end' : ''}`}>
                        {car.accessories.map((accessory, idx) => {
                          // Get icon for each accessory
                          const getAccessoryIcon = () => {
                            if (accessory.toLowerCase().includes('jawaz') || accessory.toLowerCase().includes('reseau')) {
                              return <Wifi size={16} className="text-gray-600 md:w-4 md:h-4" />;
                            }
                            if (accessory.toLowerCase().includes('siège') || accessory.toLowerCase().includes('baby') || accessory.toLowerCase().includes('enfant')) {
                              return <Baby size={16} className="text-gray-600 md:w-4 md:h-4" />;
                            }
                            return null;
                          };

                          return (
                            <span 
                              key={idx}
                              className={`text-xs md:text-sm font-semibold text-gray-600 bg-luxury-50 border border-luxury-200 px-3 py-1.5 rounded-md flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                              {getAccessoryIcon()}
                              {t('car.accessories.' + accessory)}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Price & Action */}
                  <div className={`flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                    <div></div>

                    <button 
                      onClick={() => car.isAvailable && onSelectCar(car.id)}
                      disabled={!car.isAvailable}
                      className={`w-full md:flex-grow md:max-w-[200px] h-[52px] md:h-[56px] rounded-none text-white font-bold text-base tracking-wide shadow-lg flex items-center justify-center gap-3 
                        ${car.isAvailable ? 'hover:shadow-xl cursor-pointer' : 'bg-gray-400 cursor-not-allowed grayscale'}`}
                      style={{ 
                        background: car.isAvailable ? `linear-gradient(135deg, ${buttonColor}, #926605)` : undefined,
                        boxShadow: car.isAvailable ? `0 10px 25px -5px ${buttonColor}66` : undefined,
                        transition: 'box-shadow 0.3s ease-out, transform 0.3s ease-out',
                        willChange: 'transform'
                      }}
                      onMouseEnter={(e) => {
                        if (car.isAvailable) {
                          e.currentTarget.style.transform = 'scale(1.02)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {car.isAvailable ? t('fleet.reserve') : t('common.out_of_stock')}
                      {car.isAvailable && <ArrowRight size={20} className={`opacity-80 transition-transform duration-300 group-hover:translate-x-1.5 ${isRTL ? 'rotate-180 group-hover:-translate-x-1.5 translate-x-0' : ''}`} />}
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      
      {children && (
        <div className="relative z-10 mt-16 md:mt-20">
          {children}
        </div>
      )}
    </section>
  );
};

export default Fleet;