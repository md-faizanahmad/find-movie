// src/config/site.ts

export const siteConfig = {
  name: "FindMovie",
  shortName: "FindMovie",
  title: "FindMovie – Discover Trending Movies, Ratings & Details",
  description:
    "Explore trending movies, top-rated films, upcoming releases, trailers, ratings, cast details, and more on FindMovie.",
  url: "https://find-movie-gamma.vercel.app",
  ogImage: "/og-image.png",
  creator: "Md Faizan Ahmad",

  keywords: [
    "movies",
    "trending movies",
    "movie ratings",
    "film details",
    "cinema",
    "latest movies",
    "FindMovie",
    "watch trailers",
    "actor biographies",
    "movie discovery",
    "tv shows",
    "movie app",
    "streaming guide",
  ],

  links: {
    github: "https://github.com/md-faizanahmad",
    portfolio: "https://mdfaizanahmad.vercel.app",
    linkedin: "https://linkedin.com/in/mdfaizandahmad",
  },

  icons: {
    favicon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    icon192: "/icons/icon-192.png",
    icon512: "/icons/icon-512.png",
  },

  theme: {
    color: "#000000",
    backgroundColor: "#000000",
  },

  pwa: {
    manifest: "/manifest.webmanifest",
    orientation: "portrait",
    display: "standalone",
  },

  locale: "en_US",
  category: "entertainment",
  twitter: {
    creator: "@lensxlogic",
    card: "summary_large_image",
  },
} as const;
