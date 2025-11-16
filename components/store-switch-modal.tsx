"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ShoppingCart, Trash2 } from "lucide-react"
import { stores } from "@/lib/data/stores"

interface StoreSwitchModalProps {
  isOpen: boolean
  onClose: () => void
  currentStoreName: string
  newStoreName: string
  onContinueShopping: () => void
  onGoToCart: () => void
  onClearAndAdd: () => void
}

export function StoreSwitchModal({
  isOpen,
  onClose,
  currentStoreName,
  newStoreName,
  onContinueShopping,
  onGoToCart,
  onClearAndAdd,
}: StoreSwitchModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">
            Items from different store
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            You have items from <span className="font-semibold text-primary">{currentStoreName}</span> in your cart.
            <br />
            You can only order from one store at a time.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gray-50 rounded-xl p-4 my-4">
          <p className="text-sm text-gray-700 text-center">
            This product is from <span className="font-semibold text-primary">{newStoreName}</span>
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button
            onClick={onGoToCart}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Go to Cart
          </Button>

          <Button
            onClick={onContinueShopping}
            variant="outline"
            size="lg"
            className="w-full border-2 hover:bg-gray-50 font-semibold"
          >
            Continue Shopping at {currentStoreName}
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          <Button
            onClick={onClearAndAdd}
            variant="ghost"
            size="lg"
            className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart & Add This Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
