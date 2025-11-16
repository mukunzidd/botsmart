"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { StoreCard } from "@/components/store-card"
import { ProductCard } from "@/components/product-card"
import { stores } from "@/lib/data/stores"
import { products } from "@/lib/data/products"
import { categories } from "@/lib/data/categories"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useSessionStore } from "@/lib/store/session-store"
import { useCartStore } from "@/lib/store/cart-store"

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&h=600&fit=crop", // Colorful grocery bags with fresh produce
  "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1400&h=600&fit=crop", // Vibrant supermarket aisles
  "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1400&h=600&fit=crop", // Fresh market vegetables
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const setSelectedStore = useSessionStore((state) => state.setSelectedStore)
  const selectedStoreId = useSessionStore((state) => state.selectedStoreId)
  const cartStoreId = useCartStore((state) => state.getStoreId())

  // Prioritize cart store, then session store
  const currentStoreId = cartStoreId || selectedStoreId

  // Filter products by selected store if a store is selected
  const filteredProducts = currentStoreId
    ? products.filter(p => p.storeId === currentStoreId)
    : products

  // Get featured products for "You might need" section
  const featuredProducts = filteredProducts.filter(p => p.featured).slice(0, 10)

  // Get weekly best selling
  const weeklyBestSelling = filteredProducts.slice(0, 10)

  // Rotate hero images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Banner - With Background Image & Gradient Overlay */}
      <section className="container mx-auto px-4 mb-16 relative">
        <div className="rounded-3xl overflow-hidden relative pb-16" style={{minHeight: "360px"}}>
          {/* Background Images with Fade Transition */}
          <div className="absolute inset-0 z-0">
            {HERO_IMAGES.map((image, index) => (
              <div
                key={image}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image}
                  alt={`Fresh Groceries ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Gradient Overlay - More transparent, softer on left */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent z-[1]" />

          {/* Content */}
          <div className="relative z-10 grid md:grid-cols-2 items-center" style={{minHeight: "360px"}}>
            {/* Left Content */}
            <div className="text-white p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
                We bring the store
                <br />
                to your door
              </h1>
              <p className="text-white mb-6 text-sm md:text-base max-w-md drop-shadow-md">
                Get organic produce and sustainably sourced groceries delivery at up to 4% off grocery.
              </p>
              <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-semibold px-8 rounded-lg shadow-lg">
                Shop now
              </Button>
            </div>

            {/* Right - Empty space to show background image */}
            <div className="hidden md:block h-full" />
          </div>

          {/* Decorative vegetable icons background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden z-[2]">
            <div className="absolute bottom-20 left-8 text-7xl">🥬</div>
            <div className="absolute bottom-28 left-32 text-6xl">🥕</div>
            <div className="absolute top-16 left-24 text-5xl">🌽</div>
          </div>

          {/* Curved Bottom Edge */}
          <div className="absolute bottom-0 left-0 right-0 h-20 z-[3]">
            <svg className="absolute bottom-0 w-full h-20" preserveAspectRatio="none" viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,80 Q360,0 720,40 T1440,80 L1440,80 L0,80 Z" className="fill-background" />
            </svg>
          </div>
        </div>
      </section>

      {/* Conditional: Show Stores OR Categories based on selection */}
      {!currentStoreId ? (
        /* Stores Strip - Shown when NO store is selected */
        <section className="container mx-auto px-4 mb-12 -mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Store</h2>
            <p className="text-gray-600 text-sm mt-1">Choose your preferred store</p>
          </div>
          <div className="relative">
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
              {stores.map((store) => (
                <Link
                  key={store.id}
                  href={`/store/${store.slug}`}
                  onClick={() => setSelectedStore(store.id)}
                  className="flex flex-col min-w-[160px] cursor-pointer group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex-shrink-0"
                >
                  {/* Top Image Section */}
                  <div className="w-full h-24 relative bg-gradient-to-br from-primary/5 to-secondary/5">
                    <Image
                      src={store.image}
                      alt={store.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                    {/* Store Logo Overlay */}
                    <div className="absolute bottom-2 left-3 w-12 h-12 rounded-lg overflow-hidden bg-white shadow-md border-2 border-white">
                      <Image
                        src={store.logo}
                        alt={`${store.name} logo`}
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                      />
                    </div>
                  </div>

                  {/* Bottom Info Section */}
                  <div className="p-4 pt-3">
                    <p className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">{store.name}</p>
                    <p className="text-xs text-gray-500">{store.deliveryTime}</p>
                  </div>
                </Link>
              ))}

              {/* Sticky See All Button */}
              <div className="flex-shrink-0 sticky right-0 ml-auto">
                <Link
                  href="/search"
                  className="flex flex-col items-center justify-center gap-3 min-w-[140px] h-full cursor-pointer group bg-secondary rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <ChevronRight className="h-7 w-7 text-primary" />
                  </div>
                  <p className="text-base font-bold text-primary">See all</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Categories Section - Shown when a store IS selected */
        <section className="container mx-auto px-4 mb-12 -mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-gray-600 text-sm mt-1">Explore products from {stores.find(s => s.id === currentStoreId)?.name}</p>
          </div>
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/search?category=${category.slug}`}
                  className="flex flex-col items-center min-w-[140px] cursor-pointer group flex-shrink-0"
                >
                  <div className="w-32 h-32 relative rounded-2xl overflow-hidden mb-3 bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center hover:scale-105 transition-transform">
                    <div className="text-6xl">{category.icon}</div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{category.name}</p>
                    <p className="text-xs text-gray-500">{category.subcategories?.[0] || ''}</p>
                  </div>
                </Link>
              ))}

              {/* See All Button */}
              <div className="flex-shrink-0 sticky right-0 ml-auto">
                <Link
                  href="/search"
                  className="flex flex-col items-center justify-center min-w-[120px] cursor-pointer group"
                >
                  <div className="w-32 h-32 rounded-2xl bg-secondary flex items-center justify-center mb-3 hover:scale-105 transition-transform">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                      <ChevronRight className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm font-bold text-primary">See all</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* You might need - Exact Match */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">You might need</h2>
          <Link href="/search" className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1">
            See more <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
