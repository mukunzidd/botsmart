"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Store, ChevronDown, Check, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSessionStore } from "@/lib/store/session-store"
import { useCartStore } from "@/lib/store/cart-store"
import { stores } from "@/lib/data/stores"
import Image from "next/image"
import Link from "next/link"

const LOCATIONS = [
  { city: 'Gaborone', areas: ['CBD', 'Extension 2', 'Block 3', 'Broadhurst', 'Gaborone West'] },
  { city: 'Francistown', areas: ['Main Mall', 'Donga', 'Bluetown', 'Gerald'] },
]

export function LocationStoreSelector() {
  const router = useRouter()
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [showStorePicker, setShowStorePicker] = useState(false)
  const [storeSearch, setStoreSearch] = useState("")
  const [mounted, setMounted] = useState(false)

  const deliveryLocation = useSessionStore((state) => state.deliveryLocation)
  const setDeliveryLocation = useSessionStore((state) => state.setDeliveryLocation)
  const selectedStoreId = useSessionStore((state) => state.selectedStoreId)
  const setSelectedStore = useSessionStore((state) => state.setSelectedStore)
  const cartStoreId = useCartStore((state) => state.getStoreId())

  // Prioritize cart store (if items in cart), otherwise use session selected store
  const currentStoreId = cartStoreId || selectedStoreId
  const currentStore = currentStoreId ? stores.find(s => s.id === currentStoreId) : null

  // Fix hydration mismatch by only showing store after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLocationSelect = (city: string, area: string) => {
    setDeliveryLocation({ city, area })
    setShowLocationPicker(false)
  }

  const handleStoreSelect = (storeId: string) => {
    setSelectedStore(storeId)
    setShowStorePicker(false)
  }

  // Group stores by area/location
  const groupedStores = stores.reduce((acc, store) => {
    const area = store.distance // Using distance as a proxy for area grouping
    if (!acc[area]) {
      acc[area] = []
    }
    acc[area].push(store)
    return acc
  }, {} as Record<string, typeof stores>)

  // Filter stores by search
  const filteredStores = storeSearch
    ? stores.filter(s => s.name.toLowerCase().includes(storeSearch.toLowerCase()))
    : stores

  return (
    <div className="flex items-center gap-2">
      {/* Delivery Location Selector */}
      <div className="relative">
        <button
          onClick={() => setShowLocationPicker(!showLocationPicker)}
          className="flex items-center gap-2 px-3 py-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg transition-colors"
        >
          <MapPin className="h-4 w-4 text-secondary" />
          <div className="flex flex-col items-start">
            <span className="text-xs text-secondary font-medium">Deliver to</span>
            <span className="text-sm font-bold text-white">{deliveryLocation.city}, {deliveryLocation.area}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-secondary" />
        </button>

        {showLocationPicker && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowLocationPicker(false)} />
            <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl z-50 p-4 max-h-96 overflow-y-auto">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Delivery Location</h3>
              {LOCATIONS.map((location) => (
                <div key={location.city} className="mb-4">
                  <p className="text-sm font-bold text-primary mb-2">{location.city}</p>
                  <div className="space-y-1">
                    {location.areas.map((area) => (
                      <button
                        key={area}
                        onClick={() => handleLocationSelect(location.city, area)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm flex items-center justify-between transition-colors"
                      >
                        <span className="text-gray-700">{area}</span>
                        {deliveryLocation.city === location.city && deliveryLocation.area === area && (
                          <Check className="h-4 w-4 text-secondary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Store Picker */}
      <div className="relative">
        <button
          onClick={() => setShowStorePicker(!showStorePicker)}
          className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <Store className="h-4 w-4 text-white" />
          <div className="flex flex-col items-start">
            <span className="text-xs text-white/70 font-medium">Shop from</span>
            <span className="text-sm font-bold text-white">
              {mounted ? (currentStore ? currentStore.name : 'Select Store') : 'Select Store'}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-white" />
        </button>

        {showStorePicker && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowStorePicker(false)} />
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl z-50 max-h-96 overflow-hidden flex flex-col">
              {/* Search Header */}
              <div className="p-4 border-b">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Select Store</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search stores..."
                    value={storeSearch}
                    onChange={(e) => setStoreSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Stores List */}
              <div className="overflow-y-auto p-4">
                {Object.entries(groupedStores).map(([area, areaStores]) => {
                  const filtered = areaStores.filter(s =>
                    s.name.toLowerCase().includes(storeSearch.toLowerCase())
                  )
                  if (filtered.length === 0) return null

                  return (
                    <div key={area} className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">{area} away</p>
                      <div className="space-y-2">
                        {filtered.map((store) => (
                          <button
                            key={store.id}
                            onClick={() => {
                              handleStoreSelect(store.id)
                              // Use setTimeout to ensure state is updated before navigation
                              setTimeout(() => {
                                window.location.href = `/store/${store.slug}`
                              }, 0)
                            }}
                            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              <Image
                                src={store.logo}
                                alt={store.name}
                                fill
                                className="object-contain p-1"
                                sizes="48px"
                              />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                              <p className="font-semibold text-gray-900 text-sm truncate">{store.name}</p>
                              <p className="text-xs text-gray-500">{store.deliveryTime}</p>
                            </div>
                            {currentStoreId === store.id && (
                              <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
