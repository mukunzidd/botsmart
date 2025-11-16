import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <ShoppingCart className="h-6 w-6 text-secondary" />
              <span className="ml-2 text-xl font-bold">BotsMart</span>
            </div>
            <p className="text-white/70 text-sm">
              Get organic produce and sustainably sourced groceries delivery at up to 4% off grocery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-white/70 hover:text-secondary transition-colors">
                  All Stores
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-white/70 hover:text-secondary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-white/70 hover:text-secondary transition-colors">
                  My Cart
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-white/70 hover:text-secondary transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-white/70 hover:text-secondary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-white/70 hover:text-secondary transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-white/70 hover:text-secondary transition-colors">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-white/70 hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white/70 hover:text-secondary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-secondary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2024 BotsMart. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-white/60">
            <span>Gaborone • Francistown</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
