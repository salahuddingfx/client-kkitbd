"use client";

export function initDevProtection() {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") return;

  // Custom console branding
  const style = `
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #00ff88;
    font-size: 20px;
    font-weight: bold;
    padding: 20px;
    border-radius: 10px;
    text-shadow: 0 0 10px #00ff88;
    font-family: monospace;
  `;

  console.log("%c⛔ KKIT - PROTECTED PLATFORM", style);
  console.log(
    "%cUnauthorized access to console is strictly prohibited.",
    "color: red; font-size: 14px; font-weight: bold;"
  );
  console.log(
    "%cAll activities are monitored and logged.",
    "color: orange; font-size: 12px;"
  );

  // Disable console methods in production
  const noop = () => {};
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalInfo = console.info;

  // Periodically override console if someone tries to re-enable
  const protectConsole = () => {
    console.log = function (...args: unknown[]) {
      // Allow our branded messages
      if (
        typeof args[0] === "string" &&
        args[0].includes("KKIT - PROTECTED")
      ) {
        originalLog.apply(console, args);
        return;
      }
      // Block everything else
      console.clear();
      originalLog.call(
        console,
        "%c⛔ Access Denied - KKIT Protected Platform",
        "color: red; font-size: 16px; font-weight: bold;"
      );
    };

    console.warn = function (...args: unknown[]) {
      if (
        typeof args[0] === "string" &&
        args[0].includes("KKIT")
      ) {
        originalWarn.apply(console, args);
        return;
      }
      console.clear();
    };

    console.error = function (...args: unknown[]) {
      if (
        typeof args[0] === "string" &&
        args[0].includes("KKIT")
      ) {
        originalError.apply(console, args);
        return;
      }
      // Silently block errors from appearing
    };

    console.info = noop;
    console.debug = noop;
    console.trace = noop;
  };

  protectConsole();

  // Override toString to prevent inspection
  Object.defineProperty(console.log, "toString", {
    value: () => "function log() { [native code] }",
  });

  // Disable drag on images/videos
  document.addEventListener("dragstart", (e) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === "IMG" ||
      target.tagName === "VIDEO" ||
      target.closest("video")
    ) {
      e.preventDefault();
      return false;
    }
  });

  // Block print screen (basic attempt)
  document.addEventListener("keyup", (e) => {
    if (e.key === "PrintScreen") {
      // Can't fully block but can overlay
      const overlay = document.createElement("div");
      overlay.style.cssText =
        "position:fixed;inset:0;background:white;z-index:999999;display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:bold;color:red;";
      overlay.textContent = "⚠ SCREENSHOT BLOCKED - KKIT PROTECTED";
      document.body.appendChild(overlay);
      setTimeout(() => overlay.remove(), 1500);
    }
  });
}
