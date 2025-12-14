import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/stack/server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SommelierQuest - Your Personal AI Wine Expert & Advisor",
  description: "SommelierQuest is your personal AI wine expert. Get instant wine recommendations, perfect food pairings, and expert wine advice through voice conversation. Free sommelier assistant.",
  keywords: ["SommelierQuest", "sommelier quest", "wine recommendations", "wine pairing", "wine expert", "AI wine advisor", "wine chatbot", "wine assistant", "sommelier app", "ai wine sommelier"],
  authors: [{ name: "SommelierQuest" }],
  creator: "SommelierQuest",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://sommelier.quest"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "SommelierQuest - Your Personal AI Wine Expert",
    description: "SommelierQuest provides instant wine recommendations and food pairings through natural voice conversation. Your free AI sommelier.",
    siteName: "SommelierQuest",
  },
  twitter: {
    card: "summary_large_image",
    title: "SommelierQuest - Your Personal AI Wine Expert",
    description: "SommelierQuest provides instant wine recommendations and food pairings. Your free AI sommelier.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SommelierQuest",
  description: "AI-powered wine advisor and sommelier. Get personalized wine recommendations and food pairings.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://sommelier.quest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${playfair.variable} antialiased`}>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            {children}
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
