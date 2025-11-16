"use client"

import { useRouter } from "next/navigation"
import { useSessionStore } from "@/lib/store/session-store"
import { useCartStore } from "@/lib/store/cart-store"
import { stores } from "@/lib/data/stores"
import { X, Check } from "lucide-react"
import Image from "next/image"

interface MobileStoreSelectorProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileStoreSelector({ isOpen, onClose }: MobileStoreSelectorProps) {
  const router = useRouter()
  const setSelectedStore = useSessionStore((state) => state.setSelectedStore)
  const selectedStoreId = useSessionStore((state) => state.selectedStoreId)
  const cartStoreId = useCartStore((state) => state.getStoreId())
  const currentStoreId = cartStoreId || selectedStoreId

  const handleStoreSelect = (storeId: string, storeSlug: string) => {
    // If cart has items from a different store, show warning
    if (cartStoreId && cartStoreId !== storeId) {
      const confirmSwitch = window.confirm(
        "You have items in your cart from another store. Switching stores will clear your cart. Continue?"
      )
      if (!confirmSwitch) {
        onClose()
        return
      }
      // Clear cart if user confirms
      useCartStore.getState().clearCart()
    }

    setSelectedStore(storeId)
    onClose()
    // Navigate to store page
    router.push(`/store/${storeSlug}`)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 md:hidden"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 md:hidden max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-xl font-bold">Select Store</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stores List */}
        <div className="overflow-y-auto p-4">
          <div className="space-y-2">
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => handleStoreSelect(store.id, store.slug)}
                className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors border"
              >
                <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={store.logo}
                    alt={store.name}
                    fill
                    className="object-contain p-2"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{store.name}</p>
                  <p className="text-sm text-gray-500">{store.deliveryTime} • {store.distance} away</p>
                </div>
                {currentStoreId === store.id && (
                  <Check className="h-6 w-6 text-secondary shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
