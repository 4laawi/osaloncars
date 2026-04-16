import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext';

const Hero: React.FC = () => {
  const { language, t, isRTL } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fix mobile viewport height issue - prevent hero from resizing on scroll
  useEffect(() => {
    if (!isMobile) return;

    // Lock viewport height to prevent resize on scroll (iOS Safari address bar issue)
    let lastWidth = window.innerWidth;
    const setViewportHeight = (e?: Event) => {
      if (!e || window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, [isMobile]);

  useEffect(() => {
    // Completely disable parallax effects on mobile for better performance and to prevent scroll issues
    if (isMobile) {
      // On mobile, ensure content stays visible and no transforms are applied
      if (contentRef.current) {
        contentRef.current.style.opacity = '1';
        contentRef.current.style.transform = 'none';
        contentRef.current.style.WebkitTransform = 'none';
      }
      return;
    }

    let ticking = false;
    let rafId: number | null = null;
    let lastScrollY = 0;
    const throttleDelay = 16; // ~60fps
    let lastUpdateTime = 0;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const currentTime = performance.now();

      // Throttle updates to prevent excessive calculations
      if (currentTime - lastUpdateTime < throttleDelay && Math.abs(scrollY - lastScrollY) < 5) {
        ticking = false;
        return;
      }

      lastScrollY = scrollY;
      lastUpdateTime = currentTime;

      // Only update content fade
      if (scrollY <= windowHeight * 1.5) {
        if (contentRef.current) {
          // Only fade out content, no movement for smoother performance
          const opacity = 1 - Math.min(1, scrollY / (windowHeight * 0.5));
          contentRef.current.style.opacity = `${opacity}`;
          // Ensure no transforms are applied
          contentRef.current.style.transform = 'translateZ(0)';
          contentRef.current.style.WebkitTransform = 'translateZ(0)';
        }
      } else {
        // Reset when hero is out of view
        if (contentRef.current) {
          contentRef.current.style.opacity = '0';
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set initial state
    updateParallax();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isMobile]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed navbar (approx 80px)
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      // Use instant scroll on mobile to prevent conflicts with momentum scrolling
      window.scrollTo({
        top: offsetPosition,
        behavior: isMobile ? 'auto' : 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className={`relative w-full flex items-center justify-start overflow-hidden bg-black ${isMobile ? '' : 'min-h-[85dvh]'}`}
      style={isMobile ? { minHeight: 'calc(var(--vh, 1vh) * 85)' } : {}}
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <img 
          src="/osalon-hero.webp"
          alt={t('nav.logo_alt')}
          className="w-full h-full object-cover opacity-90"
          style={{ 
            backgroundColor: '#000000',
            pointerEvents: 'none',
            objectFit: 'cover',
            objectPosition: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          loading="eager"
          decoding="async"
        />
        {/* Dark overlay for text readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"
          style={{ zIndex: 3 }}
        ></div>
      </div>

      {/* Content */}
      <header 
        ref={contentRef}
        className={`relative z-10 flex flex-col items-start ${isRTL ? 'text-right' : 'text-left'} px-6 md:px-12 lg:px-20 w-full mt-8 md:mt-0 opacity-100`}
        style={{
          willChange: isMobile ? 'auto' : 'opacity',
          transform: isMobile ? 'none' : 'translateZ(0)',
          WebkitTransform: isMobile ? 'none' : 'translateZ(0)',
        }}
      >
        <div className="flex items-center gap-4 mb-4 md:mb-6 animate-fade-in">
          <div className="w-12 md:w-16 h-[1px] bg-gold-500/80"></div>
          <p className="text-gold-400 font-medium tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-sm uppercase">
            {t('hero.welcome')}
          </p>
        </div>

        <h1 
          className={`text-3xl sm:text-4xl md:text-7xl lg:text-[100px] text-white font-serif font-bold mb-4 md:mb-8 leading-[1.05] tracking-tight ${isRTL ? 'font-arabic' : ''}`}
          style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.4)' }}
        >
          {isRTL ? (
            <>
              {t('hero.title')} <br />
              <span className="text-gold-500 italic">{t('hero.city')}</span>
            </>
          ) : (
            <>
              {t('hero.title')} <br />
              <span className="text-gold-500 italic">{t('hero.city')}</span>
            </>
          )}
        </h1>

        <p 
          className="text-gray-100 text-sm sm:text-base md:text-2xl mb-6 md:mb-12 max-w-2xl font-light leading-relaxed"
          style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}
        >
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-start justify-start gap-4 md:gap-6 w-full">
          <a 
            href="#booking"
            onClick={(e) => scrollToSection(e, 'booking')}
            className="w-full sm:w-auto bg-gold-600 hover:bg-gold-700 text-white px-6 md:px-10 py-3.5 md:py-4 rounded-none text-base md:text-lg font-semibold transition-all shadow-[0_10px_30px_-10px_rgba(184,134,11,0.5)] hover:shadow-[0_15px_35px_-5px_rgba(184,134,11,0.6)] hover:-translate-y-1 cursor-pointer text-center uppercase tracking-wider"
          >
            {t('hero.cta_primary')}
          </a>
          <Link 
            to={`/${language}/flotte`}
            className="w-full sm:w-auto bg-transparent border border-white/40 text-white hover:border-white hover:bg-white/10 px-6 md:px-10 py-3.5 md:py-4 rounded-none text-base md:text-lg font-medium transition-all backdrop-blur-sm min-w-[180px] md:min-w-[200px] cursor-pointer text-center uppercase tracking-wider hover:-translate-y-1"
          >
            {t('hero.cta_secondary')}
          </Link>
        </div>
      </header>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 md:bottom-20 left-1/2 transform -translate-x-1/2 z-10 animate-bounce hidden sm:block">
        <a 
          href="#fleet" 
          onClick={(e) => scrollToSection(e, 'fleet')}
          className="text-white opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronDown size={32} />
        </a>
      </div>

      {/* SVG Circular Divider (Subtle) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[20px] md:h-[40px]"
        >
          <path d="M0 0 C 400 60 800 60 1200 0 L 1200 120 L 0 120 Z" className="fill-[#F5F5F5]"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;