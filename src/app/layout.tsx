import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer/Footer";
import { NavbarServer } from "@/components/layout/navbar/NavbarServer";
import { AuthModalProvider } from "@/features/Auth/components/AuthModalProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Viewport settings for mobile optimization and theme coloring
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents accidental zooming on mobile search inputs
};

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
    "watch trailers",
    "actor biographies",
    "movie discovery",
  ],

  // Essential for browser tab & bookmark styling
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Recommended size 180x180
  },

  openGraph: {
    title: "FindMovie – Discover Trending Movies & Details",
    description:
      "Browse trending, top-rated, and upcoming movies with detailed insights, ratings, and more.",
    url: "https://find-movie-gamma.vercel.app",
    siteName: "FindMovie",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FindMovie – Movie Discovery Platform",
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
    creator: "@yourhandle", // Add your Twitter handle
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthModalProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
      >
        <body className="bg-black text-white selection:bg-red-600/30 min-h-screen font-sans antialiased overflow-x-hidden">
          <NavbarServer />
          {/* Added a container wrapper to ensure footer-push works if you add a footer later */}
          <main className="grow">{children}</main>
          <Footer />
        </body>
      </html>
    </AuthModalProvider>
  );
}
