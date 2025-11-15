import Link from "next/link"
import Image from "next/image"
import { Star, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Store } from "@/types"

interface StoreCardProps {
  store: Store
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Link href={`/store/${store.slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg cursor-pointer">
        {/* Store Image */}
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Featured badge */}
          {store.featured && (
            <Badge className="absolute top-3 left-3 z-20" variant="default">
              Featured
            </Badge>
          )}

          {/* Open/Closed status */}
          <Badge
            className="absolute top-3 right-3 z-20"
            variant={store.isOpen ? "default" : "secondary"}
          >
            {store.isOpen ? "Open" : "Closed"}
          </Badge>

          {/* Store logo overlay */}
          <div className="absolute bottom-3 left-3 z-20 h-16 w-16 rounded-lg bg-white p-2 shadow-md overflow-hidden">
            <Image
              src={store.logo}
              alt={`${store.name} logo`}
              fill
              className="object-contain p-1"
              sizes="64px"
            />
          </div>
        </div>

        <CardContent className="p-4">
          {/* Store name */}
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {store.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-sm">{store.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({store.reviewCount})
            </span>
          </div>

          {/* Info row */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{store.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{store.distance}</span>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {store.categories.slice(0, 3).map((category, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
            {store.categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{store.categories.length - 3}
              </Badge>
            )}
          </div>

          {/* Delivery info */}
          <div className="flex items-center justify-between pt-3 border-t text-sm">
            <span className="text-muted-foreground">
              Min: P {store.minOrder}
            </span>
            <span className="font-medium text-primary">
              P {store.deliveryFee} delivery
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
