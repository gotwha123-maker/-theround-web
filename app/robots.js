export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/mypage", "/api"],
    },
    sitemap: "https://www.theroundyouth.org/sitemap.xml",
  };
}
