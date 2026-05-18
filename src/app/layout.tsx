import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer/Footer";
import { NavbarServer } from "@/components/layout/navbar/NavbarServer";
import { AuthModalProvider } from "@/features/Auth/components/AuthModalProvider";
import { PWAInstallPrompt } from "@/components/pwa/PWAInstallPrompt";
import { siteConfig } from "@/components/config/site";

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [
    {
      name: siteConfig.creator,
      url: siteConfig.links.portfolio,
    },
  ],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  category: siteConfig.category,
  manifest: siteConfig.pwa.manifest,
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: siteConfig.icons.favicon,
      },
      {
        url: siteConfig.icons.icon192,
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: siteConfig.icons.icon512,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: siteConfig.icons.apple,
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: siteConfig.icons.favicon,
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.shortName,
  },

  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },

  twitter: {
    card: siteConfig.twitter.card,
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitter.creator,
    images: [siteConfig.ogImage],
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

  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": siteConfig.theme.color,
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
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="bg-black text-white selection:bg-red-600/30 min-h-screen font-sans antialiased overflow-x-hidden">
        <AuthModalProvider>
          <NavbarServer />
          {/* Added a container wrapper to ensure footer-push works if you add a footer later */}
          <main className="grow">
            {children}
            <PWAInstallPrompt />
          </main>
          <Footer />
        </AuthModalProvider>
      </body>
    </html>
  );
}
