import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ykg.vercel.app";
  const routes = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1 },
    { url: `${base}/systems`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  ];
  const caseStudies = PROJECTS.map((p) => ({
    url: `${base}/systems/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...routes, ...caseStudies];
}
