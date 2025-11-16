"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Home, Search } from "lucide-react"
import { useSessionStore } from "@/lib/store/session-store"
import { useCartStore } from "@/lib/store/cart-store"
import { stores } from "@/lib/data/stores"
import { useEffect, useState } from "react"

export default function NotFound() {
  const selectedStoreId = useSessionStore((state) => state.selectedStoreId)
  const cartStoreId = useCartStore((state) => state.getStoreId())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prioritize cart store, then session store
  const currentStoreId = cartStoreId || selectedStoreId
  const currentStore = mounted && currentStoreId ? stores.find(s => s.id === currentStoreId) : null

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pb-20 md:pb-8">
      <div className="max-w-lg w-full text-center">
        {/* Large 404 */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">404</h1>
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 rounded-full p-6">
              <ShoppingCart className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Cheeky Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Oops! Looks like you're lost
        </h2>
        <p className="text-gray-600 mb-2">
          We couldn't find what you're looking for. Maybe it's out of stock? 🤔
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Don't worry though, we've got plenty of other great products waiting for you!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-primary font-semibold gap-2 rounded-xl px-6">
              <Home className="h-5 w-5" />
              Go Home
            </Button>
          </Link>

          {currentStore ? (
            <Link href={`/store/${currentStore.slug}`}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 hover:bg-primary hover:text-white font-semibold gap-2 rounded-xl px-6">
                <ShoppingCart className="h-5 w-5" />
                Shop at {currentStore.name}
              </Button>
            </Link>
          ) : (
            <Link href="/search">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 hover:bg-primary hover:text-white font-semibold gap-2 rounded-xl px-6">
                <Search className="h-5 w-5" />
                Browse Products
              </Button>
            </Link>
          )}
        </div>

        {/* Fun fact */}
        <div className="mt-12 p-4 bg-secondary/10 rounded-xl">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-primary">Fun fact:</span> Did you know we deliver in 15 minutes?
            Start shopping and see for yourself! ⚡
          </p>
        </div>
      </div>
    </div>
  )
}
