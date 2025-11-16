"use client"

import { useState } from "react"
import Link from "next/link"
import { useUserStore } from "@/lib/store/user-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react"

export default function AddressesPage() {
  const { user, addAddress, updateAddress, removeAddress, setDefaultAddress } =
    useUserStore()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    label: "",
    street: "",
    city: "Gaborone",
    area: "",
  })

  const handleAddAddress = () => {
    if (formData.label && formData.street && formData.area) {
      addAddress({
        ...formData,
        isDefault: false,
      })
      setFormData({ label: "", street: "", city: "Gaborone", area: "" })
      setIsAdding(false)
    }
  }

  const handleUpdateAddress = (id: string) => {
    if (formData.label && formData.street && formData.area) {
      updateAddress(id, formData)
      setEditingId(null)
      setFormData({ label: "", street: "", city: "Gaborone", area: "" })
    }
  }

  const startEditing = (id: string) => {
    const address = user?.addresses.find((a) => a.id === id)
    if (address) {
      setFormData({
        label: address.label,
        street: address.street,
        city: address.city,
        area: address.area,
      })
      setEditingId(id)
      setIsAdding(false)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({ label: "", street: "", city: "Gaborone", area: "" })
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ChevronLeft className="h-4 w-4" />
              Back to profile
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Saved Addresses</h1>
              <p className="text-muted-foreground mt-2">
                Manage your delivery addresses
              </p>
            </div>
            {!isAdding && !editingId && (
              <Button onClick={() => setIsAdding(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Address
              </Button>
            )}
          </div>
        </div>

        {/* Add New Address Form */}
        {isAdding && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Label (e.g., Home, Work)
                </label>
                <Input
                  placeholder="Home"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Street Address
                </label>
                <Input
                  placeholder="Plot 1234, Extension 12"
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">City</label>
                  <Input
                    placeholder="Gaborone"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Area</label>
                  <Input
                    placeholder="Broadhurst, CBD, etc."
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleAddAddress} className="gap-2">
                  <Check className="h-4 w-4" />
                  Save Address
                </Button>
                <Button variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Address List */}
        <div className="space-y-4">
          {user.addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white rounded-2xl border border-gray-100 p-6"
            >
              {editingId === address.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Edit Address</h2>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Label
                    </label>
                    <Input
                      value={formData.label}
                      onChange={(e) =>
                        setFormData({ ...formData, label: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Street Address
                    </label>
                    <Input
                      value={formData.street}
                      onChange={(e) =>
                        setFormData({ ...formData, street: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        City
                      </label>
                      <Input
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Area
                      </label>
                      <Input
                        value={formData.area}
                        onChange={(e) =>
                          setFormData({ ...formData, area: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={() => handleUpdateAddress(address.id)}
                      className="gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-lg p-3">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">
                            {address.label}
                          </h3>
                          {address.isDefault && (
                            <Badge className="bg-primary">Default</Badge>
                          )}
                        </div>
                        <p className="text-gray-600">{address.street}</p>
                        <p className="text-gray-600">
                          {address.area}, {address.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditing(address.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!address.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeAddress(address.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {!address.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDefaultAddress(address.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {user.addresses.length === 0 && !isAdding && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No saved addresses</h2>
            <p className="text-gray-500 mb-6">
              Add your delivery addresses for faster checkout
            </p>
            <Button onClick={() => setIsAdding(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Address
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
