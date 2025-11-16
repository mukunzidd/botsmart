"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCartStore } from "@/lib/store/cart-store"
import { Home, Search, ShoppingCart, Package } from "lucide-react"

export function MobileBottomNav() {
  const pathname = usePathname()
  const cartItemCount = useCartStore((state) => state.getTotalItems())

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search", label: "Search", icon: Search, isSearch: true },
    { href: "/cart", label: "Cart", icon: ShoppingCart, badge: cartItemCount > 0 ? cartItemCount : undefined },
    { href: "/profile/orders", label: "Orders", icon: Package },
  ]

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Dispatch custom event to focus search input
    window.dispatchEvent(new Event('focus-mobile-search'))
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          // Handle search button specially
          if (item.isSearch) {
            return (
              <button
                key={item.href}
                onClick={handleSearchClick}
                className="flex-1 flex flex-col items-center justify-center gap-1 h-full relative hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="relative">
                  <Icon
                    className={`h-6 w-6 ${
                      isActive ? "text-primary" : "text-gray-600"
                    }`}
                  />
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
              </button>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center gap-1 h-full relative hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <div className="relative">
                <Icon
                  className={`h-6 w-6 ${
                    isActive ? "text-primary" : "text-gray-600"
                  }`}
                />
                {item.badge && item.badge > 0 && (
                  <div className="absolute -top-1 -right-1.5 h-4.5 min-w-[18px] flex items-center justify-center px-1.5 text-[10px] font-bold bg-secondary text-primary rounded-full border-2 border-white">
                    {item.badge}
                  </div>
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
