"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data/products";
import { stores } from "@/lib/data/stores";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Minus,
  AlertCircle,
  Star,
  ChevronRight,
  Heart,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = products.find((p) => p.slug === slug);
  const { addItem, getItemQuantity, updateQuantity, canAddProduct } =
    useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [showError, setShowError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const store = stores.find((s) => s.id === product.storeId);
  const quantity = getItemQuantity(product.id);
  const canAdd = canAddProduct(product);
  const isWishlisted = isInWishlist(product.id);

  const handleToggleWishlist = () => {
    toggleItem(product.id);
  };

  const handleAddItem = () => {
    const added = addItem(product);
    if (!added) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  // Find same product at other stores (match by name similarity or category)
  const otherStoreProducts = products.filter(
    (p) =>
      p.id !== product.id &&
      (p.name.toLowerCase() === product.name.toLowerCase() ||
        p.name.toLowerCase().includes(product.name.toLowerCase().split(" ")[0]))
  );

  // Get unique stores and find lowest price
  const uniqueStoreProducts = otherStoreProducts.reduce((acc, p) => {
    if (!acc.find((item) => item.storeId === p.storeId)) {
      acc.push(p);
    }
    return acc;
  }, [] as typeof products);

  const lowestPrice = Math.min(
    product.price,
    ...uniqueStoreProducts.map((p) => p.price)
  );

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 lg:sticky lg:top-24 h-fit">
            <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-white p-3 md:p-4">
              {/* Heart Icon */}
              <button
                onClick={handleToggleWishlist}
                className="absolute top-4 right-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all hover:scale-110"
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  className={`h-5 w-5 md:h-6 md:w-6 transition-all ${
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                />
              </button>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-4 md:space-y-6">
            {/* Store Badge */}
            {store && (
              <Link
                href={`/store/${store.slug}`}
                className="inline-flex items-center gap-2 md:gap-3 p-2.5 md:p-3 bg-white border border-gray-200 rounded-xl w-fit hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 relative rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={store.logo}
                    alt={store.name}
                    fill
                    className="object-contain p-1"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Available at</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {store.name}
                  </p>
                </div>
              </Link>
            )}

            {/* Product Name */}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">
                {product.name}
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                {product.unit}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl w-fit">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <div className="border-l pl-3">
                <span className="font-bold text-gray-900">4.5</span>
                <span className="text-gray-500 text-sm ml-1">(15 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-2xl border border-primary/10">
              <p className="text-sm text-gray-600 mb-2">Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-primary">
                  {Math.floor(product.price)}
                </span>
                <span className="text-3xl font-bold text-primary">
                  .{product.price.toFixed(2).split(".")[1]}
                </span>
                <span className="text-xl text-gray-600">P</span>
                {product.price === lowestPrice &&
                  uniqueStoreProducts.length > 0 && (
                    <span className="ml-3 px-4 py-1.5 bg-secondary text-primary text-sm font-bold rounded-full">
                      Lowest price
                    </span>
                  )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-lg mb-3 text-gray-900">
                About this product
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Add to Cart Section */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
              {/* Error Message */}
              {showError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">
                    Cannot add products from different stores. Clear your cart
                    first.
                  </span>
                </div>
              )}

              {/* Add to Cart */}
              {quantity === 0 ? (
                <Button
                  onClick={handleAddItem}
                  disabled={!mounted || !canAdd}
                  size="lg"
                  className={`w-full h-16 text-lg rounded-xl font-bold ${
                    mounted && canAdd
                      ? "bg-secondary hover:bg-secondary/90 text-primary shadow-lg"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Plus className="h-6 w-6 mr-2" />
                  Add to Cart
                </Button>
              ) : (
                <div className="flex items-center justify-between bg-secondary/20 rounded-xl px-6 py-4">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="h-12 w-12 rounded-full bg-white hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Minus className="h-6 w-6" />
                  </button>
                  <span className="text-3xl font-bold text-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="h-12 w-12 rounded-full bg-white hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Plus className="h-6 w-6" />
                  </button>
                </div>
              )}

              {!canAdd && quantity === 0 && (
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Clear your cart to add items from a different store
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Others Store Section */}
        {uniqueStoreProducts.length > 0 && (
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">
                Others store
              </h2>
              <p className="text-gray-600 text-xs md:text-sm mt-1">
                Find the same product at different stores
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {uniqueStoreProducts.slice(0, 6).map((otherProduct) => {
                const otherStore = stores.find(
                  (s) => s.id === otherProduct.storeId
                );
                const isLowestPrice = otherProduct.price === lowestPrice;

                return (
                  <div
                    key={otherProduct.id}
                    className={`bg-white rounded-2xl p-4 border-2 transition-all hover:shadow-md ${
                      isLowestPrice
                        ? "border-secondary bg-secondary/5"
                        : "border-gray-200 hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Product Image */}
                      <div className="w-14 h-14 md:w-16 md:h-16 relative rounded-xl overflow-hidden bg-gray-50 shrink-0">
                        <Image
                          src={otherProduct.image}
                          alt={otherProduct.name}
                          fill
                          className="object-contain p-1.5"
                          sizes="(max-width: 768px) 56px, 64px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Product Name */}
                        <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 mb-1">
                          {otherProduct.name}
                        </h3>

                        {/* Store Info */}
                        <div className="flex items-center gap-2 mb-2">
                          {otherStore && (
                            <div className="w-5 h-5 relative rounded overflow-hidden bg-white shrink-0 border border-gray-200">
                              <Image
                                src={otherStore.logo}
                                alt={otherStore.name}
                                fill
                                className="object-contain p-0.5"
                                sizes="20px"
                              />
                            </div>
                          )}
                          <p className="text-xs text-gray-600 truncate flex-1 min-w-0">
                            {otherStore?.name}
                          </p>
                          {isLowestPrice && (
                            <span className="px-2 py-0.5 bg-secondary text-primary text-xs font-bold rounded-full shrink-0">
                              Best price
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 mb-2">
                          🚚 {otherStore?.deliveryTime}
                        </p>

                        {/* Price and Button */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-lg md:text-xl font-bold text-primary">
                              {Math.floor(otherProduct.price)}
                            </span>
                            <span className="text-sm font-bold text-primary">
                              .{otherProduct.price.toFixed(2).split(".")[1]}
                            </span>
                            <span className="text-xs text-gray-600">P</span>
                          </div>

                          <Link href={`/product/${otherProduct.slug}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-lg border-2 hover:bg-primary hover:text-white hover:border-primary font-semibold text-xs px-3 py-1"
                            >
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Similar Products */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">
              Similar products
            </h2>
            <p className="text-gray-600 text-xs md:text-sm mt-1">
              You might also like these
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products
              .filter(
                (p) => p.category === product.category && p.id !== product.id
              )
              .slice(0, 5)
              .map((similarProduct) => {
                const similarStore = stores.find(
                  (s) => s.id === similarProduct.storeId
                );
                return (
                  <Link
                    key={similarProduct.id}
                    href={`/product/${similarProduct.slug}`}
                    className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-primary hover:shadow-lg transition-all"
                  >
                    <div className="relative aspect-square mb-3 bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden">
                      <Image
                        src={similarProduct.image}
                        alt={similarProduct.name}
                        fill
                        className="object-contain p-3"
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 min-h-[40px]">
                      {similarProduct.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      {similarStore?.name}
                    </p>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-xl font-bold text-primary">
                        {Math.floor(similarProduct.price)}
                      </span>
                      <span className="text-sm font-bold text-primary">
                        .{similarProduct.price.toFixed(2).split(".")[1]}
                      </span>
                      <span className="text-xs text-gray-600">P</span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>
      </div>
    </div>
  );
}
