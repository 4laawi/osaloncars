import { Review, Car } from './types';

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Youssef El Amrani',
    rating: 5,
    text: 'Khdemt m3ahom chhar li fat, service nqi w tomobil jdida. Lah y3tikom saha.',
    language: 'darija',
    date: '2023-10-15'
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    rating: 5,
    text: 'Service fantastique. La voiture a été livrée à mon hôtel à l\'heure et était impeccable. Simple et efficace.',
    language: 'fr',
    date: '2023-11-02'
  },
  {
    id: '3',
    name: 'Mehdi Benkirane',
    rating: 4,
    text: 'Prix raisonnable et personnel très professionnel. Je recommande vivement pour vos voyages au Maroc.',
    language: 'fr',
    date: '2023-12-10'
  },
  {
    id: '4',
    name: 'James Wilson',
    rating: 5,
    text: 'Finally a rental agency where "new car" actually means new. The Duster ran perfectly and the AC was a lifesaver. Quick drop-off at the airport!',
    language: 'en',
    date: '2024-01-15'
  },
  {
    id: '5',
    name: 'Amine Kabbaj',
    rating: 5,
    text: 'Client fidèle depuis 6 mois. C\'est rare de trouver ce sérieux à Sala Al Jadida. Voitures nickels et prix fixes, même en haute saison. Bravo !',
    language: 'fr',
    date: '2024-02-20'
  },
  {
    id: '6',
    name: 'Sophie Dubois',
    rating: 4,
    text: 'Très bon rapport qualité-prix. J\'avais un peu peur au début mais la caution a été rendue immédiatement après le retour. Sérieux.',
    language: 'fr',
    date: '2024-03-05'
  }
];

export const CITIES = [
  'Sala Al Jadida',
  'Marrakech',
  'Rabat',
  'Tanger',
  'Agadir',
  'Fès'
];

export const CARS: Car[] = [
  {
    id: '1',
    make: 'Dacia',
    model: 'Logan',
    type: 'Berline',
    transmission: 'Manuelle',
    fuel: 'Diesel',
    pricePerDay: 300,
    features: ['Climatisation', 'Bluetooth', 'Sécurité ABS', 'GPS'],
    accessories: ['Sièges auto', 'JAWAZ'],
    image: '/DACIA.png',
    isAvailable: true,
    accentColor: '#2C7873',
    rating: 4.8,
    reviewCount: 92,
    availableCount: 5,
    badge: 'Économique',
    badgeIcon: 'Zap'
  },
  {
    id: '2',
    make: 'Renault',
    model: 'Clio 5',
    type: 'Citadine',
    transmission: 'Manuelle',
    fuel: 'Diesel',
    pricePerDay: 350,
    features: ['Climatisation', 'Bluetooth', 'Sécurité ABS', 'GPS'],
    accessories: ['Sièges auto', 'JAWAZ'],
    image: '/clio5.png',
    isAvailable: true,
    accentColor: '#E27D60',
    rating: 4.7,
    reviewCount: 124,
    availableCount: 3,
    badge: 'Populaire',
    badgeIcon: 'Fire'
  },
  {
    id: '3',
    make: 'Peugeot',
    model: '208',
    type: 'Citadine',
    transmission: 'Manuelle',
    fuel: 'Essence/Diesel',
    pricePerDay: 350,
    features: ['Climatisation', 'Bluetooth', 'Sécurité ABS', 'GPS'],
    accessories: ['Sièges auto', 'JAWAZ'],
    image: '/PEUGOT_208.png',
    isAvailable: true,
    accentColor: '#E8B44A',
    rating: 4.9,
    reviewCount: 45,
    availableCount: 4,
    badge: 'Confort',
    badgeIcon: 'Sparkles'
  },
  {
    id: '4',
    make: 'Opel',
    model: 'Corsa',
    type: 'Citadine',
    transmission: 'Manuelle',
    fuel: 'Diesel',
    pricePerDay: 400,
    features: ['Climatisation', 'Bluetooth', 'Aide au stationnement', 'Régulateur'],
    accessories: ['Sièges auto', 'JAWAZ'],
    image: '/corsa-opel.png',
    isAvailable: true,
    accentColor: '#2C3E50',
    rating: 4.8,
    reviewCount: 32,
    availableCount: 2,
    badge: 'Nouveau',
    badgeIcon: 'Zap'
  },
  {
    id: '5',
    make: 'Kia',
    model: 'Sportage',
    type: 'SUV',
    transmission: 'Automatique',
    fuel: 'Diesel',
    pricePerDay: 750,
    features: ['Toit Ouvrant', 'Caméra 360', 'Sièges Cuir', 'Apple CarPlay'],
    accessories: ['Sièges auto Luxe', 'JAWAZ Pro'],
    image: '/sportage-kia.png',
    isAvailable: true,
    accentColor: '#8E44AD',
    rating: 4.9,
    reviewCount: 56,
    availableCount: 1,
    badge: 'Premium',
    badgeIcon: 'Crown'
  },
  {
    id: '6',
    make: 'Hyundai',
    model: 'Tucson',
    type: 'SUV',
    transmission: 'Automatique',
    fuel: 'Diesel',
    pricePerDay: 800,
    features: ['Cockpit Digital', 'Aide à la conduite', 'Système Son Bose', 'Mode Sport'],
    accessories: ['Sièges auto Luxe', 'JAWAZ Pro'],
    image: '/hyundai-tucson.png',
    isAvailable: true,
    accentColor: '#2980B9',
    rating: 4.9,
    reviewCount: 48,
    availableCount: 2,
    badge: 'Exclusif',
    badgeIcon: 'Sparkles'
  }
];