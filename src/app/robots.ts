import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/profile/", "/settings/"],
      },
    ],
    sitemap: "https://kkitbd.com/sitemap.xml",
  };
}
