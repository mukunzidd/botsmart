"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useCartStore } from "@/lib/store/cart-store"
import { useOrderStore } from "@/lib/store/order-store"
import { useSessionStore } from "@/lib/store/session-store"
import { stores } from "@/lib/data/stores"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ChevronLeft, CreditCard, Wallet, Building2, MapPin, Edit, ChevronDown, ChevronUp, Plus, Minus, Tag } from "lucide-react"
import { PaymentModal } from "@/components/payment-modal"

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(10, "Please enter your full address"),
  city: z.string().min(2, "Please enter your city"),
  area: z.string().min(2, "Please enter your area"),
  instructions: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const paymentMethods = [
  {
    id: "cash",
    name: "Cash on Delivery",
    icon: Wallet,
    description: "Pay with cash when you receive your order",
  },
  {
    id: "card",
    name: "Card Payment",
    icon: CreditCard,
    description: "Pay securely with your debit or credit card",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: Building2,
    description: "Direct bank transfer",
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart, getStoreId, updateQuantity } = useCartStore()
  const { addOrder } = useOrderStore()
  const deliveryLocation = useSessionStore((state) => state.deliveryLocation)
  const [selectedPayment, setSelectedPayment] = useState("online")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [expandedStores, setExpandedStores] = useState<Record<string, boolean>>({})
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      city: "Gaborone",
      area: "",
      instructions: "",
    },
  })

  const currentStoreId = getStoreId()
  const currentStore = currentStoreId ? stores.find(s => s.id === currentStoreId) : null

  const totalPrice = getTotalPrice()
  const deliveryFee = 16.0
  const discount = appliedPromo?.discount || 0
  const taxes = 10.0
  const finalTotal = totalPrice + deliveryFee - discount + taxes

  // Group items by store
  const itemsByStore = items.reduce((acc, item) => {
    const storeId = item.product.storeId
    if (!acc[storeId]) {
      acc[storeId] = []
    }
    acc[storeId].push(item)
    return acc
  }, {} as Record<string, typeof items>)

  const toggleStoreExpand = (storeId: string) => {
    setExpandedStores(prev => ({
      ...prev,
      [storeId]: !prev[storeId]
    }))
  }

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "save48") {
      setAppliedPromo({ code: promoCode, discount: 48.0 })
    } else {
      alert("Invalid promo code")
    }
  }

  // Redirect if cart is empty (but not if we just placed an order)
  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      router.push("/cart")
    }
  }, [items.length, router, orderPlaced])

  if (items.length === 0 && !orderPlaced) {
    return null
  }

  const handleConfirmOrder = () => {
    setIsSubmitting(true)
    setShowPaymentModal(true)
  }

  const handlePaymentComplete = () => {
    setOrderPlaced(true)

    // Create order with default customer info
    const order = {
      id: `ORD-${Date.now()}`,
      orderNumber: `#BM${Date.now().toString().slice(-6)}`,
      storeId: currentStoreId || "",
      storeName: currentStore?.name || "",
      items: items,
      customer: {
        firstName: "Guest",
        lastName: "Customer",
        phone: "+267 71234567",
        email: "guest@botsmart.bw",
      },
      deliveryAddress: {
        fullName: "Guest Customer",
        phone: "+267 71234567",
        street: "Block B, Road 3",
        city: deliveryLocation.city,
        area: deliveryLocation.area,
        instructions: "",
      },
      deliverySlot: "ASAP",
      paymentMethod: selectedPayment,
      subtotal: totalPrice,
      deliveryFee: deliveryFee,
      total: finalTotal,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(), // 45 minutes
    }

    // Add order to store
    addOrder(order)

    // Clear cart
    clearCart()

    // Redirect to confirmation
    router.push(`/order-confirmation/${order.id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Delivery & Items */}
          <div className="space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary">Delivery information</h2>
                <button className="flex items-center gap-1 text-orange-500 hover:text-orange-600 text-sm font-medium">
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">Delivery to</p>
                  <p className="text-sm text-gray-600">Address: (+62) 854-2645-1999</p>
                  <p className="text-sm text-gray-600">
                    {deliveryLocation.city}, {deliveryLocation.area}, Block B, Road: 3, California, USA
                  </p>
                </div>
              </div>
            </div>

            {/* Review items by store */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary mb-6">Review item by store</h2>

              <div className="space-y-4">
                {Object.entries(itemsByStore).map(([storeId, storeItems]) => {
                  const store = stores.find(s => s.id === storeId)
                  const isExpanded = expandedStores[storeId]

                  return (
                    <div key={storeId} className="border-2 border-primary/10 rounded-xl overflow-hidden">
                      {/* Store Header */}
                      <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm border-2 border-white flex items-center justify-center overflow-hidden flex-shrink-0">
                              {store && (
                                <Image
                                  src={store.logo}
                                  alt={store.name}
                                  width={48}
                                  height={48}
                                  className="object-contain p-1.5"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-primary truncate">{store?.name}</p>
                              <p className="text-xs text-gray-600 font-medium">Delivery in {store?.deliveryTime}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleStoreExpand(storeId)}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors flex-shrink-0"
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-primary" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-primary" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Store Items */}
                      {isExpanded && (
                        <div className="p-4 space-y-4">
                          {storeItems.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-4">
                              <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                <Image
                                  src={item.product.image}
                                  alt={item.product.name}
                                  fill
                                  className="object-contain p-2"
                                  sizes="64px"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{item.product.name}</p>
                                <p className="text-xs text-gray-500">{item.product.unit}</p>
                                <div className="flex items-baseline gap-1 mt-1">
                                  <span className="text-lg font-bold text-gray-900">
                                    {Math.floor(item.product.price)}
                                  </span>
                                  <span className="text-sm font-medium text-gray-900">
                                    .{item.product.price.toFixed(2).split('.')[1]}$
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="h-6 w-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-200"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="text-sm font-semibold min-w-[20px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="h-6 w-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-200"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          ))}

                          {/* Replace with option */}
                          <div className="pt-4 border-t">
                            <button className="flex items-center justify-between w-full text-sm text-gray-600 hover:text-primary">
                              <span className="flex items-center gap-2">
                                <span>↻ Replace with</span>
                                <span className="font-medium text-gray-900">Loblaws</span>
                              </span>
                              <ChevronDown className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Item Preview when collapsed */}
                      {!isExpanded && (
                        <div className="p-4 flex items-center gap-2">
                          {storeItems.slice(0, 6).map((item) => (
                            <div key={item.product.id} className="text-2xl">
                              {item.product.category.includes('Vegetable') ? '🥬' :
                               item.product.category.includes('Meat') ? '🥩' :
                               item.product.category.includes('Dairy') ? '🥛' :
                               item.product.category.includes('Beverage') ? '🥤' : '🛒'}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-primary">Order summary</h2>

              {/* Payment Methods */}
              <div className="space-y-3 mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">Payment Method</p>
                <label className="flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all hover:border-primary/50" style={{borderColor: selectedPayment === "online" ? "var(--color-primary)" : "var(--color-gray-200)"}}>
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={selectedPayment === "online"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-5 h-5 text-primary"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Online Payment</p>
                    <p className="text-xs text-gray-500">Pay securely with card or mobile money</p>
                  </div>
                  {selectedPayment === "online" && (
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  )}
                </label>
                <label className="flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all hover:border-primary/50" style={{borderColor: selectedPayment === "cash" ? "var(--color-primary)" : "var(--color-gray-200)"}}>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={selectedPayment === "cash"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-5 h-5 text-primary"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">Pay with cash when you receive</p>
                  </div>
                  {selectedPayment === "cash" && (
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  )}
                </label>
                <label className="flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all hover:border-primary/50" style={{borderColor: selectedPayment === "pos" ? "var(--color-primary)" : "var(--color-gray-200)"}}>
                  <input
                    type="radio"
                    name="payment"
                    value="pos"
                    checked={selectedPayment === "pos"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-5 h-5 text-primary"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">POS on Delivery</p>
                    <p className="text-xs text-gray-500">Pay with card at delivery</p>
                  </div>
                  {selectedPayment === "pos" && (
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  )}
                </label>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-primary hover:bg-primary/90 px-6"
                  >
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <p className="text-xs text-green-600 mt-2">✓ Promo code applied: {appliedPromo.code}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">P {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery fee</span>
                  <span className="font-medium">P {deliveryFee.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coupon Discount</span>
                    <span className="font-medium">-P {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">P {taxes.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-lg text-gray-900">Total</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-3xl text-primary">
                      {Math.floor(finalTotal)}
                    </span>
                    <span className="font-bold text-xl text-primary">
                      .{finalTotal.toFixed(2).split('.')[1]}
                    </span>
                    <span className="text-base text-gray-600">P</span>
                  </div>
                </div>
              </div>

              {/* Payment Processing Info */}
              {(selectedPayment === "online" || selectedPayment === "pos") && (
                <div className="mb-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <p className="text-sm text-primary font-medium">
                    {selectedPayment === "online"
                      ? "🔒 Secure payment processing will be initiated after confirmation"
                      : "💳 POS machine will be available at delivery"}
                  </p>
                </div>
              )}

              {/* Confirm Order */}
              <Button
                type="button"
                onClick={handleConfirmOrder}
                className="w-full bg-secondary hover:bg-secondary/90 text-primary h-14 text-lg font-bold rounded-xl shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
                    Processing Payment...
                  </span>
                ) : (
                  "Confirm Order"
                )}
              </Button>

              {/* Security info */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Tag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Safe & Secure Payment</p>
                    <p className="text-xs text-gray-600">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        paymentMethod={selectedPayment}
        amount={finalTotal}
        onComplete={handlePaymentComplete}
      />
    </div>
  )
}
