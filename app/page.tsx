"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { StoreCard } from "@/components/store-card"
import { stores } from "@/lib/data/stores"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Store as StoreIcon, Star, Clock, MapPin } from "lucide-react"
import { Store, StoreSortType } from "@/types"

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<StoreSortType>("featured")

  // Filter stores
  const filteredStores = stores.filter(store => {
    if (selectedFilter === "all") return true
    if (selectedFilter === "open") return store.isOpen
    if (selectedFilter === "featured") return store.featured
    // Filter by category
    return store.categories.some(cat =>
      cat.toLowerCase().includes(selectedFilter.toLowerCase())
    )
  })

  // Sort stores
  const sortedStores = [...filteredStores].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "delivery_time":
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
      case "distance":
        return parseFloat(a.distance) - parseFloat(b.distance)
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      default:
        return 0
    }
  })

  const filters = [
    { id: "all", label: "All Stores", icon: StoreIcon },
    { id: "featured", label: "Featured", icon: Star },
    { id: "open", label: "Open Now", icon: Clock },
    { id: "supermarket", label: "Supermarkets", icon: StoreIcon },
    { id: "produce", label: "Fresh Produce", icon: StoreIcon },
    { id: "butchery", label: "Butchery", icon: StoreIcon },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-b">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Left Content */}
            <div className="md:col-span-3 max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Shop <span className="text-primary">Fresh</span>
                <br />
                Save More
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                Fresh groceries delivered to your door step from your favorite stores. Anytime, Anywhere.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Currently serving Gaborone & Francistown</span>
              </div>
            </div>

            {/* Right - Bento Grid with Parallax */}
            <div className="hidden md:block md:col-span-2 relative h-[250px] md:h-[300px] overflow-hidden">
              {/* Column 1 - Slow scroll */}
              <div className="absolute left-0 w-1/2 pr-1.5 animate-scroll-slow">
                <div className="flex flex-col gap-3">
                  {/* Large item */}
                  <div className="relative h-40 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=300&h=400&fit=crop"
                      alt="Fresh Vegetables"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  {/* Small item */}
                  <div className="relative h-24 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop"
                      alt="Bananas"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  {/* Medium item */}
                  <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop"
                      alt="Apples"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  {/* Duplicate for loop */}
                  <div className="relative h-40 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=300&h=400&fit=crop"
                      alt="Fresh Vegetables"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                </div>
              </div>

              {/* Column 2 - Fast scroll */}
              <div className="absolute right-0 w-1/2 pl-1.5 animate-scroll-fast">
                <div className="flex flex-col gap-3">
                  {/* Small item */}
                  <div className="relative h-28 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=200&h=200&fit=crop"
                      alt="Fresh Produce Market"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  {/* Large item */}
                  <div className="relative h-36 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=200&h=300&fit=crop"
                      alt="Oranges"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  {/* Medium item */}
                  <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop"
                      alt="Yogurt"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  {/* Duplicate for loop */}
                  <div className="relative h-28 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=200&h=200&fit=crop"
                      alt="Fresh Produce Market"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Browse Stores</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as StoreSortType)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="rating">Rating</option>
                <option value="delivery_time">Delivery Time</option>
                <option value="distance">Distance</option>
              </select>
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon
              return (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {filter.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Store count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {sortedStores.length} {sortedStores.length === 1 ? "store" : "stores"} available
          </p>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>

        {/* Empty state */}
        {sortedStores.length === 0 && (
          <div className="text-center py-12">
            <StoreIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No stores found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters
            </p>
            <Button onClick={() => setSelectedFilter("all")}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
