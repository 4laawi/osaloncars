import React, { useState, useEffect } from 'react';
import { Car } from '../types';
import { Send, Calendar, MapPin, User, Car as CarIcon, Clock, Calculator, AlertCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../lib/LanguageContext';

interface BookingFormProps {
  cars: Car[];
  selectedCarId: string | null;
}

const DELIVERY_CITIES = [
  "Rabat-Sale Airport",
  "Sala Al Jadida",
  "Tangier",
  "Marrakech",
  "Fes",
  "Agadir"
];

const BookingForm: React.FC<BookingFormProps> = ({ cars, selectedCarId }) => {
  const { t, language, isRTL } = useLanguage();

  // Helper to get date string YYYY-MM-DD in local time
  const getToday = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carId: selectedCarId || '',
    pickupDate: getToday(),
    dropoffDate: getTomorrow(),
    delivery: 'Sala Al Jadida'
  });

  const [days, setDays] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Update form when prop changes
  useEffect(() => {
    if (selectedCarId) {
      setFormData(prev => ({ ...prev, carId: selectedCarId }));
      const element = document.getElementById('booking');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedCarId]);

  // Recalculate days and totals
  useEffect(() => {
    // Parse "YYYY-MM-DD" safely as local dates
    const parseLocal = (dateStr: string) => {
        if (!dateStr) return new Date(NaN);
        const [y, m, d] = dateStr.split('-').map(Number);
        return new Date(y, m - 1, d);
    };

    const start = parseLocal(formData.pickupDate);
    const end = parseLocal(formData.dropoffDate);
    const selectedCar = cars.find(c => c.id === formData.carId);

    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setIsValid(false);
      return;
    }

    const today = new Date();
    today.setHours(0,0,0,0);
    
    // Check if start date is in past (allow today)
    if (start < today) {
        setErrorMessage(t('booking.error_past_date'));
        setIsValid(false);
        return;
    }

    if (end <= start) {
      setErrorMessage(t('booking.error_return_date'));
      setIsValid(false);
      setDays(0);
      setTotalPrice(0);
      return;
    }

    setErrorMessage('');
    setIsValid(true);

    // Calculate diff
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 
    setDays(diffDays);

    if (selectedCar) {
      const price = selectedCar.promoPrice && selectedCar.promoPrice < selectedCar.pricePerDay 
        ? selectedCar.promoPrice 
        : selectedCar.pricePerDay;
      setTotalPrice(diffDays * price);
    } else {
      setTotalPrice(0);
    }

  }, [formData.pickupDate, formData.dropoffDate, formData.carId, cars, t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getSelectedCar = (): Car | undefined => {
    return cars.find(c => c.id === formData.carId);
  };

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return '-';
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const locale = language === 'ar' ? 'ar-MA' : language === 'en' ? 'en-US' : 'fr-FR';
    return date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    if (!formData.name) {
        setErrorMessage(t('booking.error_name'));
        return;
    }
    if (!formData.carId) {
        setErrorMessage(t('booking.error_car'));
        return;
    }
    if (!formData.delivery) {
        setErrorMessage(t('booking.error_delivery'));
        return;
    }

    const car = getSelectedCar();
    const carName = car ? `${car.make} ${car.model}` : 'Non Sélectionné';
    
    // Construct WhatsApp Message using template
    let message = t('booking.whatsapp_message');
    message = message.replace('{name}', formData.name);
    message = message.replace('{car}', carName);
    message = message.replace('{days}', days.toString());
    message = message.replace('{delivery}', t('cities.' + formData.delivery));
    message = message.replace('{pickup}', formatDateDisplay(formData.pickupDate));
    message = message.replace('{return}', formatDateDisplay(formData.dropoffDate));
    
    // Encode and open
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/212661492612?text=${encodedMessage}`, '_blank');
  };

  const selectedCar = getSelectedCar();
  
  // Common Input Style - Compact on mobile
  const inputStyle = `w-full px-3 py-2.5 md:px-4 md:py-3.5 rounded-lg border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-sm md:text-base ${isRTL ? 'text-right' : 'text-left'}`;
  const labelStyle = `block text-xs md:text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5 md:gap-2 ${isRTL ? 'flex-row-reverse' : ''}`;

  return (
    <div id="booking" className="pb-12 md:pb-24 pt-8 md:pt-16 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex flex-col lg:flex-row gap-6 lg:gap-12 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Left Side: Form */}
          <div className="lg:w-3/5 p-5 md:p-12 relative text-left">
             <ScrollReveal animation={isRTL ? "slide-right" : "slide-left"} duration={800} className="h-full">
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h2 className={`text-xl md:text-3xl font-serif font-bold text-gray-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                    {t('booking.title_main')} <span className="text-primary-500">{t('booking.title_vehicle')}</span>
                  </h2>
                  <p className="text-gray-500 mb-6 md:mb-8 text-xs md:text-base">{t('booking.subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  
                  {/* Name */}
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <label className={labelStyle}>
                      <User size={16} className="text-primary-500 md:w-[18px] md:h-[18px]"/> {t('booking.form_name')}
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder={t('booking.form_name_placeholder')}
                    />
                  </div>

                  {/* Car Selection */}
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <label className={labelStyle}>
                      <CarIcon size={16} className="text-primary-500 md:w-[18px] md:h-[18px]"/> {t('booking.form_car')}
                    </label>
                    <select
                      name="carId"
                      value={formData.carId}
                      onChange={handleChange}
                      className={inputStyle}
                      required
                    >
                      <option value="" disabled>{t('booking.form_car_placeholder')}</option>
                      {cars.map(car => (
                        <option key={car.id} value={car.id}>
                            {car.make} {car.model}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Delivery */}
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <label className={labelStyle}>
                      <MapPin size={16} className="text-primary-500 md:w-[18px] md:h-[18px]"/> {t('booking.form_delivery')}
                    </label>
                    <select
                      name="delivery"
                      value={formData.delivery}
                      onChange={handleChange}
                      className={inputStyle}
                      required
                    >
                      <option value="">{t('booking.form_delivery_placeholder')}</option>
                      {DELIVERY_CITIES.map(city => (
                        <option key={city} value={city}>{t('cities.' + city)}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dates - FORCED 2 COLUMNS ON MOBILE */}
                  <div className="grid grid-cols-2 gap-3 md:gap-6">
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <label className={labelStyle}>
                        <Calendar size={16} className="text-primary-500 md:w-[18px] md:h-[18px]"/> {t('booking.form_pickup')}
                      </label>
                      <input
                        required
                        type="date"
                        name="pickupDate"
                        value={formData.pickupDate}
                        min={getToday()}
                        onChange={handleChange}
                        className={inputStyle}
                      />
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <label className={labelStyle}>
                        <Calendar size={16} className="text-primary-500 md:w-[18px] md:h-[18px]"/> {t('booking.form_return')}
                      </label>
                      <input
                        required
                        type="date"
                        name="dropoffDate"
                        value={formData.dropoffDate}
                        min={formData.pickupDate || getToday()}
                        onChange={handleChange}
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {!isValid && errorMessage && (
                      <div className={`bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-xs md:text-sm ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                          <AlertCircle size={16} />
                          {errorMessage}
                      </div>
                  )}

                  <button
                    type="submit"
                    disabled={!isValid || !formData.carId || !formData.name || !formData.delivery}
                    className={`w-full font-bold py-4 rounded-none shadow-lg transition-all flex items-center justify-center gap-2 mt-2 text-white text-base
                        ${(!isValid || !formData.carId || !formData.name || !formData.delivery) 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gold-600 hover:bg-gold-700 hover:shadow-gold-600/30 hover:-translate-y-1'}`}
                  >
                    <Send size={18} className={isRTL ? 'order-last rotate-180' : ''} />
                    {t('booking.form_submit')}
                  </button>
                </form>
            </ScrollReveal>
          </div>

          {/* Right Side: Live Summary */}
          <div className="lg:w-2/5 bg-gray-900 p-0 text-white flex flex-col justify-between relative overflow-hidden">
             <ScrollReveal animation={isRTL ? "slide-left" : "slide-right"} duration={800} delay={200} className="h-full w-full p-6 md:p-12 flex flex-col justify-between">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-primary-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                    <h3 className={`text-lg md:text-2xl font-serif mb-4 md:mb-6 border-b border-gray-700 pb-4 flex items-center gap-3 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                        <Calculator className="text-primary-500 w-5 h-5 md:w-6 md:h-6" />
                        {t('booking.summary_title')} 
                    </h3>

                    {/* Modern Car Image Display */}
                    <div className={`transition-all duration-500 ease-in-out origin-top overflow-hidden ${selectedCar ? 'max-h-48 md:max-h-56 mb-6 md:mb-8 opacity-100 scale-100' : 'max-h-0 mb-0 opacity-0 scale-95'}`}>
                        {selectedCar && (
                            <div className="w-full h-32 md:h-40 relative rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.5)] group border border-white/10">
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-80"></div>
                                <img 
                                    src={selectedCar.image} 
                                    alt={`${selectedCar.make} ${selectedCar.model}`} 
                                    className={`w-full h-full object-center transform group-hover:scale-110 transition-all duration-700 ease-out ${
                                        selectedCar.model === 'Logan' 
                                          ? 'object-contain scale-[1.05] md:object-cover md:scale-100' 
                                          : 'object-cover'
                                    }`}
                                />
                                <div className={`absolute bottom-0 left-0 right-0 p-3 md:p-4 z-20 flex items-end justify-between translate-y-1 group-hover:translate-y-0 transition-transform duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <div className={isRTL ? 'text-right' : 'text-left'}>
                                        <span className="bg-primary-500/90 backdrop-blur-md text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full mb-1.5 inline-block shadow-lg">
                                            {t('car.types.' + selectedCar.type)}
                                        </span>
                                        <h4 className={`text-white font-bold text-base md:text-lg leading-tight drop-shadow-md ${isRTL ? 'font-arabic' : ''}`}>
                                            {selectedCar.make} {selectedCar.model}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Details Summary */}
                    <div className="space-y-4 md:space-y-6">
                        {/* Client Name (Hidden on Mobile) */}
                        <div className={`hidden md:flex items-center gap-4 transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <User size={20} className="text-brand-yellow"/>
                            </div>
                            <div className="flex-1">
                                <span className="block text-xs text-gray-400 uppercase tracking-wider">{t('booking.summary_client')}</span>
                                <span className="font-medium text-lg truncate block max-w-[200px]">
                                    {formData.name || '...'}
                                </span>
                            </div>
                        </div>

                        {/* Selected Car (Hidden on Mobile) */}
                        <div className={`hidden md:flex items-center gap-4 transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <CarIcon size={20} className="text-brand-yellow"/>
                            </div>
                            <div className="flex-1">
                                <span className="block text-xs text-gray-400 uppercase tracking-wider">{t('booking.summary_vehicle')}</span>
                                <span className="font-medium text-lg uppercase tracking-tight">
                                    {selectedCar ? `${selectedCar.make} ${selectedCar.model}` : '...'}
                                </span>
                            </div>
                        </div>
                        
                        {/* Delivery (Hidden on Mobile) */}
                        <div className={`hidden md:flex items-center gap-4 transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <MapPin size={20} className="text-brand-yellow"/>
                            </div>
                            <div className="flex-1">
                                <span className="block text-xs text-gray-400 uppercase tracking-wider">{t('booking.summary_delivery')}</span>
                                <span className="font-medium text-lg">
                                    {formData.delivery ? t('cities.' + formData.delivery) : '...'}
                                </span>
                            </div>
                        </div>

                        {/* Dates & Duration (Always Visible) */}
                        <div className={`flex items-center gap-3 md:gap-4 transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <Clock size={16} className="text-brand-yellow md:w-[18px] md:h-[18px]"/>
                            </div>
                            <div className="flex-1">
                                <span className="block text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">{t('booking.summary_duration')}</span>
                                <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <span className="font-medium text-sm md:text-base">
                                        {formatDateDisplay(formData.pickupDate)} → {formatDateDisplay(formData.dropoffDate)}
                                    </span>
                                    {days > 0 && (
                                        <span className="bg-primary-500/20 text-brand-yellow text-[10px] md:text-xs px-2 py-1 rounded w-fit">
                                            {days} {t('booking.summary_days')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-700 my-4 md:my-8" />

                    {/* Calculation */}
                    {selectedCar && days > 0 ? (
                        <div className={`animate-fade-in py-4 ${isRTL ? 'text-right' : 'text-center'}`}>
                            <div className={`text-gray-400 text-sm md:text-base ${isRTL ? 'text-right' : 'text-center'}`}>
                                <span className="font-bold text-white">{t('booking.summary_ready')}</span>
                                <p className="mt-1">{t('booking.summary_selected_duration')}: {days} {t('booking.summary_days')}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-4 bg-white/5 rounded-lg border border-white/5 border-dashed text-sm md:text-base">
                            {t('booking.summary_complete_form')}
                        </div>
                    )}
                </div>

                {/* Footer Help */}
                <div className="mt-4 md:mt-8 z-10 text-[10px] md:text-xs text-gray-500 text-center">
                    {t('booking.footer_help')}
                </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;