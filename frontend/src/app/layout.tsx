import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Geist, Geist_Mono } from "next/font/google";
import { ReportsProvider } from "@/context/ReportsContext";
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
  title: {
    default: "SpotyFire - Protejăm Terenul Tău Din Spațiu",
    template: "%s | SpotyFire",
  },
  description:
    "Platformă pentru detectarea incendiilor și inundațiilor folosind imagini satelitare, analiză vegetație și automatizare cereri despăgubire.",
  keywords: [
    "satelit",
    "incendii",
    "inundații",
    "agricultură",
    "asigurări agricole",
    "NDVI",
    "Sentinel-1",
    "monitorizare terenuri",
    "detecție dezastre",
    "România",
    "fermieri",
    "cultură",
    "imagini satelitare",
    "SAR",
    "Earth Engine",
  ],
  authors: [{ name: "SpotyFire" }],
  creator: "SpotyFire",
  publisher: "SpotyFire",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://spotyfire-frontend.vercel.app"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SpotyFire - Protejăm Terenul Tău Din Spațiu",
    description:
      "Platformă pentru detectarea incendiilor și inundațiilor folosind imagini satelitare, analiză vegetație și automatizare cereri despăgubire.",
    url: "/",
    siteName: "SpotyFire",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SpotyFire - Monitorizare Satelitară Agricolă",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpotyFire - Protejăm Terenul Tău Din Spațiu",
    description:
      "Platformă pentru detectarea incendiilor și inundațiilor folosind imagini satelitare",
    images: ["/og-image.png"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#059669" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <ReportsProvider>{children}</ReportsProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
