import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { Language } from '../lib/translations';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'Français', flag: 'FR' },
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'ar', label: 'العربية', flag: 'AR' },
  ];

  const handleLanguageChange = (newLang: Language) => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0 && (pathParts[0] === 'fr' || pathParts[0] === 'en' || pathParts[0] === 'ar')) {
      pathParts[0] = newLang;
    } else {
      pathParts.unshift(newLang);
    }
    navigate('/' + pathParts.join('/') + location.hash + location.search);
    setIsLangOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;

    const updateNavbar = () => {
      setIsScrolled(window.scrollY > 50);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      document.body.style.overflow = 'unset';
    };
  }, []);

  const navClass = `fixed w-full z-[100] transition-all duration-300 ${
    isScrolled || isMobileMenuOpen ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
  }`;

  const textClass = isScrolled || isMobileMenuOpen ? 'text-gray-900' : 'text-gray-900 lg:text-white';

  const scrollToSection = (id: string) => {
    const idToScroll = id.replace('#', '');
    const element = document.getElementById(idToScroll);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/${language}/${id}`;
    }
  };

  return (
    <nav className={navClass}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
            <Link to={`/${language}`} className="block" onClick={() => setIsMobileMenuOpen(false)}>
                {isScrolled || isMobileMenuOpen ? (
                    <div 
                        className="h-12 md:h-14 lg:h-16 aspect-[160/64] bg-gold-600 transition-all duration-300"
                        style={{
                          WebkitMaskImage: `url(/logo-dark.png)`,
                          WebkitMaskSize: 'contain',
                          WebkitMaskRepeat: 'no-repeat',
                          WebkitMaskPosition: 'center',
                          maskImage: `url(/logo-dark.png)`,
                          maskSize: 'contain',
                          maskRepeat: 'no-repeat',
                          maskPosition: 'center',
                        }}
                        aria-label={t('nav.logo_alt')}
                        role="img"
                    />
                ) : (
                    <img 
                        src="/logo-osalon.pdf.png" 
                        alt={t('nav.logo_alt')} 
                        className="h-12 md:h-16 w-auto object-contain transition-all duration-300"
                        // @ts-ignore - Fetch priority is a valid standard attribute but React types might lag
                        fetchPriority="high"
                        loading="eager"
                        width="160"
                        height="64"
                    />
                )}
            </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to={`/${language}`} className={`${textClass} hover:text-gold-500 font-medium transition-colors`}>{t('nav.home')}</Link>
          <Link to={`/${language}/flotte`} className={`${textClass} hover:text-gold-500 font-medium transition-colors`}>{t('nav.fleet')}</Link>
          <Link to={`/${language}/contact`} className={`${textClass} hover:text-gold-500 font-medium transition-colors`}>{t('nav.contact')}</Link>
          <Link to={`/${language}/blog`} className={`${textClass} hover:text-gold-500 font-medium transition-colors`}>{t('nav.blog')}</Link>
          <a href="#reviews" onClick={(e) => { e.preventDefault(); scrollToSection('#reviews'); }} className={`${textClass} hover:text-gold-500 font-medium transition-colors`}>{t('nav.reviews')}</a>
          
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-1 ${textClass} hover:text-gold-500 font-medium transition-colors`}
            >
              <Globe size={18} />
              <span className="uppercase">{language}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLangOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsLangOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-none shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-20">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-6 py-4 text-left text-sm hover:bg-gold-50 transition-colors flex items-center justify-between ${
                        language === lang.code ? 'text-gold-600 font-bold bg-gold-50/50' : 'text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {lang.label}
                      </span>
                      {language === lang.code && <div className="w-2 h-2 rounded-full bg-gold-600"></div>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <a 
            href="https://wa.me/212661492612" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gold-600 text-white px-6 py-3 rounded-none hover:bg-gold-700 transition-all duration-300 shadow-lg hover:shadow-gold-600/30"
          >
            <Phone size={18} />
            <span className="font-semibold">{t('nav.whatsapp')}</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-gold-600 p-2 transition-transform active:scale-95"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-x-0 bottom-0 top-20 bg-white transition-all duration-500 overflow-y-auto ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full bg-white">
          <div className="flex flex-col gap-1 py-8 px-8">
            <Link 
              to={`/${language}`} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-gray-900 hover:text-gold-600 text-2xl font-serif font-bold py-3 border-b border-gray-50 flex justify-between items-center group"
            >
              {t('nav.home')}
              <ChevronDown size={20} className="-rotate-90 text-gray-300 group-hover:text-gold-600 transition-colors" />
            </Link>
            <Link 
              to={`/${language}/flotte`} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-gray-900 hover:text-gold-600 text-2xl font-serif font-bold py-3 border-b border-gray-50 flex justify-between items-center group"
            >
              {t('nav.fleet')}
              <ChevronDown size={20} className="-rotate-90 text-gray-300 group-hover:text-gold-600 transition-colors" />
            </Link>
            <Link 
              to={`/${language}/contact`} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-gray-900 hover:text-gold-600 text-2xl font-serif font-bold py-3 border-b border-gray-50 flex justify-between items-center group"
            >
              {t('nav.contact')}
              <ChevronDown size={20} className="-rotate-90 text-gray-300 group-hover:text-gold-600 transition-colors" />
            </Link>
            <Link 
              to={`/${language}/blog`} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-gray-900 hover:text-gold-600 text-2xl font-serif font-bold py-3 border-b border-gray-50 flex justify-between items-center group"
            >
              {t('nav.blog')}
              <ChevronDown size={20} className="-rotate-90 text-gray-300 group-hover:text-gold-600 transition-colors" />
            </Link>
            <a 
              href="#reviews" 
              onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); scrollToSection('#reviews'); }} 
              className="text-gray-900 hover:text-gold-600 text-2xl font-serif font-bold py-3 border-b border-gray-50 flex justify-between items-center group"
            >
              {t('nav.reviews')}
              <ChevronDown size={20} className="-rotate-90 text-gray-300 group-hover:text-gold-600 transition-colors" />
            </a>
          </div>
          
          <div className="mt-auto bg-gray-50/50 p-8 border-t border-gray-100">
            <div className="mb-8">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-bold">{t('nav.language') || 'Langue / Language'}</p>
              <div className="grid grid-cols-1 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-5 py-4 rounded-none text-base font-medium transition-all ${
                      language === lang.code 
                        ? 'bg-white border border-gold-200 text-gold-600 shadow-sm' 
                        : 'bg-transparent text-gray-600 hover:bg-white border border-transparent'
                    }`}
                  >
                    <span>{lang.label}</span>
                    {language === lang.code && <div className="w-2 h-2 rounded-full bg-gold-600"></div>}
                  </button>
                ))}
              </div>
            </div>

            <a 
              href="https://wa.me/212661492612"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-gold-600 text-white px-6 py-5 rounded-none shadow-xl shadow-gold-600/20 active:scale-95 transition-transform"
            >
              <Phone size={20} />
              <span className="font-bold text-lg uppercase tracking-tight">{t('nav.whatsapp')}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;