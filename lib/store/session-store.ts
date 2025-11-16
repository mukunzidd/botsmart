import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SessionStore {
  selectedStoreId: string | null
  deliveryLocation: {
    city: string
    area: string
    address?: string
  }
  setSelectedStore: (storeId: string | null) => void
  setDeliveryLocation: (location: { city: string; area: string; address?: string }) => void
  clearSession: () => void
}

const DEFAULT_LOCATION = {
  city: 'Gaborone',
  area: 'CBD',
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      selectedStoreId: null,
      deliveryLocation: DEFAULT_LOCATION,

      setSelectedStore: (storeId) => set({ selectedStoreId: storeId }),

      setDeliveryLocation: (location) => set({ deliveryLocation: location }),

      clearSession: () => set({
        selectedStoreId: null,
        deliveryLocation: DEFAULT_LOCATION
      }),
    }),
    {
      name: 'botsmart-session-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
