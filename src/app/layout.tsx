import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://find-movie-gamma.vercel.app"),

  title: {
    default: "FindMovie – Discover Trending Movies, Ratings & Details",
    template: "%s | FindMovie",
  },

  description:
    "Explore trending movies, top-rated films, and upcoming releases. Get detailed movie information, ratings, genres, and more on FindMovie.",

  keywords: [
    "movies",
    "trending movies",
    "movie ratings",
    "film details",
    "cinema",
    "latest movies",
    "FindMovie",
  ],

  openGraph: {
    title: "FindMovie – Discover Trending Movies & Details",
    description:
      "Browse trending, top-rated, and upcoming movies with detailed insights, ratings, and more.",
    url: "https://find-movie-gamma.vercel.app",
    siteName: "FindMovie",
    images: [
      {
        url: "/og-image.png", // you should create this later
        width: 1200,
        height: 630,
        alt: "FindMovie – Discover Movies",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "FindMovie – Discover Movies",
    description: "Explore trending movies, ratings, and detailed insights.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
