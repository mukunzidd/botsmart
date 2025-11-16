"use client"

import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/lib/store/cart-store"
import { useSessionStore } from "@/lib/store/session-store"
import { stores } from "@/lib/data/stores"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Plus, Minus, Trash2, ShoppingBag, Store } from "lucide-react"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart, getStoreId } = useCartStore()
  const selectedStoreId = useSessionStore((state) => state.selectedStoreId)
  const totalPrice = getTotalPrice()
  const deliveryFee = 15.00 // Fixed delivery fee for now
  const finalTotal = totalPrice + deliveryFee

  // Get the current store from cart, or fall back to session selected store
  const currentStoreId = getStoreId() || selectedStoreId
  const currentStore = currentStoreId ? stores.find(s => s.id === currentStoreId) : null

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-white rounded-full p-8 mb-6 shadow-sm">
              <ShoppingBag className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 text-base">
              Add items from your favorite stores to get started
            </p>
            <Link href={currentStore ? `/store/${currentStore.slug}` : "/"}>
              <Button size="lg" className="px-8 py-6 text-base rounded-full">
                {currentStore ? `Browse ${currentStore.name}` : "Browse Stores"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-primary">My Cart</h1>
              <p className="text-gray-600 text-xs md:text-sm mt-1">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-gray-500 hover:text-red-600 hover:bg-red-50 text-xs md:text-sm"
            >
              <Trash2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              Clear all
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Store Info Section */}
            {currentStore && (
              <div className="bg-gradient-to-r from-primary/5 to-secondary/10 border-2 border-primary/10 rounded-2xl p-3 md:p-4 mb-3 md:mb-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 relative rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0 border-2 border-white">
                    <Image
                      src={currentStore.logo}
                      alt={currentStore.name}
                      fill
                      className="object-contain p-1.5 md:p-2"
                      sizes="(max-width: 768px) 48px, 64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Store className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">Shopping from</span>
                    </div>
                    <h3 className="font-bold text-base md:text-lg text-primary truncate">{currentStore.name}</h3>
                    <p className="text-xs md:text-sm text-gray-600 font-medium">Delivery in {currentStore.deliveryTime}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Items List */}
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl p-3 md:p-5 border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all"
              >
                <div className="flex gap-3 md:gap-4">
                  {/* Product Image */}
                  <Link href={`/product/${item.product.slug}`} className="relative h-20 w-20 md:h-24 md:w-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 hover:opacity-80 transition-opacity">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain p-1.5 md:p-2"
                      sizes="(max-width: 768px) 80px, 96px"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2 md:mb-3">
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.product.slug}`}>
                          <h3 className="font-bold text-sm md:text-base mb-1 text-gray-900 hover:text-primary transition-colors cursor-pointer line-clamp-2">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-xs md:text-sm text-gray-500">{item.product.unit}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 md:p-2 rounded-lg flex-shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-baseline gap-0.5 md:gap-1">
                        <span className="text-xl md:text-2xl font-bold text-primary">
                          {Math.floor(item.product.price * item.quantity)}
                        </span>
                        <span className="text-sm md:text-base font-semibold text-primary">
                          .{((item.product.price * item.quantity).toFixed(2).split('.')[1])}
                        </span>
                        <span className="text-xs md:text-sm text-gray-600">P</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 md:gap-3 bg-secondary/20 rounded-full px-2.5 md:px-4 py-1.5 md:py-2 flex-shrink-0">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="h-6 w-6 md:h-7 md:w-7 rounded-full bg-white hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-sm"
                        >
                          <Minus className="h-3 w-3 md:h-4 md:w-4" />
                        </button>
                        <span className="text-sm md:text-base font-bold min-w-[24px] md:min-w-[30px] text-center text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-6 w-6 md:h-7 md:w-7 rounded-full bg-white hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-sm"
                        >
                          <Plus className="h-3 w-3 md:h-4 md:w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 sticky top-24">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-primary">Order Summary</h2>

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm md:text-base text-gray-600">Subtotal</span>
                  <span className="text-sm md:text-base font-semibold text-gray-900">P{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm md:text-base text-gray-600">Delivery Fee</span>
                  <span className="text-sm md:text-base font-semibold text-gray-900">P{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 md:pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-base md:text-lg text-gray-900">Total</span>
                    <div className="flex items-baseline gap-0.5 md:gap-1">
                      <span className="font-bold text-2xl md:text-3xl text-primary">
                        {Math.floor(finalTotal)}
                      </span>
                      <span className="font-bold text-lg md:text-xl text-primary">
                        .{finalTotal.toFixed(2).split('.')[1]}
                      </span>
                      <span className="text-sm md:text-base text-gray-600">P</span>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full mb-3 rounded-xl py-5 md:py-6 bg-secondary hover:bg-secondary/90 text-primary font-bold text-sm md:text-base shadow-sm">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href={currentStore ? `/store/${currentStore.slug}` : "/"}>
                <Button variant="outline" size="lg" className="w-full rounded-xl py-5 md:py-6 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 font-semibold text-sm md:text-base">
                  {currentStore ? `Browse ${currentStore.name}` : "Continue Shopping"}
                </Button>
              </Link>

              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t">
                <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-secondary/10 rounded-xl">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5 md:mb-1">Free Delivery</p>
                    <p className="text-xs text-gray-600">On orders over P100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
