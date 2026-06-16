import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharon-shakti.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/book`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/care`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
