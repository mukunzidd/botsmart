"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Navigation, Star, Clock } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface Location {
  address: string;
  city: string;
  area: string;
}

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: Location;
  onSelectLocation: (location: Location) => void;
}

const SUGGESTED_LOCATIONS = [
  { city: "Gaborone", area: "CBD", address: "Main Mall, Gaborone CBD" },
  { city: "Gaborone", area: "Extension 2", address: "Extension 2, Gaborone" },
  { city: "Gaborone", area: "Block 3", address: "Block 3, Gaborone" },
  { city: "Gaborone", area: "Broadhurst", address: "Broadhurst, Gaborone" },
  { city: "Francistown", area: "Main Mall", address: "Main Mall, Francistown" },
  { city: "Francistown", area: "Bluetown", address: "Bluetown, Francistown" },
];

export function LocationSelectorModal({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
  toast: externalToast,
}: LocationSelectorModalProps & {
  toast?: ReturnType<typeof useToast>;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [recentLocations, setRecentLocations] = useState<Location[]>([]);
  const [mounted, setMounted] = useState(false);
  const internalToast = useToast();
  const { showToast } = externalToast || internalToast;

  useEffect(() => {
    setMounted(true);
    // Load recent locations from localStorage
    const stored = localStorage.getItem("recent-locations");
    if (stored) {
      try {
        setRecentLocations(JSON.parse(stored));
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  const handleSelectLocation = (location: Location) => {
    // Save to recent locations
    const updated = [
      location,
      ...recentLocations.filter((l) => l.address !== location.address),
    ].slice(0, 3); // Keep only 3 most recent

    setRecentLocations(updated);
    localStorage.setItem("recent-locations", JSON.stringify(updated));

    onSelectLocation(location);
    onClose();
  };

  const handleUseCurrentLocation = () => {
    setIsDetecting(true);

    if (!navigator.geolocation) {
      setIsDetecting(false);
      showToast({
        message: "Geolocation is not supported by your browser.",
        type: "error",
      });
      return;
    }

    // Always attempt to get position - this will trigger the prompt if:
    // 1. Permission hasn't been set yet (prompt state)
    // 2. Permission was previously denied but browser allows reprompt on user gesture
    // Note: Most browsers won't reprompt after denial, but we try anyway
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you'd reverse geocode this
        // For now, default to Gaborone CBD
        const location = {
          city: "Gaborone",
          area: "CBD",
          address: "Current Location (Gaborone CBD)",
        };
        handleSelectLocation(location);
        setIsDetecting(false);
      },
      async (error) => {
        setIsDetecting(false);

        // Check if permission was denied
        if (error.code === error.PERMISSION_DENIED) {
          // Check current permission status
          let permissionStatus: PermissionStatus | null = null;
          if (navigator.permissions && navigator.permissions.query) {
            try {
              permissionStatus = await navigator.permissions.query({
                name: "geolocation" as PermissionName,
              });

              // Monitor for permission changes
              if (permissionStatus) {
                const checkPermission = () => {
                  if (permissionStatus?.state === "granted") {
                    // Permission was granted, try again
                    handleUseCurrentLocation();
                  } else if (permissionStatus?.state === "prompt") {
                    // Permission reset to prompt, try again
                    handleUseCurrentLocation();
                  }
                };

                permissionStatus.onchange = checkPermission;

                // Also check immediately in case it changed
                checkPermission();
              }
            } catch (e) {
              // Permissions API not supported
            }
          }

          showToast({
            message:
              "Location permission denied. To enable: 1) Click the lock icon in your browser's address bar, 2) Change location to 'Allow', 3) Click 'Use Current Location' again. The app will automatically detect the change.",
            type: "warning",
            duration: 10000, // Longer duration for important message
          });
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          showToast({
            message:
              "Location information unavailable. Please select a location manually.",
            type: "warning",
          });
        } else if (error.code === error.TIMEOUT) {
          showToast({
            message:
              "Location request timed out. Please try again or select manually.",
            type: "warning",
          });
        } else {
          showToast({
            message: "Could not detect your location. Please select manually.",
            type: "warning",
          });
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0, // Don't use cached position - always get fresh location
      }
    );
  };

  const filteredLocations = SUGGESTED_LOCATIONS.filter(
    (loc) =>
      loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Select Delivery Location
          </DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search area, street, or landmark..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>

        {/* Current Location Button */}
        <Button
          onClick={handleUseCurrentLocation}
          disabled={isDetecting}
          variant="outline"
          className="w-full justify-start gap-3 h-12 rounded-xl border-2 hover:border-primary hover:bg-primary/5"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Navigation className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-gray-900">
              {isDetecting ? "Detecting..." : "Use Current Location"}
            </p>
            <p className="text-xs text-gray-500">Using GPS</p>
          </div>
        </Button>

        {/* Recent Locations */}
        {recentLocations.length > 0 && !searchQuery && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <Clock className="h-4 w-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-700">
                Recent Locations
              </h3>
            </div>
            {recentLocations.map((location, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectLocation(location)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {location.address}
                  </p>
                  <p className="text-xs text-gray-500">
                    {location.city}, {location.area}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Divider */}
        {recentLocations.length > 0 && !searchQuery && (
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">
                or choose from suggestions
              </span>
            </div>
          </div>
        )}

        {/* Suggested Locations */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredLocations.map((location, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectLocation(location)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border ${
                currentLocation.address === location.address
                  ? "border-primary bg-primary/5"
                  : "border-transparent hover:border-gray-200"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  currentLocation.address === location.address
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">
                  {location.address}
                </p>
                <p className="text-xs text-gray-500">
                  {location.city}, {location.area}
                </p>
              </div>
            </button>
          ))}
        </div>

        {searchQuery && filteredLocations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No locations found</p>
            <p className="text-xs mt-1">Try a different search term</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Wrapper component that renders toast outside the dialog
export function LocationSelectorModalWithToast(
  props: LocationSelectorModalProps
) {
  const [mounted, setMounted] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <LocationSelectorModal {...props} toast={toast} />
      {mounted &&
        typeof window !== "undefined" &&
        createPortal(toast.ToastContainer(), document.body)}
    </>
  );
}
