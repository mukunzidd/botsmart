"use client"

import { useEffect, useState } from "react"
import { CheckCircle, CreditCard, Wallet, Smartphone } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  paymentMethod: string
  amount: number
  onComplete: () => void
}

export function PaymentModal({ isOpen, paymentMethod, amount, onComplete }: PaymentModalProps) {
  const [step, setStep] = useState<"processing" | "success">("processing")

  useEffect(() => {
    if (isOpen) {
      setStep("processing")
      // Simulate payment processing
      const timer = setTimeout(() => {
        setStep("success")
        // Auto close and complete after success
        setTimeout(() => {
          onComplete()
        }, 1500)
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onComplete])

  if (!isOpen) return null

  const getPaymentIcon = () => {
    switch (paymentMethod) {
      case "online":
        return <CreditCard className="h-12 w-12 text-primary" />
      case "cash":
        return <Wallet className="h-12 w-12 text-primary" />
      case "pos":
        return <Smartphone className="h-12 w-12 text-primary" />
      default:
        return <CreditCard className="h-12 w-12 text-primary" />
    }
  }

  const getPaymentTitle = () => {
    switch (paymentMethod) {
      case "online":
        return "Processing Online Payment"
      case "cash":
        return "Confirming Order"
      case "pos":
        return "Preparing POS Payment"
      default:
        return "Processing Payment"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        {step === "processing" ? (
          <div className="text-center">
            {/* Processing Animation */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  {getPaymentIcon()}
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin"></div>
              </div>
            </div>

            {/* Processing Text */}
            <h2 className="text-2xl font-bold text-primary mb-2">
              {getPaymentTitle()}
            </h2>
            <p className="text-gray-600 mb-6">
              Please wait while we process your payment
            </p>

            {/* Amount */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Total Amount</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-primary">
                  {Math.floor(amount)}
                </span>
                <span className="text-2xl font-bold text-primary">
                  .{amount.toFixed(2).split('.')[1]}
                </span>
                <span className="text-lg text-gray-600">P</span>
              </div>
            </div>

            {/* Payment Method Info */}
            {paymentMethod === "online" && (
              <div className="text-sm text-gray-500">
                <p className="flex items-center justify-center gap-2">
                  <span>🔒</span>
                  <span>Secure SSL encrypted connection</span>
                </p>
              </div>
            )}
            {paymentMethod === "cash" && (
              <div className="text-sm text-gray-500">
                <p>Cash payment will be collected at delivery</p>
              </div>
            )}
            {paymentMethod === "pos" && (
              <div className="text-sm text-gray-500">
                <p>POS machine will be available at delivery</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            {/* Success Animation */}
            <div className="mb-6 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
                <CheckCircle className="h-16 w-16 text-green-600 animate-check" />
              </div>
            </div>

            {/* Success Text */}
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              Your order has been confirmed
            </p>

            {/* Success Amount */}
            <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-bold text-green-600">
                  {Math.floor(amount)}
                </span>
                <span className="text-xl font-bold text-green-600">
                  .{amount.toFixed(2).split('.')[1]}
                </span>
                <span className="text-base text-gray-600">P</span>
              </div>
            </div>

            {/* Redirecting message */}
            <p className="text-sm text-gray-500 mt-4">
              Redirecting to order confirmation...
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes check {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-check {
          animation: check 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
