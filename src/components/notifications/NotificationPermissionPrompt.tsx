"use client";

import { useState } from "react";
import { Bell, X } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export function NotificationPermissionPrompt() {
  const [isVisible, setIsVisible] = useState(true);
  const { permission, isSupported, requestPermission } =
    usePushNotifications();

  if (!isSupported || permission !== "default" || !isVisible) {
    return null;
  }

  const handleEnable = async () => {
    await requestPermission();
    setIsVisible(false);
  };

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">
              Enable Notifications
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              Get notified about course updates, new content, and important
              announcements.
            </p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={handleEnable}>
                Enable
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsVisible(false)}
              >
                Later
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
