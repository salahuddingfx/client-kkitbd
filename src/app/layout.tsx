import "core-js/stable";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/providers";
import { PreloaderWrapper } from "@/components/ui/preloader-wrapper";
import { CookieConsent } from "@/components/common/CookieConsent";
import { SecurityWrapper } from "@/components/common/SecurityWrapper";
import { CookieConsentProvider } from "@/components/common/CookieConsentProvider";
import { ConditionalScripts } from "@/components/common/ConditionalScripts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4000"),
  title: {
    default: "KKIT - Premium Digital Solutions & Learning Platform",
    template: "%s | KKIT",
  },
  description:
    "Transform your career with expert-led courses, innovative digital solutions, and cutting-edge technology services.",
  keywords: [
    "education",
    "online courses",
    "digital solutions",
    "web development",
    "app development",
    "UI/UX design",
    "technology training",
  ],
  authors: [{ name: "KKIT" }],
  creator: "KKIT",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kkitbd.com",
    siteName: "KKIT",
    title: "KKIT - Premium Digital Solutions & Learning Platform",
    description:
      "Transform your career with expert-led courses, innovative digital solutions, and cutting-edge technology services.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KKIT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KKIT - Premium Digital Solutions & Learning Platform",
    description:
      "Transform your career with expert-led courses, innovative digital solutions, and cutting-edge technology services.",
    images: ["/og-image.png"],
    creator: "@kkitbd",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          <CookieConsentProvider>
            <SecurityWrapper>
              <PreloaderWrapper />
              <ConditionalScripts />
              {children}
              <CookieConsent />
            </SecurityWrapper>
          </CookieConsentProvider>
        </Providers>
      </body>
    </html>
  );
}
