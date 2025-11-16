import { Product } from "@/types";
import { productImages } from "./product-images";

export const products: Product[] = [
  // Fruits & Vegetables - Fresh Produce Market (Store 5)
  {
    id: "p1",
    storeId: "5",
    name: "Fresh Tomatoes",
    slug: "fresh-tomatoes",
    description: "Locally grown ripe tomatoes, perfect for salads and cooking",
    price: 24.50,
    originalPrice: 30.00,
    discount: 18,
    unit: "per kg",
    category: "Fruits & Vegetables",
    subcategory: "Vegetables",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop",
    inStock: true,
    featured: true,
    tags: ["fresh", "local", "organic"]
  },
  {
    id: "p2",
    storeId: "5",
    name: "Red Onions",
    slug: "red-onions",
    description: "Sweet red onions from local farms",
    price: 18.00,
    unit: "per kg",
    category: "Fruits & Vegetables",
    subcategory: "Vegetables",
    image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=400&h=400&fit=crop",
    inStock: true,
    featured: false
  },
  {
    id: "p3",
    storeId: "5",
    name: "Butternut Squash",
    slug: "butternut-squash",
    description: "Fresh butternut, great for soups and stews",
    price: 15.50,
    originalPrice: 22.00,
    discount: 30,
    unit: "per piece",
    category: "Fruits & Vegetables",
    subcategory: "Vegetables",
    image: "https://images.unsplash.com/photo-1477506350614-fcdc29a3b157?w=400&h=400&fit=crop",
    inStock: true,
    featured: true
  },
  {
    id: "p4",
    storeId: "5",
    name: "Spinach",
    slug: "spinach",
    description: "Fresh spinach leaves, rich in iron",
    price: 12.00,
    unit: "per bunch",
    category: "Fruits & Vegetables",
    subcategory: "Vegetables",
    image: productImages.p4,
    inStock: true,
    featured: false
  },
  {
    id: "p5",
    storeId: "5",
    name: "Cabbage",
    slug: "cabbage",
    description: "Crisp green cabbage",
    price: 16.00,
    unit: "per head",
    category: "Fruits & Vegetables",
    subcategory: "Vegetables",
    image: productImages.p5,
    inStock: true,
    featured: false
  },
  {
    id: "p6",
    storeId: "5",
    name: "Bananas",
    slug: "bananas",
    description: "Sweet ripe bananas",
    price: 22.00,
    unit: "per kg",
    category: "Fruits & Vegetables",
    subcategory: "Fruits",
    image: productImages.p6,
    inStock: true,
    featured: true
  },
  {
    id: "p7",
    storeId: "5",
    name: "Apples",
    slug: "apples",
    description: "Crisp red apples",
    price: 35.00,
    unit: "per kg",
    category: "Fruits & Vegetables",
    subcategory: "Fruits",
    image: productImages.p7,
    inStock: true,
    featured: false
  },
  {
    id: "p8",
    storeId: "5",
    name: "Oranges",
    slug: "oranges",
    description: "Juicy sweet oranges",
    price: 28.00,
    unit: "per kg",
    category: "Fruits & Vegetables",
    subcategory: "Fruits",
    image: productImages.p8,
    inStock: true,
    featured: false
  },

  // Meat & Seafood - The Butcher Block (Store 7)
  {
    id: "p9",
    storeId: "7",
    name: "Beef Steak",
    slug: "beef-steak",
    description: "Premium quality beef steak, tender and flavorful",
    price: 89.50,
    unit: "per kg",
    category: "Meat & Seafood",
    subcategory: "Beef",
    image: productImages.p9,
    inStock: true,
    featured: true
  },
  {
    id: "p10",
    storeId: "7",
    name: "Chicken Breasts",
    slug: "chicken-breasts",
    description: "Fresh boneless chicken breasts",
    price: 65.00,
    unit: "per kg",
    category: "Meat & Seafood",
    subcategory: "Chicken",
    image: productImages.p10,
    inStock: true,
    featured: true
  },
  {
    id: "p11",
    storeId: "7",
    name: "Minced Beef",
    slug: "minced-beef",
    description: "Lean minced beef, perfect for burgers",
    price: 72.00,
    unit: "per kg",
    category: "Meat & Seafood",
    subcategory: "Beef",
    image: productImages.p11,
    inStock: true,
    featured: false
  },
  {
    id: "p12",
    storeId: "7",
    name: "Pork Chops",
    slug: "pork-chops",
    description: "Tender pork chops",
    price: 78.00,
    unit: "per kg",
    category: "Meat & Seafood",
    subcategory: "Pork",
    image: productImages.p12,
    inStock: true,
    featured: false
  },
  {
    id: "p13",
    storeId: "7",
    name: "Boerewors",
    slug: "boerewors",
    description: "Traditional South African sausage",
    price: 68.00,
    unit: "per kg",
    category: "Meat & Seafood",
    subcategory: "Sausages",
    image: productImages.p13,
    inStock: true,
    featured: true
  },

  // Dairy & Eggs - Choppies Riverwalk (Store 1)
  {
    id: "p14",
    storeId: "1",
    name: "Fresh Milk",
    slug: "fresh-milk",
    description: "Full cream fresh milk 2L",
    price: 28.50,
    originalPrice: 35.00,
    discount: 19,
    unit: "2L bottle",
    category: "Dairy & Eggs",
    subcategory: "Milk",
    image: productImages.p14,
    inStock: true,
    featured: true
  },
  {
    id: "p15",
    storeId: "1",
    name: "Cheddar Cheese",
    slug: "cheddar-cheese",
    description: "Mature cheddar cheese 500g",
    price: 52.00,
    unit: "500g",
    category: "Dairy & Eggs",
    subcategory: "Cheese",
    image: productImages.p15,
    inStock: true,
    featured: false
  },
  {
    id: "p16",
    storeId: "1",
    name: "Plain Yogurt",
    slug: "plain-yogurt",
    description: "Smooth plain yogurt 500g",
    price: 22.50,
    unit: "500g",
    category: "Dairy & Eggs",
    subcategory: "Yogurt",
    image: productImages.p16,
    inStock: true,
    featured: false
  },
  {
    id: "p17",
    storeId: "1",
    name: "Butter",
    slug: "butter",
    description: "Salted butter 500g",
    price: 38.00,
    unit: "500g",
    category: "Dairy & Eggs",
    subcategory: "Butter",
    image: productImages.p17,
    inStock: true,
    featured: false
  },
  {
    id: "p18",
    storeId: "1",
    name: "Free Range Eggs",
    slug: "free-range-eggs",
    description: "Farm fresh eggs - 18 pack",
    price: 42.00,
    unit: "18 eggs",
    category: "Dairy & Eggs",
    subcategory: "Eggs",
    image: productImages.p18,
    inStock: true,
    featured: true
  },

  // Pantry Staples - Shoprite Game City (Store 3)
  {
    id: "p19",
    storeId: "3",
    name: "White Rice",
    slug: "white-rice",
    description: "Long grain white rice 2kg",
    price: 32.00,
    unit: "2kg",
    category: "Pantry Staples",
    subcategory: "Rice & Grains",
    image: productImages.p19,
    inStock: true,
    featured: true
  },
  {
    id: "p20",
    storeId: "3",
    name: "Maize Meal",
    slug: "maize-meal",
    description: "Premium maize meal 5kg",
    price: 48.00,
    unit: "5kg",
    category: "Pantry Staples",
    subcategory: "Flour & Meal",
    image: productImages.p20,
    inStock: true,
    featured: true
  },
  {
    id: "p21",
    storeId: "3",
    name: "Cooking Oil",
    slug: "cooking-oil",
    description: "Pure sunflower cooking oil 2L",
    price: 45.00,
    unit: "2L",
    category: "Pantry Staples",
    subcategory: "Oils",
    image: productImages.p21,
    inStock: true,
    featured: true
  },
  {
    id: "p22",
    storeId: "3",
    name: "White Sugar",
    slug: "white-sugar",
    description: "White sugar 2kg",
    price: 36.00,
    unit: "2kg",
    category: "Pantry Staples",
    subcategory: "Sugar & Sweeteners",
    image: productImages.p22,
    inStock: true,
    featured: false
  },
  {
    id: "p23",
    storeId: "3",
    name: "Table Salt",
    slug: "table-salt",
    description: "Iodized table salt 500g",
    price: 8.50,
    unit: "500g",
    category: "Pantry Staples",
    subcategory: "Spices & Seasonings",
    image: productImages.p23,
    inStock: true,
    featured: false
  },
  {
    id: "p24",
    storeId: "3",
    name: "Pasta Penne",
    slug: "pasta-penne",
    description: "Penne pasta 500g",
    price: 18.50,
    unit: "500g",
    category: "Pantry Staples",
    subcategory: "Pasta",
    image: productImages.p24,
    inStock: true,
    featured: false
  },
  {
    id: "p25",
    storeId: "3",
    name: "Tomato Sauce",
    slug: "tomato-sauce",
    description: "All purpose tomato sauce 700ml",
    price: 22.00,
    unit: "700ml",
    category: "Pantry Staples",
    subcategory: "Sauces",
    image: productImages.p25,
    inStock: true,
    featured: false
  },

  // Beverages - Spar CBD (Store 2)
  {
    id: "p26",
    storeId: "2",
    name: "Bottled Water",
    slug: "bottled-water",
    description: "Pure spring water 6x500ml",
    price: 18.00,
    unit: "6 pack",
    category: "Beverages",
    subcategory: "Water",
    image: productImages.p26,
    inStock: true,
    featured: true
  },
  {
    id: "p27",
    storeId: "2",
    name: "Coca-Cola",
    slug: "coca-cola",
    description: "Coca-Cola 2L bottle",
    price: 24.50,
    unit: "2L",
    category: "Beverages",
    subcategory: "Soft Drinks",
    image: productImages.p27,
    inStock: true,
    featured: true
  },
  {
    id: "p28",
    storeId: "2",
    name: "Orange Juice",
    slug: "orange-juice",
    description: "100% pure orange juice 1L",
    price: 32.00,
    unit: "1L",
    category: "Beverages",
    subcategory: "Juices",
    image: productImages.p28,
    inStock: true,
    featured: false
  },
  {
    id: "p29",
    storeId: "2",
    name: "Rooibos Tea",
    slug: "rooibos-tea",
    description: "Premium rooibos tea 80 bags",
    price: 42.00,
    unit: "80 bags",
    category: "Beverages",
    subcategory: "Tea",
    image: productImages.p29,
    inStock: true,
    featured: false
  },
  {
    id: "p30",
    storeId: "2",
    name: "Instant Coffee",
    slug: "instant-coffee",
    description: "Nescafe instant coffee 200g",
    price: 68.00,
    unit: "200g",
    category: "Beverages",
    subcategory: "Coffee",
    image: productImages.p30,
    inStock: true,
    featured: false
  },

  // Bakery - Pick n Pay Broadhurst (Store 4)
  {
    id: "p31",
    storeId: "4",
    name: "White Bread",
    slug: "white-bread",
    description: "Fresh white bread loaf 700g",
    price: 14.50,
    unit: "700g loaf",
    category: "Bakery",
    subcategory: "Bread",
    image: productImages.p31,
    inStock: true,
    featured: true
  },
  {
    id: "p32",
    storeId: "4",
    name: "Brown Bread",
    slug: "brown-bread",
    description: "Healthy brown bread 700g",
    price: 16.00,
    unit: "700g loaf",
    category: "Bakery",
    subcategory: "Bread",
    image: productImages.p32,
    inStock: true,
    featured: false
  },
  {
    id: "p33",
    storeId: "4",
    name: "Croissants",
    slug: "croissants",
    description: "Butter croissants 4 pack",
    price: 28.00,
    unit: "4 pack",
    category: "Bakery",
    subcategory: "Pastries",
    image: productImages.p33,
    inStock: true,
    featured: false
  },
  {
    id: "p34",
    storeId: "4",
    name: "Vetkoek",
    slug: "vetkoek",
    description: "Traditional vetkoek 6 pack",
    price: 24.00,
    unit: "6 pack",
    category: "Bakery",
    subcategory: "Traditional",
    image: productImages.p34,
    inStock: true,
    featured: true
  },

  // Snacks - Multiple stores
  {
    id: "p35",
    storeId: "1",
    name: "Potato Chips",
    slug: "potato-chips",
    description: "Simba potato chips 125g",
    price: 16.50,
    unit: "125g",
    category: "Snacks",
    subcategory: "Chips",
    image: productImages.p35,
    inStock: true,
    featured: false
  },
  {
    id: "p36",
    storeId: "1",
    name: "Biltong",
    slug: "biltong",
    description: "Premium beef biltong 100g",
    price: 52.00,
    unit: "100g",
    category: "Snacks",
    subcategory: "Dried Meat",
    image: productImages.p36,
    inStock: true,
    featured: true
  },
  {
    id: "p37",
    storeId: "2",
    name: "Cookies",
    slug: "cookies",
    description: "Chocolate chip cookies 200g",
    price: 24.00,
    unit: "200g",
    category: "Snacks",
    subcategory: "Biscuits",
    image: productImages.p37,
    inStock: true,
    featured: false
  },
  {
    id: "p38",
    storeId: "3",
    name: "Peanuts",
    slug: "peanuts",
    description: "Roasted & salted peanuts 400g",
    price: 28.00,
    unit: "400g",
    category: "Snacks",
    subcategory: "Nuts",
    image: productImages.p38,
    inStock: true,
    featured: false
  },

  // Household - Sefalana (Store 6)
  {
    id: "p39",
    storeId: "6",
    name: "Toilet Paper",
    slug: "toilet-paper",
    description: "Soft toilet paper 9 pack",
    price: 38.00,
    unit: "9 pack",
    category: "Household",
    subcategory: "Paper Products",
    image: productImages.p39,
    inStock: true,
    featured: false
  },
  {
    id: "p40",
    storeId: "6",
    name: "Dish Soap",
    slug: "dish-soap",
    description: "Liquid dish soap 750ml",
    price: 22.00,
    unit: "750ml",
    category: "Household",
    subcategory: "Cleaning",
    image: productImages.p40,
    inStock: true,
    featured: false
  },
  {
    id: "p41",
    storeId: "6",
    name: "Laundry Detergent",
    slug: "laundry-detergent",
    description: "Washing powder 2kg",
    price: 65.00,
    unit: "2kg",
    category: "Household",
    subcategory: "Laundry",
    image: productImages.p41,
    inStock: true,
    featured: false
  }
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByStore = (storeId: string): Product[] => {
  return products.filter(product => product.storeId === storeId);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};
