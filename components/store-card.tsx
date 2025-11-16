import Link from "next/link"
import Image from "next/image"
import { Star, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Store } from "@/types"

interface StoreCardProps {
  store: Store
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Link href={`/store/${store.slug}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden group">
        {/* Store Image */}
        <div className="relative h-40 w-full overflow-hidden bg-gray-50">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Store logo overlay */}
          <div className="absolute bottom-3 left-3 h-14 w-14 rounded-xl bg-white p-1.5 shadow-md overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={store.logo}
                alt={`${store.name} logo`}
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>
          </div>

          {/* Open/Closed status */}
          <div className="absolute top-3 right-3">
            <Badge
              className={store.isOpen ? "bg-primary text-white" : "bg-gray-500 text-white"}
            >
              {store.isOpen ? "Open" : "Closed"}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          {/* Store name */}
          <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">
            {store.name}
          </h3>

          {/* Rating and reviews */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
            <span className="font-semibold text-sm">{store.rating}</span>
            <span className="text-xs text-gray-500">
              ({store.reviewCount} reviews)
            </span>
          </div>

          {/* Info row */}
          <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{store.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{store.distance}</span>
            </div>
          </div>

          {/* Delivery info */}
          <div className="flex items-center justify-between pt-3 border-t text-sm">
            <span className="text-gray-600">
              Min: <span className="font-semibold text-gray-900">P{store.minOrder}</span>
            </span>
            <span className="font-semibold text-primary">
              P{store.deliveryFee} fee
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
