import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Address {
  id: string
  label: string
  street: string
  city: string
  area: string
  isDefault: boolean
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  addresses: Address[]
  preferences: {
    notifications: boolean
    newsletter: boolean
    language: string
  }
}

interface UserStore {
  user: UserProfile | null
  isAuthenticated: boolean
  login: (profile: UserProfile) => void
  logout: () => void
  updateProfile: (updates: Partial<UserProfile>) => void
  addAddress: (address: Omit<Address, 'id'>) => void
  updateAddress: (id: string, updates: Partial<Address>) => void
  removeAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (profile) => {
        set({ user: profile, isAuthenticated: true })
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateProfile: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }))
      },

      addAddress: (address) => {
        set((state) => {
          if (!state.user) return state

          const newAddress: Address = {
            ...address,
            id: `addr-${Date.now()}`,
          }

          // If this is the first address, make it default
          if (state.user.addresses.length === 0) {
            newAddress.isDefault = true
          }

          return {
            user: {
              ...state.user,
              addresses: [...state.user.addresses, newAddress],
            },
          }
        })
      },

      updateAddress: (id, updates) => {
        set((state) => {
          if (!state.user) return state

          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.map((addr) =>
                addr.id === id ? { ...addr, ...updates } : addr
              ),
            },
          }
        })
      },

      removeAddress: (id) => {
        set((state) => {
          if (!state.user) return state

          const addresses = state.user.addresses.filter((addr) => addr.id !== id)

          // If we removed the default address, set the first remaining as default
          const hadDefault = state.user.addresses.find((a) => a.id === id)?.isDefault
          if (hadDefault && addresses.length > 0) {
            addresses[0].isDefault = true
          }

          return {
            user: {
              ...state.user,
              addresses,
            },
          }
        })
      },

      setDefaultAddress: (id) => {
        set((state) => {
          if (!state.user) return state

          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
              })),
            },
          }
        })
      },
    }),
    {
      name: 'botsmart-user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
