import { Store } from "@/types";

export const stores: Store[] = [
  {
    id: "1",
    name: "Choppies Riverwalk",
    slug: "choppies-riverwalk",
    logo: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=200&fit=crop",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&h=600&fit=crop",
    rating: 4.5,
    reviewCount: 234,
    deliveryTime: "30-40 min",
    deliveryFee: 15,
    minOrder: 50,
    distance: "1.2 km",
    categories: ["Supermarket", "Fresh Produce", "Bakery", "Household"],
    location: {
      city: "Gaborone",
      area: "Riverwalk",
      coordinates: { lat: -24.6282, lng: 25.9231 }
    },
    operatingHours: { open: "07:00", close: "22:00" },
    isOpen: true,
    featured: true
  },
  {
    id: "2",
    name: "Spar CBD",
    slug: "spar-cbd",
    logo: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=200&fit=crop",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&h=600&fit=crop",
    rating: 4.3,
    reviewCount: 189,
    deliveryTime: "25-35 min",
    deliveryFee: 12,
    minOrder: 40,
    distance: "0.8 km",
    categories: ["Supermarket", "Fresh Produce", "Deli", "Bakery"],
    location: {
      city: "Gaborone",
      area: "CBD",
      coordinates: { lat: -24.6541, lng: 25.9087 }
    },
    operatingHours: { open: "06:30", close: "21:00" },
    isOpen: true,
    featured: true
  },
  {
    id: "3",
    name: "Shoprite Game City",
    slug: "shoprite-game-city",
    logo: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=200&fit=crop",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&h=600&fit=crop",
    rating: 4.4,
    reviewCount: 312,
    deliveryTime: "35-45 min",
    deliveryFee: 18,
    minOrder: 60,
    distance: "3.5 km",
    categories: ["Supermarket", "Fresh Produce", "Butchery", "Bakery"],
    location: {
      city: "Gaborone",
      area: "Game City",
      coordinates: { lat: -24.6760, lng: 25.9269 }
    },
    operatingHours: { open: "08:00", close: "20:00" },
    isOpen: true,
    featured: true
  },
  {
    id: "4",
    name: "Pick n Pay Broadhurst",
    slug: "pick-n-pay-broadhurst",
    logo: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=200&fit=crop",
    image: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=800&h=600&fit=crop",
    rating: 4.6,
    reviewCount: 276,
    deliveryTime: "30-40 min",
    deliveryFee: 15,
    minOrder: 50,
    distance: "2.1 km",
    categories: ["Supermarket", "Fresh Produce", "Bakery", "Deli"],
    location: {
      city: "Gaborone",
      area: "Broadhurst",
      coordinates: { lat: -24.6392, lng: 25.8976 }
    },
    operatingHours: { open: "07:30", close: "21:00" },
    isOpen: true,
    featured: false
  },
  {
    id: "5",
    name: "Fresh Produce Market",
    slug: "fresh-produce-market",
    logo: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=200&h=200&fit=crop",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop",
    rating: 4.7,
    reviewCount: 145,
    deliveryTime: "20-30 min",
    deliveryFee: 10,
    minOrder: 30,
    distance: "1.5 km",
    categories: ["Fresh Produce", "Fruits", "Vegetables"],
    location: {
      city: "Gaborone",
      area: "Main Mall",
      coordinates: { lat: -24.6463, lng: 25.9119 }
    },
    operatingHours: { open: "06:00", close: "18:00" },
    isOpen: true,
    featured: true
  },
  {
    id: "6",
    name: "Sefalana Gaborone West",
    slug: "sefalana-gaborone-west",
    logo: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=200&fit=crop",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=600&fit=crop",
    rating: 4.2,
    reviewCount: 198,
    deliveryTime: "40-50 min",
    deliveryFee: 20,
    minOrder: 70,
    distance: "4.8 km",
    categories: ["Supermarket", "Wholesale", "Fresh Produce"],
    location: {
      city: "Gaborone",
      area: "Gaborone West",
      coordinates: { lat: -24.6721, lng: 25.8654 }
    },
    operatingHours: { open: "08:00", close: "19:00" },
    isOpen: true,
    featured: false
  },
  {
    id: "7",
    name: "The Butcher Block",
    slug: "butcher-block",
    logo: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=200&h=200&fit=crop",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&h=600&fit=crop",
    rating: 4.8,
    reviewCount: 167,
    deliveryTime: "25-35 min",
    deliveryFee: 15,
    minOrder: 80,
    distance: "2.3 km",
    categories: ["Butchery", "Fresh Meat", "Deli"],
    location: {
      city: "Gaborone",
      area: "Kgale",
      coordinates: { lat: -24.6899, lng: 25.9387 }
    },
    operatingHours: { open: "07:00", close: "19:00" },
    isOpen: true,
    featured: false
  },
  {
    id: "8",
    name: "Choppies Francistown",
    slug: "choppies-francistown",
    logo: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=200&fit=crop",
    image: "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=800&h=600&fit=crop",
    rating: 4.4,
    reviewCount: 203,
    deliveryTime: "30-40 min",
    deliveryFee: 15,
    minOrder: 50,
    distance: "1.8 km",
    categories: ["Supermarket", "Fresh Produce", "Bakery"],
    location: {
      city: "Francistown",
      area: "Blue Jacket Street",
      coordinates: { lat: -21.1700, lng: 27.5077 }
    },
    operatingHours: { open: "07:00", close: "21:00" },
    isOpen: true,
    featured: false
  },
  {
    id: "9",
    name: "Malatsi Fresh Foods",
    slug: "malatsi-fresh-foods",
    logo: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=200&h=200&fit=crop",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    rating: 4.5,
    reviewCount: 128,
    deliveryTime: "25-35 min",
    deliveryFee: 12,
    minOrder: 40,
    distance: "1.6 km",
    categories: ["Fresh Produce", "Local Products", "Vegetables"],
    location: {
      city: "Gaborone",
      area: "Extension 9",
      coordinates: { lat: -24.6123, lng: 25.9456 }
    },
    operatingHours: { open: "06:00", close: "20:00" },
    isOpen: true,
    featured: false
  },
  {
    id: "10",
    name: "Saverite Mogoditshane",
    slug: "saverite-mogoditshane",
    logo: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=200&fit=crop",
    image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=800&h=600&fit=crop",
    rating: 4.1,
    reviewCount: 156,
    deliveryTime: "45-55 min",
    deliveryFee: 22,
    minOrder: 60,
    distance: "6.2 km",
    categories: ["Supermarket", "Wholesale", "Household"],
    location: {
      city: "Mogoditshane",
      area: "Main Road",
      coordinates: { lat: -24.6234, lng: 25.8567 }
    },
    operatingHours: { open: "08:00", close: "20:00" },
    isOpen: false,
    featured: false
  }
];

// Helper function to get store by id
export const getStoreById = (id: string): Store | undefined => {
  return stores.find(store => store.id === id);
};

// Helper function to get store by slug
export const getStoreBySlug = (slug: string): Store | undefined => {
  return stores.find(store => store.slug === slug);
};

// Helper function to filter stores
export const filterStores = (filters: {
  isOpen?: boolean;
  city?: string;
  minRating?: number;
}): Store[] => {
  return stores.filter(store => {
    if (filters.isOpen !== undefined && store.isOpen !== filters.isOpen) return false;
    if (filters.city && store.location.city !== filters.city) return false;
    if (filters.minRating && store.rating < filters.minRating) return false;
    return true;
  });
};
