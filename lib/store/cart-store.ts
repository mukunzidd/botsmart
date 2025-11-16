import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItem, Product } from '@/types'
import { stores } from '@/lib/data/stores'

interface CartStore {
  items: CartItem[]
  currentStoreId: string | null
  addItem: (product: Product, quantity?: number) => boolean
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getItemQuantity: (productId: string) => number
  canAddProduct: (product: Product) => boolean
  getStoreId: () => string | null
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      currentStoreId: null,

      canAddProduct: (product) => {
        const currentStore = get().currentStoreId
        // If cart is empty, can add any product
        if (!currentStore) return true
        // If cart has items, can only add from same store
        return product.storeId === currentStore
      },

      addItem: (product, quantity = 1) => {
        const canAdd = get().canAddProduct(product)

        if (!canAdd) {
          return false // Indicates product is from different store
        }

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          )

          if (existingItem) {
            // Update quantity if item already exists
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }

          // Add new item and set store ID
          const store = stores.find(s => s.id === product.storeId)
          return {
            items: [...state.items, {
              product,
              quantity,
              storeId: product.storeId,
              storeName: store?.name || 'Unknown Store'
            }],
            currentStoreId: product.storeId,
          }
        })

        return true
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => {
        set({ items: [], currentStoreId: null })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },

      getItemQuantity: (productId) => {
        const item = get().items.find((item) => item.product.id === productId)
        return item ? item.quantity : 0
      },

      getStoreId: () => {
        return get().currentStoreId
      },
    }),
    {
      name: 'botsmart-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
