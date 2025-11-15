// Core types for the BotsMart grocery application

export interface Store {
  id: string;
  name: string;
  slug: string;
  logo: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string; // e.g., "30-45 min"
  deliveryFee: number; // in BWP
  minOrder: number; // in BWP
  distance: string; // e.g., "2.5 km"
  categories: string[];
  location: {
    city: string;
    area: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  operatingHours: {
    open: string; // e.g., "08:00"
    close: string; // e.g., "22:00"
  };
  isOpen: boolean;
  featured: boolean;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  description: string;
  price: number; // in BWP
  originalPrice?: number; // for discounts
  unit: string; // e.g., "kg", "per piece", "500g"
  category: string;
  subcategory?: string;
  image: string;
  images?: string[];
  inStock: boolean;
  featured: boolean;
  tags?: string[];
  nutritionInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image?: string;
  productCount: number;
  subcategories?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  storeId: string;
  storeName: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  storeIds: string[]; // Track which stores are in the cart
}

export interface DeliveryAddress {
  id?: string;
  fullName: string;
  phone: string;
  street: string;
  area: string;
  city: string;
  landmark?: string;
  instructions?: string;
  isDefault?: boolean;
}

export interface DeliverySlot {
  id: string;
  date: string; // ISO date string
  label: string; // e.g., "Today", "Tomorrow"
  slots: {
    time: string; // e.g., "09:00 - 11:00"
    available: boolean;
  }[];
}

export interface PaymentMethod {
  id: string;
  type: 'cash' | 'card' | 'wallet';
  label: string;
  icon: string;
  enabled: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  storeId: string;
  storeName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  deliveryAddress: DeliveryAddress;
  deliverySlot: string;
  paymentMethod: string;
  notes?: string;
  createdAt: string; // ISO date string
  estimatedDelivery?: string; // ISO date string
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: DeliveryAddress[];
  defaultAddressId?: string;
}

// Filter and sort types
export type StoreFilterType = 'all' | 'supermarket' | 'produce' | 'butchery' | 'bakery';
export type StoreSortType = 'distance' | 'rating' | 'delivery_time' | 'featured';
export type ProductSortType = 'price_asc' | 'price_desc' | 'popularity' | 'newest' | 'name';

export interface StoreFilters {
  type: StoreFilterType;
  isOpen?: boolean;
  minRating?: number;
  maxDeliveryTime?: number;
}

export interface ProductFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
  featured?: boolean;
}

// Search types
export interface SearchSuggestion {
  id: string;
  type: 'product' | 'category' | 'store';
  text: string;
  category?: string;
  storeName?: string;
}

export interface SearchResult {
  products: Product[];
  stores: Store[];
  categories: Category[];
  query: string;
}
