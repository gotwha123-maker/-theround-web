export default function sitemap() {
  const baseUrl = "https://theroundyouth.org";
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];
}
