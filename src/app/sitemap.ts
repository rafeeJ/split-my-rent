import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://splitmy.rent/",
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
