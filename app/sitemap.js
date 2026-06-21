export default function sitemap() {
  const baseUrl = "https://www.theroundyouth.org";
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];
}
