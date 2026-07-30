import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://kkitbd.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages = [
    "",
    "/about",
    "/services",
    "/courses",
    "/resources",
    "/portfolio",
    "/team",
    "/developers",
    "/blog",
    "/pricing",
    "/faq",
    "/contact",
    "/careers",
    "/live-classes",
    "/learning-paths",
    "/discussions",
    "/technologies",
    "/offers",
    "/privacy-policy",
    "/terms-conditions",
    "/cookies-policy",
    "/refund-policy",
    "/shipping-policy",
    "/disclaimer",
    "/community-guidelines",
    "/accessibility",
  ];

  return publicPages.map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : "weekly",
    priority: page === "" ? 1.0 : page === "/courses" || page === "/services" ? 0.9 : 0.8,
  }));
}
