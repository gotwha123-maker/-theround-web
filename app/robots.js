export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/mypage", "/api"],
    },
    sitemap: "https://theroundyouth.org/sitemap.xml",
  };
}
