"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/data/products"
import { stores } from "@/lib/data/stores"
import { useSessionStore } from "@/lib/store/session-store"
import { useCartStore } from "@/lib/store/cart-store"

interface SearchDropdownProps {
  searchQuery: string
  onClose: () => void
}

export function SearchDropdown({ searchQuery, onClose }: SearchDropdownProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [searchProducts, setSearchProducts] = useState<typeof products>([])
  const [searchStores, setSearchStores] = useState<typeof stores>([])

  const selectedStoreId = useSessionStore((state) => state.selectedStoreId)
  const cartStoreId = useCartStore((state) => state.getStoreId())

  // Prioritize cart store, then session store
  const currentStoreId = cartStoreId || selectedStoreId

  useEffect(() => {
    if (searchQuery.length === 0) {
      // Show recommended searches when empty
      setSuggestions([])
      setSearchProducts([])
      setSearchStores([])
      return
    }

    // Show loading state
    setIsLoading(true)

    // Simulate search delay
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase()

      // Search suggestions
      const suggestionList = [
        `${searchQuery} meat`,
        `${searchQuery} vegetables`,
        `${searchQuery} packaging`,
        `Meat ball full ${searchQuery} with milk`
      ]
      setSuggestions(suggestionList)

      // Search products - prioritize current store
      let foundProducts = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      )

      if (currentStoreId) {
        // Show products from selected store first, then others
        const storeProducts = foundProducts.filter(p => p.storeId === currentStoreId)
        const otherProducts = foundProducts.filter(p => p.storeId !== currentStoreId)
        foundProducts = [...storeProducts, ...otherProducts]
      }

      setSearchProducts(foundProducts.slice(0, 5))

      // Search stores
      const foundStores = stores.filter(s =>
        s.name.toLowerCase().includes(query)
      ).slice(0, 2)
      setSearchStores(foundStores)

      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery, currentStoreId])

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl p-6 z-50">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    )
  }

  if (searchQuery.length === 0) {
    // Get featured products - prioritize from selected store
    let featuredProducts = products.filter(p => p.featured)
    if (currentStoreId) {
      const storeFeatures = featuredProducts.filter(p => p.storeId === currentStoreId)
      featuredProducts = storeFeatures.length > 0 ? storeFeatures : featuredProducts
    }
    featuredProducts = featuredProducts.slice(0, 1)

    // Get popular product names and find them - prioritize selected store
    const popularProductNames = ['Tomatoes', 'Bananas', 'Milk', 'Bread', 'Chicken', 'Chips']
    const popularProductsFromStores: typeof products = []

    popularProductNames.forEach(name => {
      // Find all products with this name
      const productsWithName = products.filter(p =>
        p.name.toLowerCase().includes(name.toLowerCase())
      )

      if (productsWithName.length > 0) {
        // If store is selected, prioritize products from that store
        if (currentStoreId) {
          const fromCurrentStore = productsWithName.find(p => p.storeId === currentStoreId)
          if (fromCurrentStore) {
            popularProductsFromStores.push(fromCurrentStore)
          } else {
            // If not in current store, get cheapest from other stores
            const sortedByPrice = [...productsWithName].sort((a, b) => a.price - b.price)
            popularProductsFromStores.push(sortedByPrice[0])
          }
        } else {
          // No store selected, just show cheapest
          const sortedByPrice = [...productsWithName].sort((a, b) => a.price - b.price)
          popularProductsFromStores.push(sortedByPrice[0])
        }
      }
    })

    const currentStoreName = currentStoreId ? stores.find(s => s.id === currentStoreId)?.name : null

    // Recommended searches (when search is empty or just clicked)
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl p-6 z-50 max-w-md">
        {featuredProducts.length > 0 && (
          <>
            <h3 className="font-semibold text-gray-900 mb-4">
              {currentStoreName ? `From ${currentStoreName}` : 'Recommended'}
            </h3>
            <div className="space-y-3">
              {featuredProducts.map(product => {
                const productStore = stores.find(s => s.id === product.storeId)
                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-1"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        {Math.floor(product.price)}.<sup>{product.price.toFixed(2).split('.')[1]}P</sup>
                        {!currentStoreName && productStore && <span className="ml-2">• {productStore.name}</span>}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}

        <h3 className="font-semibold text-gray-900 mt-6 mb-4">
          {currentStoreName ? `Popular at ${currentStoreName}` : 'Popular products'}
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {popularProductsFromStores.map((product) => {
            const productStore = stores.find(s => s.id === product.storeId)
            const isFromCurrentStore = currentStoreId && product.storeId === currentStoreId
            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={onClose}
              >
                <div className="w-8 h-8 relative rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-0.5"
                    sizes="32px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">
                    {Math.floor(product.price)}.<sup>{product.price.toFixed(2).split('.')[1]}P</sup>
                  </p>
                  {!isFromCurrentStore && productStore && (
                    <p className="text-xs text-gray-400 truncate">{productStore.name}</p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  // Search results dropdown (when typing)
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl z-50 max-w-2xl">
      <div className="grid grid-cols-2 divide-x">
        {/* Left - Suggestions */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Suggestions</h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, idx) => (
              <Link
                key={idx}
                href={`/search?q=${encodeURIComponent(suggestion)}`}
                className="block text-sm text-gray-700 hover:text-primary py-1"
                onClick={onClose}
              >
                {suggestion}
              </Link>
            ))}
          </div>

          {searchStores.length > 0 && (
            <>
              <h3 className="font-semibold text-gray-900 mt-6 mb-4">Stores</h3>
              <div className="space-y-3">
                {searchStores.map((store) => (
                  <Link
                    key={store.id}
                    href={`/store/${store.slug}`}
                    className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    <div className="w-10 h-10 relative bg-white rounded-lg overflow-hidden flex-shrink-0 border">
                      <Image
                        src={store.logo}
                        alt={store.name}
                        fill
                        className="object-contain p-1"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{store.name}</p>
                      <p className="text-xs text-gray-500">Delivery in {store.deliveryTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right - Products */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Products
            {currentStoreId && (
              <span className="ml-2 text-xs text-primary font-normal">
                (from {stores.find(s => s.id === currentStoreId)?.name} first)
              </span>
            )}
          </h3>
          <div className="space-y-3">
            {searchProducts.map((product) => {
              const isFromCurrentStore = currentStoreId && product.storeId === currentStoreId
              const productStore = stores.find(s => s.id === product.storeId)
              const isFromOtherStore = currentStoreId && !isFromCurrentStore

              return (
                <Link
                  key={product.id}
                  href={`/search?q=${product.name}`}
                  className={`flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors ${
                    isFromCurrentStore ? 'bg-secondary/5 border border-secondary/20' : ''
                  } ${isFromOtherStore ? 'border border-orange-200' : ''}`}
                  onClick={onClose}
                >
                  <div className="w-12 h-12 relative bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {Math.floor(product.price)}.<sup className="text-xs">{product.price.toFixed(2).split('.')[1]}P</sup>
                    </p>
                    {isFromOtherStore && productStore && (
                      <p className="text-xs text-orange-600 font-medium mt-0.5">
                        Available at {productStore.name}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>

          {searchProducts.length > 0 && (
            <Link
              href={`/search?q=${searchQuery}`}
              className="block text-center text-sm text-orange-500 hover:text-orange-600 font-medium mt-4"
              onClick={onClose}
            >
              View all results
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
