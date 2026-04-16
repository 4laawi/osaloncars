import fr from '../locales/fr.json';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

export type Language = 'en' | 'fr' | 'ar';

export const translations: Record<Language, any> = {
  fr,
  en,
  ar
};
