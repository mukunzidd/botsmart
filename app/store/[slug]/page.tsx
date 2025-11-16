"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getStoreBySlug } from "@/lib/data/stores"
import { getProductsByStore } from "@/lib/data/products"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, MapPin } from "lucide-react"
import { useSessionStore } from "@/lib/store/session-store"

export default function StorePage() {
  const params = useParams()
  const slug = params.slug as string
  const store = getStoreBySlug(slug)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const setSelectedStore = useSessionStore((state) => state.setSelectedStore)

  // Set the selected store when page loads
  useEffect(() => {
    if (store) {
      setSelectedStore(store.id)
    }
  }, [store, setSelectedStore])

  if (!store) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Store not found</h1>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    )
  }

  const allProducts = getProductsByStore(store.id)
  const filteredProducts = selectedCategory === "all"
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory)

  const storeCategories = ["all", ...new Set(allProducts.map(p => p.category))]

  return (
    <div className="min-h-screen bg-background">
      {/* Store Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start gap-4">
            {/* Store Logo */}
            <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={store.logo}
                alt={store.name}
                fill
                className="object-contain p-2"
                sizes="80px"
              />
            </div>

            {/* Store Info */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{store.name}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-foreground">{store.rating}</span>
                  <span>({store.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{store.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{store.distance}</span>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {store.categories.slice(0, 4).map((cat, idx) => (
                  <Badge key={idx} variant="secondary" className="whitespace-nowrap flex-shrink-0">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Store Status */}
            <div className="text-right">
              <Badge
                variant={store.isOpen ? "default" : "secondary"}
                className="mb-2"
              >
                {store.isOpen ? "Open Now" : "Closed"}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {store.operatingHours.open} - {store.operatingHours.close}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Min order: P {store.minOrder}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation - Sticky */}
      <div className="sticky top-16 bg-white border-b z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {storeCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category === "all" ? "All Products" : category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            {selectedCategory === "all" ? "All Products" : selectedCategory}
          </h2>
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}
