"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default marker icon in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

// Botswana coordinates (centered on Gaborone)
const GABORONE_CENTER: [number, number] = [-24.6282, 25.9231]
const FRANCISTOWN_CENTER: [number, number] = [-21.1700, 27.5100]

interface LocationMapProps {
  city?: string
  area?: string
  onLocationSelect?: (lat: number, lng: number) => void
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, 13)
  }, [center, map])

  return null
}

export function LocationMap({ city = "Gaborone", area, onLocationSelect }: LocationMapProps) {
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState<[number, number]>(
    city === "Francistown" ? FRANCISTOWN_CENTER : GABORONE_CENTER
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setPosition(city === "Francistown" ? FRANCISTOWN_CENTER : GABORONE_CENTER)
  }, [city])

  if (!mounted) {
    return (
      <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-200">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {city}
            {area && `, ${area}`}
          </Popup>
        </Marker>
        <MapUpdater center={position} />
      </MapContainer>
    </div>
  )
}
