"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCartStore } from "@/lib/store/cart-store"
import { Badge } from "@/components/ui/badge"
import { Home, Search, ShoppingCart, User } from "lucide-react"

export function MobileBottomNav() {
  const pathname = usePathname()
  const cartItemCount = useCartStore((state) => state.getTotalItems())

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search", label: "Search", icon: Search },
    { href: "/cart", label: "Cart", icon: ShoppingCart, badge: cartItemCount },
    { href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center gap-1 h-full relative"
            >
              <div className="relative">
                <Icon
                  className={`h-6 w-6 ${
                    isActive ? "text-primary" : "text-gray-600"
                  }`}
                />
                {item.badge && item.badge > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 min-w-[20px] flex items-center justify-center p-0 text-xs bg-primary">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span
                className={`text-xs ${
                  isActive ? "text-primary font-semibold" : "text-gray-600"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-b-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
