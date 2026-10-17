import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
        "next/link": path.resolve(import.meta.dirname, "./src/shims/next/link.tsx"),
        "next/navigation": path.resolve(import.meta.dirname, "./src/shims/next/navigation.ts"),
        "next/image": path.resolve(import.meta.dirname, "./src/shims/next/image.tsx"),
        "next/font/google": path.resolve(import.meta.dirname, "./src/shims/next/font-google.ts"),
        "next/font/local": path.resolve(import.meta.dirname, "./src/shims/next/font-local.ts"),
        "next/server": path.resolve(import.meta.dirname, "./src/shims/next/server.ts"),
        "next/script": path.resolve(import.meta.dirname, "./src/shims/next/script.tsx"),
        "next/dynamic": path.resolve(import.meta.dirname, "./src/shims/next/dynamic.tsx"),
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode === "production" ? "production" : "development"),
      "process.env.NEXT_PUBLIC_API_URL": JSON.stringify(
        env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"
      ),
      "process.env.NEXT_PUBLIC_APP_URL": JSON.stringify(
        env.NEXT_PUBLIC_APP_URL || "http://localhost:4000"
      ),
      "process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME": JSON.stringify(
        env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
      ),
      "process.env.NEXT_PUBLIC_GA4_ID": JSON.stringify(
        env.NEXT_PUBLIC_GA4_ID || "G-DEMO123456"
      ),
      "process.env.NEXT_PUBLIC_FIREBASE_API_KEY": JSON.stringify(
        env.NEXT_PUBLIC_FIREBASE_API_KEY || ""
      ),
      "process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN": JSON.stringify(
        env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || ""
      ),
      "process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID": JSON.stringify(
        env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || ""
      ),
      "process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET": JSON.stringify(
        env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || ""
      ),
      "process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
        env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || ""
      ),
      "process.env.NEXT_PUBLIC_FIREBASE_APP_ID": JSON.stringify(
        env.NEXT_PUBLIC_FIREBASE_APP_ID || ""
      ),
      "process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY": JSON.stringify(
        env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || ""
      ),
      "process.env": JSON.stringify(env),
    },
    server: {
      port: 4000,
      host: true,
      proxy: {
        "/api/v1": {
          target: "http://localhost:5000",
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: "dist",
      sourcemap: false,
    },
  };
});
