import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { LanguageProvider } from './lib/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Fleet from './components/Fleet';
import BookingForm from './components/BookingForm';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { Car } from './types';
import { CARS } from './constants';
import { Phone, ArrowRight } from 'lucide-react';
import FlottePage from './pages/FlottePage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ScrollToTop from './components/ScrollToTop';
import ScrollReveal from './components/ScrollReveal';
import SEO from './components/SEO';
import { useLanguage } from './lib/LanguageContext';
import { Language } from './lib/translations';
import WaveDivider from './components/WaveDivider';

// Helper component to sync language from URL
const LanguageSync: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (lang && (lang === 'en' || lang === 'fr' || lang === 'ar')) {
      if (lang !== language) {
        setLanguage(lang as Language);
      }
    }
  }, [lang, language, setLanguage]);

  return null;
};

// Public Home Page Component
const HomePage: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleCarSelection = (carId: string) => {
    setSelectedCarId(carId);
  };

  useEffect(() => {
    // Initialize cars from static constants
    setCars(CARS);
    setIsLoading(false);
  }, []);

  // Remove initial loader when React is ready
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      // Remove loader immediately when React hydrates
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 300);
    }
  }, []);

  return (
    <div className={`font-sans text-gray-900 bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
      <SEO 
        title={t('seo.home_title')}
        description={t('seo.home_desc')}
        canonical={`https://osalon-cars.ma/${language}`}
      />
      <Navbar />
      <main>
        <Hero />
        {isLoading ? (
          <div className="min-h-[400px] flex items-center justify-center">
              <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-bold">{error}</div>
        ) : (
          <>
              <Fleet cars={cars} onSelectCar={handleCarSelection}>
                  <BookingForm cars={cars} selectedCarId={selectedCarId} />
              </Fleet>
          </>
        )}
        <WhyChooseUs />

        <Testimonials />
        <FAQ />

        {/* Wave Divider */}
        <WaveDivider 
          bottomColor="#851518" 
          isRTL={isRTL}
          className="-mt-6 md:-mt-10"
        />

        {/* Final CTA */}
        <section className="pt-16 pb-16 md:pt-24 md:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-500"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
             <ScrollReveal animation="scale-up">
                <h2 className={`text-4xl md:text-6xl font-serif font-bold mb-8 ${isRTL ? 'font-arabic' : ''}`}>{t('common.ready_to_road')}</h2>
                <p className={`text-xl md:text-2xl mb-12 opacity-90 font-light max-w-2xl mx-auto ${isRTL ? 'font-arabic font-medium' : ''}`}>
                  {t('common.cta_desc')}
                </p>
                <div className={`flex flex-col sm:flex-row justify-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                   <a 
                    href="https://wa.me/212661492612" 
                    className="group bg-white text-primary-500 px-10 py-5 rounded-none font-bold text-lg hover:bg-gold-500 hover:text-white transition-all flex items-center justify-center gap-3 shadow-2xl"
                   >
                     <Phone size={22} className="animate-pulse" />
                     {t('common.contact_whatsapp')}
                   </a>
                   <a 
                    href={`/${language}/#booking`}
                    className={`group bg-luxury-900 border border-white/20 text-white px-10 py-5 rounded-none font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-3 shadow-2xl ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
                    style={{ backgroundColor: '#2C7873' }}
                   >
                     {t('booking.online_booking')}
                     <ArrowRight size={22} className={`transition-transform ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-2' : 'ml-2 group-hover:translate-x-2'}`} />
                   </a>
                </div>
             </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />

      {/* Floating WhatsApp Action Button (Mobile/Desktop) */}
      <a 
        href="https://wa.me/212661492612"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 z-50 animate-bounce-slow"
        aria-label={t('common.contact_whatsapp')}
      >
        <Phone size={24} />
      </a>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ScrollToTop />
        <Routes>
          {/* Support for /fr, /en, /ar prefixes */}
          <Route path="/:lang/*" element={
            <>
              <LanguageSync />
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="flotte" element={<FlottePage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<BlogPostPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </>
          } />
          
          {/* Default redirect to French */}
          <Route path="/" element={<Navigate to="/fr" replace />} />
          <Route path="*" element={<Navigate to="/fr" replace />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;