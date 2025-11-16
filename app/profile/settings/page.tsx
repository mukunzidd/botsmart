"use client"

import { useState } from "react"
import Link from "next/link"
import { useUserStore } from "@/lib/store/user-store"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Bell, Mail, Globe, Check } from "lucide-react"

export default function SettingsPage() {
  const { user, updateProfile } = useUserStore()
  const [preferences, setPreferences] = useState({
    notifications: user?.preferences.notifications ?? true,
    newsletter: user?.preferences.newsletter ?? false,
    language: user?.preferences.language ?? "en",
  })

  const handleSave = () => {
    updateProfile({ preferences })
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ChevronLeft className="h-4 w-4" />
              Back to profile
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 rounded-lg p-3">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Notifications</h2>
                <p className="text-sm text-gray-500">
                  Manage how you receive notifications
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                <div>
                  <p className="font-medium">Order Updates</p>
                  <p className="text-sm text-gray-500">
                    Get notified about your order status
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.notifications}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      notifications: e.target.checked,
                    })
                  }
                  className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </label>
            </div>
          </div>

          {/* Communication */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 rounded-lg p-3">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Communication</h2>
                <p className="text-sm text-gray-500">
                  Choose what emails you'd like to receive
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                <div>
                  <p className="font-medium">Newsletter</p>
                  <p className="text-sm text-gray-500">
                    Weekly deals and special offers
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.newsletter}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      newsletter: e.target.checked,
                    })
                  }
                  className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </label>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 rounded-lg p-3">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Language</h2>
                <p className="text-sm text-gray-500">
                  Choose your preferred language
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                <span className="font-medium">English</span>
                <input
                  type="radio"
                  name="language"
                  value="en"
                  checked={preferences.language === "en"}
                  onChange={(e) =>
                    setPreferences({ ...preferences, language: e.target.value })
                  }
                  className="h-5 w-5 text-primary focus:ring-primary"
                />
              </label>
              <label className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                <span className="font-medium">Setswana</span>
                <input
                  type="radio"
                  name="language"
                  value="tn"
                  checked={preferences.language === "tn"}
                  onChange={(e) =>
                    setPreferences({ ...preferences, language: e.target.value })
                  }
                  className="h-5 w-5 text-primary focus:ring-primary"
                />
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg" className="gap-2">
              <Check className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
