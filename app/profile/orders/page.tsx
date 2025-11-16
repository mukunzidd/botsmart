"use client"

import Link from "next/link"
import Image from "next/image"
import { useOrderStore } from "@/lib/store/order-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Package, Calendar, CreditCard } from "lucide-react"

export default function OrderHistoryPage() {
  const { orders } = useOrderStore()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-primary text-white"
      case "pending":
        return "bg-orange-500 text-white"
      case "processing":
        return "bg-blue-500 text-white"
      case "cancelled":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ChevronLeft className="h-4 w-4" />
              Back to profile
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Order History</h1>
          <p className="text-muted-foreground mt-2">
            View and track all your orders
          </p>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Order Header */}
                <div className="bg-gray-50 border-b p-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Order Number</p>
                        <p className="font-semibold">{order.id}</p>
                      </div>
                      <div className="h-8 w-px bg-gray-300" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="h-8 w-px bg-gray-300" />
                      <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-semibold text-primary">
                          P{order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <h3 className="font-semibold mb-4">Items ({order.items.length})</h3>
                  <div className="space-y-3 mb-6">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.product.id} className="flex gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity} × P{item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-semibold">
                          P{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-sm text-gray-500 text-center">
                        + {order.items.length - 3} more items
                      </p>
                    )}
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Link href={`/order-confirmation/${order.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" className="flex-1">
                      Reorder
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">
              Start shopping to see your orders here
            </p>
            <Link href="/">
              <Button size="lg">Browse Stores</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
