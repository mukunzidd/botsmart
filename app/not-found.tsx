"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Home, Search } from "lucide-react"
import { useSessionStore } from "@/lib/store/session-store"
import { useCartStore } from "@/lib/store/cart-store"
import { stores } from "@/lib/data/stores"
import { useEffect, useState } from "react"

const FUN_FACTS = [
  "Did you know we deliver in 15 minutes? Start shopping and see for yourself! ⚡",
  "Fun fact: Fresh groceries taste better when delivered to your door! 🥬",
  "Did you know? You can shop from multiple stores on BotsMart! 🛒",
  "Pro tip: Save your favorite stores for faster shopping next time! ⭐",
  "Did you know? We have the freshest produce in Gaborone! 🍎",
  "Fun fact: You can track your order in real-time! 📍",
]

export default function NotFound() {
  const selectedStoreId = useSessionStore((state) => state.selectedStoreId)
  const cartStoreId = useCartStore((state) => state.getStoreId())
  const [mounted, setMounted] = useState(false)
  const [randomFact, setRandomFact] = useState("")

  useEffect(() => {
    setMounted(true)
    setRandomFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)])
  }, [])

  // Prioritize cart store, then session store
  const currentStoreId = cartStoreId || selectedStoreId
  const currentStore = mounted && currentStoreId ? stores.find(s => s.id === currentStoreId) : null

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background flex items-center justify-center px-4 py-8 pb-24 md:pb-12">
      <div className="max-w-lg w-full text-center">
        {/* Fun fact - At the top */}
        {mounted && randomFact && (
          <div className="mb-6 p-3 bg-secondary/10 rounded-xl">
            <p className="text-sm text-gray-600">
              {randomFact}
            </p>
          </div>
        )}

        {/* Large 404 */}
        <div className="mb-6">
          <h1 className="text-7xl md:text-8xl font-bold text-primary/20 mb-3">404</h1>
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 rounded-full p-5">
              <ShoppingCart className="h-12 w-12 md:h-14 md:w-14 text-primary" />
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Page not found
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We couldn't find what you're looking for. Let's get you back on track!
          </p>
        </div>

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
      </div>
    </div>
  )
}
