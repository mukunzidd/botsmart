"use client"

import { useState, FormEvent, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, MapPin, Menu, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/store/cart-store"
import { useSessionStore } from "@/lib/store/session-store"
import { MobileMenu } from "@/components/mobile-menu"
import { MobileStoreSelector } from "@/components/mobile-store-selector"
import { SearchDropdown } from "@/components/search-dropdown"
import { LocationStoreSelector } from "@/components/location-store-selector"
import { stores } from "@/lib/data/stores"

export function Header() {
  const router = useRouter()
  const cartItemCount = useCartStore((state) => state.getTotalItems())
  const selectedStoreId = useSessionStore((state) => state.selectedStoreId)
  const cartStoreId = useCartStore((state) => state.getStoreId())
  const setSelectedStore = useSessionStore((state) => state.setSelectedStore)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [showMobileStoreSelector, setShowMobileStoreSelector] = useState(false)
  const [mounted, setMounted] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const mobileSearchRef = useRef<HTMLInputElement>(null)
  const mobileSearchContainerRef = useRef<HTMLDivElement>(null)

  // Prioritize cart store, then session store
  const currentStoreId = cartStoreId || selectedStoreId
  const currentStore = currentStoreId ? stores.find(s => s.id === currentStoreId) : null

  // Fix hydration mismatch by only showing store-specific placeholder after mount
  const searchPlaceholder = mounted && currentStore
    ? `Search from ${currentStore.name}`
    : "Search for Grocery, Stores, Vegetable or Meat"

  useEffect(() => {
    setMounted(true)

    // Listen for search focus event from bottom nav
    const handleFocusSearch = () => {
      if (mobileSearchRef.current) {
        mobileSearchRef.current.focus()
        mobileSearchRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }

    window.addEventListener('focus-mobile-search', handleFocusSearch)
    return () => window.removeEventListener('focus-mobile-search', handleFocusSearch)
  }, [])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearchDropdown(false)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideDesktop = searchRef.current && !searchRef.current.contains(event.target as Node)
      const isOutsideMobile = mobileSearchContainerRef.current && !mobileSearchContainerRef.current.contains(event.target as Node)

      if (isOutsideDesktop && isOutsideMobile) {
        setShowSearchDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full pt-4 px-4">
      <div className="container mx-auto">
        <div className="bg-primary rounded-2xl shadow-lg px-4">
          {/* Top bar */}
          <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-secondary" />
              </div>
              <span className="ml-2 text-xl font-bold tracking-tight text-white hidden md:block">
                BotsMart
              </span>
            </div>
          </Link>

          {/* Mobile Store Selector - Simple */}
          <div className="flex-1 md:hidden flex items-center justify-center gap-2">
            <button
              onClick={() => setShowMobileStoreSelector(true)}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 rounded-lg px-2.5 py-1.5 transition-colors max-w-[70%]"
            >
              {mounted && currentStore && (
                <div className="relative h-6 w-6 rounded overflow-hidden bg-white flex-shrink-0">
                  <Image
                    src={currentStore.logo}
                    alt={currentStore.name}
                    fill
                    className="object-contain p-0.5"
                    sizes="24px"
                  />
                </div>
              )}
              <span className="text-white font-semibold text-sm truncate">
                {mounted ? (currentStore ? currentStore.name : "All Stores") : "All Stores"}
              </span>
              <ChevronDown className="h-4 w-4 text-white shrink-0" />
            </button>
          </div>

          {/* Location & Store Selector - Desktop */}
          <div className="hidden md:block">
            <LocationStoreSelector />
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden flex-1 max-w-xl md:block" ref={searchRef}>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  className="pl-10 pr-4 rounded-lg bg-white border-0 text-sm h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchDropdown(true)}
                />
                {showSearchDropdown && (
                  <SearchDropdown
                    searchQuery={searchQuery}
                    onClose={() => setShowSearchDropdown(false)}
                  />
                )}
              </div>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Order notification */}
            <div className="hidden md:flex items-center gap-2 text-white text-sm">
              <span className="text-secondary">⚡</span>
              <span>Order now and get it within <span className="text-secondary">15 min!</span></span>
            </div>

            {/* Cart - Desktop only */}
            <Link href="/cart" className="hidden md:block">
              <button className="relative h-9 w-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors">
                <ShoppingCart className="h-5 w-5 text-primary" />
                {mounted && cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-secondary text-primary text-xs font-semibold flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </Link>

            {/* User Profile - Desktop only */}
            <Link href="/profile" className="hidden md:block">
              <button className="h-9 w-9 rounded-full bg-white overflow-hidden hover:opacity-90 transition-opacity">
                <User className="h-full w-full text-primary p-2" />
              </button>
            </Link>

            {/* Mobile menu */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

          {/* Mobile search bar */}
          <div className="pb-3 md:hidden" ref={mobileSearchContainerRef}>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  ref={mobileSearchRef}
                  type="search"
                  placeholder={searchPlaceholder}
                  className="pl-10 pr-4 rounded-lg bg-white border-0 text-sm h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchDropdown(true)}
                />
                {showSearchDropdown && (
                  <SearchDropdown
                    searchQuery={searchQuery}
                    onClose={() => setShowSearchDropdown(false)}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <MobileStoreSelector isOpen={showMobileStoreSelector} onClose={() => setShowMobileStoreSelector(false)} />
    </header>
  )
}
