"use client";

import { useEffect, useState } from "react";

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [devToolsOpen, setDevToolsOpen] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    // DevTools detection via element size trick
    const threshold = 160;
    let devToolsDetected = false;

    const checkDevTools = () => {
      const widthThreshold =
        window.outerWidth - window.innerWidth > threshold;
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        if (!devToolsDetected) {
          devToolsDetected = true;
          setDevToolsOpen(true);
        }
      } else {
        if (devToolsDetected) {
          devToolsDetected = false;
          setDevToolsOpen(false);
        }
      }
    };

    const interval = setInterval(checkDevTools, 1000);

    // Block right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Block keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I / Cmd+Option+I
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I") {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J / Cmd+Option+J
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "J") {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+C / Cmd+Option+C
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        return false;
      }

      // Ctrl+U / Cmd+U (view source)
      if ((e.ctrlKey || e.metaKey) && e.key === "u") {
        e.preventDefault();
        return false;
      }

      // Ctrl+S / Cmd+S (save page)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (devToolsOpen) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-[120px] font-black text-red-600 leading-none tracking-tighter">
            STOP
          </div>
          <div className="text-2xl font-bold text-white mt-4">
            Developer Tools Detected
          </div>
          <div className="text-gray-400 mt-2 max-w-md mx-auto">
            Access to developer tools is restricted on this platform.
            <br />
            Unauthorized inspection is prohibited.
          </div>
          <div className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg text-sm">
            This activity has been logged
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
