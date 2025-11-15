import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Fruits & Vegetables",
    slug: "fruits-vegetables",
    icon: "apple",
    productCount: 8,
    subcategories: ["Fruits", "Vegetables", "Herbs"]
  },
  {
    id: "cat2",
    name: "Meat & Seafood",
    slug: "meat-seafood",
    icon: "beef",
    productCount: 5,
    subcategories: ["Beef", "Chicken", "Pork", "Sausages"]
  },
  {
    id: "cat3",
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    icon: "milk",
    productCount: 5,
    subcategories: ["Milk", "Cheese", "Yogurt", "Butter", "Eggs"]
  },
  {
    id: "cat4",
    name: "Pantry Staples",
    slug: "pantry-staples",
    icon: "wheat",
    productCount: 7,
    subcategories: ["Rice & Grains", "Flour & Meal", "Oils", "Pasta", "Sauces"]
  },
  {
    id: "cat5",
    name: "Beverages",
    slug: "beverages",
    icon: "coffee",
    productCount: 5,
    subcategories: ["Water", "Soft Drinks", "Juices", "Tea", "Coffee"]
  },
  {
    id: "cat6",
    name: "Bakery",
    slug: "bakery",
    icon: "cake",
    productCount: 4,
    subcategories: ["Bread", "Pastries", "Cakes", "Traditional"]
  },
  {
    id: "cat7",
    name: "Snacks",
    slug: "snacks",
    icon: "candy",
    productCount: 4,
    subcategories: ["Chips", "Biscuits", "Nuts", "Dried Meat"]
  },
  {
    id: "cat8",
    name: "Household",
    slug: "household",
    icon: "home",
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
