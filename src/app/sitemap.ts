import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/blog/mdxSupport";
import { format, parse } from "date-fns";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getAllArticles();
  const posts = allPosts.map((post) => ({
    url: `https://www.splitmy.rent/blog/${post.slug}`,
    lastModified: parse(post.meta.date, "dd/MM/yyyy", new Date()),
    priority: 0.7,
  }));

  return [
    {
      url: "https://www.splitmy.rent/",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://www.splitmy.rent/blog",
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: "https://www.splitmy.rent/affordability",
      lastModified: new Date(),
      priority: 0.9,
    },
    ...posts,
  ];
}
