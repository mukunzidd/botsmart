"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus, Minus, AlertCircle } from "lucide-react"
import { Product } from "@/types"
import { useCartStore } from "@/lib/store/cart-store"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, getItemQuantity, updateQuantity, canAddProduct } = useCartStore()
  const quantity = getItemQuantity(product.id)
  const [showError, setShowError] = useState(false)

  const canAdd = canAddProduct(product)

  const handleAddItem = () => {
    const added = addItem(product)
    if (!added) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
  }

  return (
    <div className="bg-white rounded-lg p-0 transition-all group">
      {/* Product Image - Clickable */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square mb-3 overflow-hidden bg-white cursor-pointer">
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
      <div className="text-center space-y-1 px-2 pb-3">
        {/* Product Name - Clickable */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm text-gray-900 line-clamp-2 min-h-[40px] hover:text-primary cursor-pointer">
            {product.name}
          </h3>
        </Link>

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
        {showError && (
          <div className="text-xs text-red-500 text-center mb-1 flex items-center justify-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>Different store</span>
          </div>
        )}

        {quantity === 0 ? (
          <button
            onClick={handleAddItem}
            disabled={!canAdd}
            className={`w-full h-10 rounded-lg flex items-center justify-center transition-colors ${
              canAdd
                ? "bg-accent hover:bg-accent/80 text-gray-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Plus className="h-5 w-5" />
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 bg-secondary rounded-full px-3 py-2">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="h-7 w-7 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <Minus className="h-4 w-4 text-white" />
            </button>
            <span className="text-base font-semibold min-w-[24px] text-center text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="h-7 w-7 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
