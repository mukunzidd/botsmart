import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Fruits & Vegetables",
    slug: "fruits-vegetables",
    icon: "🥬",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=200&h=200&fit=crop",
    productCount: 8,
    subcategories: ["Fruits", "Vegetables", "Herbs"]
  },
  {
    id: "cat2",
    name: "Meat & Seafood",
    slug: "meat-seafood",
    icon: "🥩",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=200&h=200&fit=crop",
    productCount: 5,
    subcategories: ["Beef", "Chicken", "Pork", "Sausages"]
  },
  {
    id: "cat3",
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    icon: "🥛",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop",
    productCount: 5,
    subcategories: ["Milk", "Cheese", "Yogurt", "Butter", "Eggs"]
  },
  {
    id: "cat4",
    name: "Grains & Cereals",
    slug: "grains-cereals",
    icon: "🌾",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop",
    productCount: 7,
    subcategories: ["Rice & Grains", "Flour & Meal", "Oils", "Pasta", "Sauces"]
  },
  {
    id: "cat5",
    name: "Beverages",
    slug: "beverages",
    icon: "☕",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop",
    productCount: 5,
    subcategories: ["Water", "Soft Drinks", "Juices", "Tea", "Coffee"]
  },
  {
    id: "cat6",
    name: "Bakery",
    slug: "bakery",
    icon: "🍞",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop",
    productCount: 4,
    subcategories: ["Bread", "Pastries", "Cakes", "Traditional"]
  },
  {
    id: "cat7",
    name: "Snacks",
    slug: "snacks",
    icon: "🍿",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop",
    productCount: 4,
    subcategories: ["Chips", "Biscuits", "Nuts", "Dried Meat"]
  },
  {
    id: "cat8",
    name: "Household",
    slug: "household",
    icon: "🧹",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=200&fit=crop",
    productCount: 3,
    subcategories: ["Paper Products", "Cleaning", "Laundry"]
  }
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(cat => cat.slug === slug);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};
