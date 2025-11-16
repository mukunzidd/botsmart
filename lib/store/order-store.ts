import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Order } from '@/types'

interface OrderStore {
  orders: Order[]
  currentOrder: Order | null
  addOrder: (order: Order) => void
  setCurrentOrder: (order: Order) => void
  clearCurrentOrder: () => void
  getOrderById: (id: string) => Order | undefined
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
          currentOrder: order,
        }))
      },

      setCurrentOrder: (order) => {
        set({ currentOrder: order })
      },

      clearCurrentOrder: () => {
        set({ currentOrder: null })
      },

      getOrderById: (id) => {
        return get().orders.find((order) => order.id === id)
      },
    }),
    {
      name: 'botsmart-order-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
