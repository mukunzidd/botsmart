"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Minus, AlertCircle } from "lucide-react"
import { Product } from "@/types"
import { useCartStore } from "@/lib/store/cart-store"
import { useState, useEffect } from "react"
import { StoreSwitchModal } from "@/components/store-switch-modal"
import { stores } from "@/lib/data/stores"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { addItem, getItemQuantity, updateQuantity, canAddProduct, getStoreId, clearCart } = useCartStore()
  const quantity = getItemQuantity(product.id)
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  const canAdd = canAddProduct(product)
  const cartStoreId = getStoreId()
  const currentStore = cartStoreId ? stores.find(s => s.id === cartStoreId) : null
  const productStore = stores.find(s => s.id === product.storeId)

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddItem = () => {
    const added = addItem(product)
    if (!added) {
      // Show modal instead of error
      setShowModal(true)
    }
  }

  const handleClearAndAdd = () => {
    clearCart()
    addItem(product)
    setShowModal(false)
  }

  const handleGoToCart = () => {
    setShowModal(false)
    router.push('/cart')
  }

  const handleContinueShopping = () => {
    setShowModal(false)
  }

  return (
    <div className="bg-white rounded-t-xl rounded-b-3xl p-0 transition-all group shadow-sm hover:shadow-md border border-gray-100">
      {/* Product Image - Clickable */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square mb-3 overflow-hidden bg-white cursor-pointer rounded-t-xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="text-center space-y-1 px-3 pb-3">
        {/* Product Name - Clickable */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px] hover:text-primary cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* Store Name */}
        {productStore && (
          <p className="text-xs text-gray-500">({productStore.name})</p>
        )}

        {/* Unit */}
        <p className="text-xs text-gray-400">{product.unit}</p>

        {/* Price */}
        <div className="flex items-baseline justify-center gap-0.5 pt-1">
          <span className="text-2xl font-bold text-gray-900">
            {Math.floor(product.price)}
          </span>
          <span className="text-sm font-medium text-gray-900">
            .{product.price.toFixed(2).split('.')[1]}
          </span>
          <span className="text-xs text-gray-500">P</span>
        </div>

        {/* Add Button / Quantity Controls */}
        {quantity === 0 ? (
          <button
            onClick={handleAddItem}
            disabled={!mounted || !canAdd}
            className={`w-full h-11 rounded-2xl flex items-center justify-center transition-colors font-semibold ${
              mounted && canAdd
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Plus className="h-5 w-5" />
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3 bg-secondary/30 rounded-2xl px-4 py-2.5">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="h-8 w-8 rounded-full border-2 border-primary bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Minus className="h-4 w-4 text-primary" />
            </button>
            <span className="text-base font-bold min-w-[28px] text-center text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="h-8 w-8 rounded-full border-2 border-primary bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Store Switch Modal */}
      {currentStore && productStore && (
        <StoreSwitchModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          currentStoreName={currentStore.name}
          newStoreName={productStore.name}
          onContinueShopping={handleContinueShopping}
          onGoToCart={handleGoToCart}
          onClearAndAdd={handleClearAndAdd}
        />
      )}
    </div>
  )
}
