import type { MetadataRoute } from "next";

const BASE_URL = "https://kkitbd.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages = [
    "",
    "/about",
    "/services",
    "/courses",
    "/portfolio",
    "/team",
    "/blog",
    "/pricing",
    "/faq",
    "/contact",
    "/careers",
    "/privacy-policy",
    "/terms-conditions",
    "/cookies-policy",
  ];

  return publicPages.map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : "weekly",
    priority: page === "" ? 1 : 0.8,
  }));
}
