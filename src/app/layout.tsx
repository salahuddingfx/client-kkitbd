import "core-js/stable";
import type { Metadata, Viewport } from "next";
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
  manifest: "/manifest.json",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://kkitbd.com"),
  alternates: {
    canonical: "https://kkitbd.com",
  },
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
    "KKIT",
    "KKIT Bangladesh",
    "software engineering bootcamp",
  ],
  authors: [{ name: "KKIT", url: "https://kkitbd.com" }],
  creator: "KKIT",
  publisher: "KKIT",
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
        url: "https://kkitbd.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "KKIT - Premium Digital Solutions & Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KKIT - Premium Digital Solutions & Learning Platform",
    description:
      "Transform your career with expert-led courses, innovative digital solutions, and cutting-edge technology services.",
    images: ["https://kkitbd.com/og-image.png"],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KKIT",
  url: "https://kkitbd.com",
  logo: "https://kkitbd.com/icon-512.png",
  sameAs: [
    "https://facebook.com/kkitbd",
    "https://twitter.com/kkitbd",
    "https://linkedin.com/company/kkitbd",
    "https://youtube.com/@kkitbd",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@kkitbd.com",
    contactType: "customer service",
    availableLanguage: ["English", "Bengali"],
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KKIT",
  url: "https://kkitbd.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://kkitbd.com/courses?search={search_term_string}",
    "query-input": "required name=search_term_string",
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
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
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
