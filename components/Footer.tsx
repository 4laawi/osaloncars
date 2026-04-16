import React from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext';

const Footer: React.FC = () => {
  const { t, language, isRTL } = useLanguage();

  return (
    <footer id="contact" className={`bg-gray-900 text-white pt-12 md:pt-20 pb-10 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="container mx-auto px-6">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16 items-start ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Brand */}
          <div className={`text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
            <div className="mb-4">
              <Link to={`/${language}`}>
                <img 
                  src="/logo-osalon.pdf.png" 
                  alt={t('nav.logo_alt')} 
                  className={`h-12 w-auto object-contain ${isRTL ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}
                />
              </Link>
            </div>
            <p className={`text-gray-400 text-sm leading-relaxed mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.about_text')}
            </p>
            <div className={`flex gap-4 justify-center ${isRTL ? 'md:justify-end' : 'md:justify-start'}`}>
              <a 
                href="https://www.instagram.com/osalon_cars/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/osalon_cars/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
            <h4 className={`text-lg font-bold mb-4 text-brand-yellow ${isRTL ? 'font-arabic' : ''}`}>{t('footer.links')}</h4>
            <ul className={`space-y-3 text-sm text-gray-400 ${isRTL ? 'font-arabic font-medium' : ''}`}>
              <li><Link to={`/${language}`} className="hover:text-white transition-colors">{t('nav.home')}</Link></li>
              <li><Link to={`/${language}/flotte`} className="hover:text-white transition-colors">{t('nav.fleet')}</Link></li>
              <li><Link to={`/${language}/blog`} className="hover:text-white transition-colors">{t('nav.blog')}</Link></li>
              <li><a href={`/${language}/#booking`} className="hover:text-white transition-colors">{t('nav.whatsapp')}</a></li>
              <li><a href={`/${language}/#reviews`} className="hover:text-white transition-colors">{t('nav.reviews')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={`text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
            <h4 className={`text-lg font-bold mb-4 text-brand-yellow ${isRTL ? 'font-arabic' : ''}`}>{t('footer.contact')}</h4>
            <ul className={`space-y-3 text-sm text-gray-400 ${isRTL ? 'font-arabic font-medium' : ''}`}>
              <li className={`flex items-start gap-3 justify-center ${isRTL ? 'md:justify-start flex-row-reverse' : 'md:justify-start'}`}>
                <MapPin size={18} className="text-brand-yellow mt-0.5 shrink-0" />
                <span className={isRTL ? 'text-right' : ''}>{t('common.location')}</span>
              </li>
              <li className={`flex items-center gap-3 justify-center ${isRTL ? 'md:justify-start flex-row-reverse' : 'md:justify-start'}`}>
                <Phone size={18} className="text-brand-yellow shrink-0" />
                <span dir="ltr">+212 661492612</span>
              </li>
              <li className={`flex items-center gap-3 justify-center ${isRTL ? 'md:justify-start flex-row-reverse' : 'md:justify-start'}`}>
                <Mail size={18} className="text-brand-yellow shrink-0" />
                <span className={isRTL ? 'text-right' : ''}>contact@osaloncars.ma</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500">
          <p className={isRTL ? 'font-arabic' : ''}>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
          <div className={`mt-2 flex items-center justify-center gap-1 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
             <span>Site web créé par</span>
             <a 
              href="https://www.sitepro.ma" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-brand-yellow transition-colors underline"
             >
                sitepro.ma
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;