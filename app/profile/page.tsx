"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useUserStore } from "@/lib/store/user-store"
import { useOrderStore } from "@/lib/store/order-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  User,
  Package,
  MapPin,
  Settings,
  Edit,
  Plus,
  Check,
} from "lucide-react"

export default function ProfilePage() {
  const { user, isAuthenticated, updateProfile } = useUserStore()
  const { orders } = useOrderStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      })
    }
  }, [user])

  // Simulate authentication - in real app, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !user) {
      // For demo purposes, create a mock user
      const mockUser = {
        id: "user-1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "71234567",
        addresses: [
          {
            id: "addr-1",
            label: "Home",
            street: "Plot 1234, Extension 12",
            city: "Gaborone",
            area: "Broadhurst",
            isDefault: true,
          },
        ],
        preferences: {
          notifications: true,
          newsletter: false,
          language: "en",
        },
      }
      useUserStore.getState().login(mockUser)
    }
  }, [isAuthenticated, user])

  const handleSaveProfile = () => {
    updateProfile(formData)
    setIsEditing(false)
  }

  if (!user) {
    return null
  }

  const recentOrders = orders.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="bg-primary/10 rounded-full p-6 mb-4">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <div className="space-y-2">
                <Link href="/profile">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User className="h-4 w-4" />
                    Profile Information
                  </Button>
                </Link>
                <Link href="/profile/orders">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Package className="h-4 w-4" />
                    Order History
                  </Button>
                </Link>
                <Link href="/profile/addresses">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <MapPin className="h-4 w-4" />
                    Saved Addresses
                  </Button>
                </Link>
                <Link href="/profile/settings">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsEditing(false)
                        setFormData({
                          firstName: user.firstName,
                          lastName: user.lastName,
                          email: user.email,
                          phone: user.phone,
                        })
                      }}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveProfile} className="gap-2">
                      <Check className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">First Name</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Last Name</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">First Name</p>
                    <p className="font-medium">{user.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Name</p>
                    <p className="font-medium">{user.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Orders</h2>
                <Link href="/profile/orders">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>

              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <Link key={order.id} href={`/order-confirmation/${order.id}`}>
                      <div className="border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{order.id}</span>
                          <Badge
                            className={
                              order.status === "delivered"
                                ? "bg-primary"
                                : "bg-orange-500 text-white"
                            }
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {order.items.length} items
                          </span>
                          <span className="font-semibold">P{order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No orders yet</p>
                  <Link href="/">
                    <Button className="mt-4">Start Shopping</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Saved Addresses */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Saved Addresses</h2>
                <Link href="/profile/addresses">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Address
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {user.addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border rounded-xl p-4 flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{address.label}</span>
                        {address.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{address.street}</p>
                      <p className="text-sm text-gray-600">
                        {address.area}, {address.city}
                      </p>
                    </div>
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
