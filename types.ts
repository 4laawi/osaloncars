export interface Car {
  id: string;
  make: string;
  model: string;
  type: string; // Acts as the category (Berline, SUV, etc.)
  transmission: string;
  fuel: string;
  pricePerDay: number; // in MAD
  promoPrice?: number | null; // New field for discounts
  features: string[];
  accessories?: string[]; // New field for accessories
  image: string;
  description?: string;
  isAvailable: boolean;
  
  // UI Design Props (Generated dynamically)
  accentColor: string;
  rating: number;
  reviewCount: number;
  availableCount: number;
  badge?: string;
  badgeIcon?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  language: 'en' | 'fr' | 'darija';
  date: string;
}

export interface BookingRequest {
  fullName: string;
  phone: string;
  carId: string;
  pickupDate: string;
  dropoffDate: string;
  city: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
  translations?: {
    [key: string]: {
      title: string;
      excerpt: string;
      content: string;
      tags: string[];
    }
  };
}