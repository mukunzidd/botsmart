"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCartStore } from "@/lib/store/cart-store"
import { useUserStore } from "@/lib/store/user-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Search,
  ShoppingCart,
  User,
  Package,
  MapPin,
  Settings,
  LogOut,
  X,
} from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const cartItemCount = useCartStore((state) => state.getTotalItems())
  const { user, isAuthenticated, logout } = useUserStore()

  // Close menu when route changes
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleLogout = () => {
    logout()
    onClose()
  }

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search", label: "Search", icon: Search },
    { href: "/cart", label: "Cart", icon: ShoppingCart, badge: cartItemCount },
  ]

  const profileItems = isAuthenticated
    ? [
        { href: "/profile", label: "My Profile", icon: User },
        { href: "/profile/orders", label: "Orders", icon: Package },
        { href: "/profile/addresses", label: "Addresses", icon: MapPin },
        { href: "/profile/settings", label: "Settings", icon: Settings },
      ]
    : [{ href: "/profile", label: "Sign In", icon: User }]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 md:hidden"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 md:hidden overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Info */}
        {isAuthenticated && user && (
          <div className="p-4 border-b bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 rounded-full p-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className="p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
            Navigation
          </p>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <button
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <Badge
                        className={
                          isActive
                            ? "bg-white text-primary"
                            : "bg-primary text-white"
                        }
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-t">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
            Account
          </p>
          <div className="space-y-1">
            {profileItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <button
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Logout */}
        {isAuthenticated && (
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-destructive transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}

        {/* Footer Info */}
        <div className="p-4 border-t text-center text-sm text-gray-500">
          <p>BotsMart Grocery</p>
          <p className="text-xs mt-1">Version 1.0.0</p>
        </div>
      </div>
    </>
  )
}
