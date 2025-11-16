"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { searchProducts } from "@/lib/data/products"
import { stores } from "@/lib/data/stores"
import { categories } from "@/lib/data/categories"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Search as SearchIcon } from "lucide-react"

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [selectedTab, setSelectedTab] = useState<"all" | "products" | "stores" | "categories">("all")
  const [sortBy, setSortBy] = useState<"relevance" | "price-low" | "price-high" | "name">("relevance")
  const [priceRange, setPriceRange] = useState<"all" | "0-50" | "50-100" | "100+">("all")

  // Search products
  const productResults = searchProducts(query)

  // Search stores
  const storeResults = stores.filter((store) =>
    store.name.toLowerCase().includes(query.toLowerCase()) ||
    store.categories.some((cat) => cat.toLowerCase().includes(query.toLowerCase()))
  )

  // Search categories
  const categoryResults = categories.filter((category) =>
    category.name.toLowerCase().includes(query.toLowerCase())
  )

  const totalResults = productResults.length + storeResults.length + categoryResults.length

  // Filter products by price range
  let filteredProductsByPrice = productResults
  if (priceRange !== "all") {
    filteredProductsByPrice = productResults.filter((product) => {
      if (priceRange === "0-50") return product.price < 50
      if (priceRange === "50-100") return product.price >= 50 && product.price < 100
      if (priceRange === "100+") return product.price >= 100
      return true
    })
  }

  // Sort products
  const sortedProducts = [...filteredProductsByPrice].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "name") return a.name.localeCompare(b.name)
    return 0 // relevance - keep original order
  })

  const filteredProducts =
    selectedTab === "all" || selectedTab === "products" ? sortedProducts : []
  const filteredStores =
    selectedTab === "all" || selectedTab === "stores" ? storeResults : []
  const filteredCategories =
    selectedTab === "all" || selectedTab === "categories" ? categoryResults : []

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Search Results</h1>
          <p className="text-muted-foreground text-sm">
            {query ? (
              <>
                Showing {totalResults} {totalResults === 1 ? "result" : "results"} for "
                <span className="font-semibold text-foreground">{query}</span>"
              </>
            ) : (
              "Enter a search term to find products and stores"
            )}
          </p>
        </div>

        {query && (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b">
              <Button
                variant="ghost"
                className={`rounded-b-none ${
                  selectedTab === "all"
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => setSelectedTab("all")}
              >
                All ({totalResults})
              </Button>
              <Button
                variant="ghost"
                className={`rounded-b-none ${
                  selectedTab === "products"
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => setSelectedTab("products")}
              >
                Products ({productResults.length})
              </Button>
              <Button
                variant="ghost"
                className={`rounded-b-none ${
                  selectedTab === "stores"
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => setSelectedTab("stores")}
              >
                Stores ({storeResults.length})
              </Button>
              <Button
                variant="ghost"
                className={`rounded-b-none ${
                  selectedTab === "categories"
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => setSelectedTab("categories")}
              >
                Categories ({categoryResults.length})
              </Button>
            </div>

            {/* Filters and Sorting - Only show for products */}
            {(selectedTab === "all" || selectedTab === "products") && productResults.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Price Range:</span>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value as any)}
                    className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-50">Under P50</option>
                    <option value="50-100">P50 - P100</option>
                    <option value="100+">P100+</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A-Z</option>
                  </select>
                </div>

                {(priceRange !== "all" || sortBy !== "relevance") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setPriceRange("all")
                      setSortBy("relevance")
                    }}
                    className="text-sm"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}

            {/* Stores Section */}
            {filteredStores.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Stores</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredStores.map((store) => (
                    <Link key={store.id} href={`/store/${store.slug}`}>
                      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="relative h-32 bg-gray-50">
                          <Image
                            src={store.image}
                            alt={store.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {store.featured && (
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-orange-500 text-white">Featured</Badge>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{store.name}</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {store.categories.slice(0, 3).map((cat, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{store.deliveryTime}</span>
                            <span>Min: P{store.minOrder}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Section */}
            {filteredCategories.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      {category.subcategories && category.subcategories.length > 0 && (
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {category.subcategories.join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Products Section */}
            {filteredProducts.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {totalResults === 0 && (
              <div className="text-center py-16">
                <div className="bg-muted rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <SearchIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">No results found</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any products or stores matching "{query}"
                </p>
                <Link href="/">
                  <Button>Browse All Stores</Button>
                </Link>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!query && (
          <div className="text-center py-16">
            <div className="bg-muted rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <SearchIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Start searching</h2>
            <p className="text-muted-foreground">
              Use the search bar above to find products and stores
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
