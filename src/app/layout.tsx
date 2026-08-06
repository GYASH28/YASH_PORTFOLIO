import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Display: use Inter with display weight as a reliable, expressive grotesk.
// Bricolage Grotesque fails in restricted network environments.
const fontDisplay = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Editorial serif accent — used sparingly for personal / reflective moments.
const fontSerif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ykg.vercel.app"),
  title: {
    default: "Yash Ganesh — Creative Product Engineer & AI Systems Builder",
    template: "%s — Yash Ganesh",
  },
  description:
    "Yash Ganesh designs digital worlds and engineers them into real products. AI learning systems, desktop companions, campus platforms, and client experiences — from idea to deployment. Based in Pune, India.",
  keywords: [
    "Yash Ganesh",
    "Creative Product Engineer",
    "AI Systems Builder",
    "Portfolio",
    "Pune",
    "Lernio AI",
    "B.R.A.C.E.",
    "CampusMate",
    "Fakhri Mart",
    "Interaction design",
    "WebGL",
    "Product engineering",
  ],
  authors: [{ name: "Yash Ganesh" }],
  creator: "Yash Ganesh",
  openGraph: {
    title: "Yash Ganesh — Creative Product Engineer & AI Systems Builder",
    description:
      "I design digital worlds — and engineer them into real products. AI, education, desktop, campus, and client platforms from idea to deployment.",
    url: "https://ykg.vercel.app",
    siteName: "Yash Ganesh Portfolio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Ganesh — Creative Product Engineer",
    description:
      "I design digital worlds — and engineer them into real products. Portfolio of Lernio AI, B.R.A.C.E., CampusMate, and Fakhri Mart.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#100e0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontDisplay.variable} ${fontBody.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
