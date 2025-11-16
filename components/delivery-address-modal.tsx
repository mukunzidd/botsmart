"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { createPortal } from "react-dom";

interface DeliveryAddress {
  street: string;
  city: string;
  area: string;
  phone?: string;
  instructions?: string;
}

interface DeliveryAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAddress: DeliveryAddress;
  onSave: (address: DeliveryAddress) => void;
}

const SUGGESTED_AREAS = [
  "CBD",
  "Extension 2",
  "Block 3",
  "Broadhurst",
  "Tlokweng",
  "Mogoditshane",
  "Phakalane",
];

export function DeliveryAddressModal({
  isOpen,
  onClose,
  currentAddress,
  onSave,
}: DeliveryAddressModalProps) {
  const [address, setAddress] = useState<DeliveryAddress>(currentAddress);
  const [isDetecting, setIsDetecting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setAddress(currentAddress);
    }
  }, [isOpen, currentAddress]);

  const handleUseCurrentLocation = async () => {
    setIsDetecting(true);
    if (!navigator.geolocation) {
      setIsDetecting(false);
      toast.showToast({
        message: "Geolocation is not supported by your browser.",
        type: "error",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Reverse geocoding - in a real app, you'd use a geocoding service
          // For now, we'll just update the area based on location
          const newAddress = {
            ...address,
            area: "Current Location",
            city: address.city || "Gaborone",
          };
          setAddress(newAddress);
          setIsDetecting(false);
          toast.showToast({
            message: "Location detected! Please confirm your address details.",
            type: "success",
          });
        } catch (error) {
          setIsDetecting(false);
          toast.showToast({
            message:
              "Could not determine your location. Please enter manually.",
            type: "error",
          });
        }
      },
      (error) => {
        setIsDetecting(false);
        toast.showToast({
          message:
            "Location permission denied. Please enter your address manually.",
          type: "warning",
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSave = () => {
    if (
      !address.street.trim() ||
      !address.area.trim() ||
      !address.city.trim()
    ) {
      toast.showToast({
        message: "Please fill in all required fields (Street, Area, City).",
        type: "error",
      });
      return;
    }
    onSave(address);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary">
              Edit Delivery Address
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            {/* Use Current Location Button */}
            <button
              onClick={handleUseCurrentLocation}
              disabled={isDetecting}
              className="w-full flex items-center justify-center gap-2 p-4 bg-primary/5 border-2 border-primary/20 rounded-xl hover:bg-primary/10 transition-colors disabled:opacity-50"
            >
              {isDetecting ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
                  <span className="text-primary font-medium">
                    Detecting location...
                  </span>
                </>
              ) : (
                <>
                  <Navigation className="h-5 w-5 text-primary" />
                  <span className="text-primary font-medium">
                    Use Current Location
                  </span>
                </>
              )}
            </button>

            {/* Street Address */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Street Address *
              </label>
              <Input
                placeholder="e.g., Plot 1234, Block 5, Road 3"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                className="h-12 text-base"
              />
            </div>

            {/* City */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                City *
              </label>
              <Input
                placeholder="Gaborone"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="h-12 text-base"
              />
            </div>

            {/* Area */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Area *
              </label>
              <Input
                placeholder="e.g., CBD, Extension 2, Broadhurst"
                value={address.area}
                onChange={(e) =>
                  setAddress({ ...address, area: e.target.value })
                }
                className="h-12 text-base"
              />
              {/* Suggested Areas */}
              <div className="flex flex-wrap gap-2 mt-2">
                {SUGGESTED_AREAS.map((area) => (
                  <button
                    key={area}
                    onClick={() => setAddress({ ...address, area })}
                    className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone (Optional) */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Phone Number
              </label>
              <Input
                placeholder="+267 71234567"
                value={address.phone || ""}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
                className="h-12 text-base"
                type="tel"
              />
            </div>

            {/* Delivery Instructions */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Delivery Instructions (Optional)
              </label>
              <textarea
                placeholder="e.g., Ring the doorbell, Leave at gate, etc."
                value={address.instructions || ""}
                onChange={(e) =>
                  setAddress({ ...address, instructions: e.target.value })
                }
                className="w-full min-h-[100px] p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={4}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12 text-base font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 h-12 text-base font-semibold bg-secondary hover:bg-secondary/90 text-primary"
              >
                Save Address
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast Container */}
      {mounted &&
        typeof window !== "undefined" &&
        createPortal(toast.ToastContainer(), document.body)}
    </>
  );
}
