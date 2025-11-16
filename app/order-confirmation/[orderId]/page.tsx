"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useOrderStore } from "@/lib/store/order-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStoreById } from "@/lib/data/stores";
import {
  CheckCircle2,
  Package,
  MapPin,
  CreditCard,
  Clock,
  Phone,
  Mail,
} from "lucide-react";

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;
  const { getOrderById } = useOrderStore();

  const order = getOrderById(orderId);
  const store = order ? getStoreById(order.storeId) : null;

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const estimatedTime = order.estimatedDelivery
    ? new Date(order.estimatedDelivery).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "TBD";

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header - Hidden in print */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 no-print">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Order Confirmed!
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your order. We'll start preparing it right away.
            </p>
          </div>

          {/* Receipt Container */}
          <div className="receipt-container bg-white rounded-2xl border border-gray-100 p-6 mb-6 max-w-3xl mx-auto">
            {/* Receipt Header */}
            <div className="receipt-header receipt-section">
              <h1 className="receipt-text">BOTSMART GROCERY</h1>
              <p
                className="receipt-text text-center mt-2"
                style={{ fontSize: "10pt" }}
              >
                Order Receipt
              </p>
            </div>

            {/* Order Info */}
            <div className="receipt-section receipt-text">
              <div className="receipt-row">
                <span>Order #:</span>
                <span>{order.id}</span>
              </div>
              <div className="receipt-row">
                <span>Date:</span>
                <span>{orderDate}</span>
              </div>
              <div className="receipt-row">
                <span>Status:</span>
                <span className="capitalize">{order.status}</span>
              </div>
              <div className="receipt-divider"></div>
            </div>

            {/* Store Location */}
            {store && (
              <div className="receipt-section receipt-text">
                <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
                  STORE
                </div>
                <div className="receipt-row">
                  <span>{store.name}</span>
                </div>
                <div className="receipt-row">
                  <span>
                    {store.location.area}, {store.location.city}
                  </span>
                </div>
                <div className="receipt-divider"></div>
              </div>
            )}

            {/* Customer Details */}
            <div className="receipt-section receipt-text">
              <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
                CUSTOMER
              </div>
              <div className="receipt-row">
                <span>
                  {order.customer.firstName} {order.customer.lastName}
                </span>
              </div>
              <div className="receipt-row">
                <span>{order.customer.phone}</span>
              </div>
              <div className="receipt-row">
                <span>{order.customer.email}</span>
              </div>
              <div className="receipt-divider"></div>
            </div>

            {/* Delivery Address */}
            <div className="receipt-section receipt-text">
              <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
                DELIVERY ADDRESS
              </div>
              <div className="receipt-row">
                <span>{order.deliveryAddress.street}</span>
              </div>
              <div className="receipt-row">
                <span>
                  {order.deliveryAddress.area}, {order.deliveryAddress.city}
                </span>
              </div>
              {order.deliveryAddress.instructions && (
                <div className="receipt-row" style={{ marginTop: "4px" }}>
                  <span style={{ fontSize: "10pt" }}>
                    Note: {order.deliveryAddress.instructions}
                  </span>
                </div>
              )}
              <div className="receipt-divider"></div>
            </div>

            {/* Order Items */}
            <div className="receipt-section receipt-text">
              <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
                ITEMS
              </div>
              {order.items.map((item) => (
                <div key={item.product.id} className="receipt-item">
                  <div className="receipt-row">
                    <span className="receipt-item-name">
                      {item.product.name}
                    </span>
                    <span>
                      P{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="receipt-item-details receipt-row">
                    <span>
                      {item.quantity} x P{item.product.price.toFixed(2)} (
                      {item.product.unit})
                    </span>
                  </div>
                </div>
              ))}
              <div className="receipt-divider"></div>
            </div>

            {/* Order Summary */}
            <div className="receipt-section receipt-text">
              <div className="receipt-row">
                <span>Subtotal:</span>
                <span>P{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="receipt-row">
                <span>Delivery Fee:</span>
                <span>P{order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="receipt-total receipt-row">
                <span>TOTAL:</span>
                <span>P{order.total.toFixed(2)}</span>
              </div>
              <div className="receipt-row" style={{ marginTop: "8px" }}>
                <span>Payment:</span>
                <span className="capitalize">
                  {order.paymentMethod.replace("-", " ")}
                </span>
              </div>
              <div className="receipt-row">
                <span>Est. Delivery:</span>
                <span>{estimatedTime}</span>
              </div>
              <div className="receipt-divider"></div>
            </div>

            {/* Footer */}
            <div
              className="receipt-section receipt-text"
              style={{ textAlign: "center", marginTop: "15px" }}
            >
              <div style={{ fontSize: "10pt" }}>Thank you for your order!</div>
              <div style={{ fontSize: "9pt", marginTop: "5px" }}>
                For support: +267 312 3456
              </div>
            </div>
          </div>

          {/* UI Elements - Hidden in print */}
          <div className="no-print">
            {/* Order Info Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="text-xl font-bold">{order.id}</p>
                </div>
                <Badge className="bg-orange-500 text-white text-base px-4 py-1">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                    <p className="font-semibold">{estimatedTime} (45 mins)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-semibold capitalize">
                      {order.paymentMethod.replace("-", " ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">
                      {order.customer.firstName} {order.customer.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <p className="text-gray-600">{order.customer.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <p className="text-gray-600">{order.customer.email}</p>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium">{order.deliveryAddress.street}</p>
                  <p className="text-gray-600">
                    {order.deliveryAddress.area}, {order.deliveryAddress.city}
                  </p>
                  {order.deliveryAddress.instructions && (
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="font-medium">Instructions:</span>{" "}
                      {order.deliveryAddress.instructions}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-gray-50">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.product.unit}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                        <p className="font-semibold">
                          P{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    P{order.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">
                    P{order.deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-lg">Total Paid</span>
                    <span className="font-bold text-2xl text-primary">
                      P{order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              <Button
                size="lg"
                className="flex-1"
                onClick={() => window.print()}
              >
                Print Receipt
              </Button>
            </div>

            {/* Help Text */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Need help with your order?{" "}
                <a
                  href="tel:+2673123456"
                  className="text-primary hover:underline"
                >
                  Call us at +267 312 3456
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
