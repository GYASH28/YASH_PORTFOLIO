import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fontDisplay = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ykg.vercel.app"),
  title: {
    default: "Y/G Systems Studio — A Human Signal Inside the Machine",
    template: "%s — Y/G Systems Studio",
  },
  description:
    "Yash Ganesh — Product Engineer & AI Systems Builder based in Pune, India. Designing and shipping real working products: Lernio AI, B.R.A.C.E., CampusMate, and Fakhri Mart. Not another AI wrapper. A working product.",
  keywords: [
    "Yash Ganesh",
    "Y/G Systems Studio",
    "Product Engineer",
    "AI Systems",
    "Full-stack development",
    "Pune",
    "Lernio AI",
    "B.R.A.C.E.",
    "CampusMate",
    "Fakhri Mart",
    "Interaction design",
    "WebGL",
  ],
  authors: [{ name: "Yash Ganesh" }],
  creator: "Yash Ganesh",
  openGraph: {
    title: "Y/G Systems Studio — A Human Signal Inside the Machine",
    description:
      "Product engineering, AI systems, and interaction design by Yash Ganesh. Observe → Structure → Engineer → Evolve.",
    url: "https://ykg.vercel.app",
    siteName: "Y/G Systems Studio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Y/G Systems Studio — Yash Ganesh",
    description:
      "Product engineering, AI systems, and interaction design. A human signal inside the machine.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0f",
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
        className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
