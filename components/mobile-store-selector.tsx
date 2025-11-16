"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSessionStore } from "@/lib/store/session-store"
import { useCartStore } from "@/lib/store/cart-store"
import { stores } from "@/lib/data/stores"
import { X, Check, Store } from "lucide-react"
import Image from "next/image"
import { ConfirmModal } from "@/components/confirm-modal"

interface MobileStoreSelectorProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileStoreSelector({ isOpen, onClose }: MobileStoreSelectorProps) {
  const router = useRouter()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [pendingStore, setPendingStore] = useState<{ id: string | null; slug: string } | null>(null)
  const setSelectedStore = useSessionStore((state) => state.setSelectedStore)
  const selectedStoreId = useSessionStore((state) => state.selectedStoreId)
  const cartStoreId = useCartStore((state) => state.getStoreId())
  const currentStoreId = cartStoreId || selectedStoreId

  const handleStoreSelect = (storeId: string, storeSlug: string) => {
    // If cart has items from a different store, show warning modal
    if (cartStoreId && cartStoreId !== storeId) {
      setPendingStore({ id: storeId, slug: storeSlug })
      setShowConfirmModal(true)
      onClose()
      return
    }

    setSelectedStore(storeId)
    onClose()
    // Navigate to store page
    router.push(`/store/${storeSlug}`)
  }

  const handleAllStoresSelect = () => {
    // Check if cart has items - if so, show confirmation modal
    if (cartStoreId) {
      setPendingStore({ id: null, slug: "/" })
      setShowConfirmModal(true)
      onClose()
      return
    }

    // No items in cart, proceed directly
    setSelectedStore(null)
    onClose()
    router.push("/")
  }

  const handleConfirmStoreSwitch = () => {
    if (!pendingStore) return

    // Clear cart
    useCartStore.getState().clearCart()

    // Set new store (null for "All Stores")
    setSelectedStore(pendingStore.id)

    // Navigate to store page or home
    if (pendingStore.id && pendingStore.slug.startsWith('/store/')) {
      router.push(pendingStore.slug)
    } else {
      router.push("/")
    }

    // Clean up
    setPendingStore(null)
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
            {/* All Stores Option */}
            <button
              onClick={handleAllStoresSelect}
              className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors border-2 border-primary/20 bg-primary/5"
            >
              <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-secondary shrink-0 flex items-center justify-center">
                <Store className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-bold text-primary">All Stores</p>
                <p className="text-sm text-gray-600">Browse products from all stores</p>
              </div>
              {!currentStoreId && (
                <Check className="h-6 w-6 text-primary shrink-0" />
              )}
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">or select a store</span>
              </div>
            </div>

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

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false)
          setPendingStore(null)
        }}
        onConfirm={handleConfirmStoreSwitch}
        title={
          pendingStore?.id === null
            ? "View All Stores?"
            : "Switch Store?"
        }
        description={
          pendingStore?.id === null
            ? "You have items in your cart from a specific store. Viewing all stores will clear your cart. Continue?"
            : "You have items in your cart from another store. Switching stores will clear your cart. Continue?"
        }
        confirmText={pendingStore?.id === null ? "View All Stores" : "Switch Store"}
        cancelText="Keep Shopping"
        variant="warning"
      />
    </>
  )
}
