import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/ui/Cursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LiveChat } from "@/components/organisms/LiveChat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Prevents font-related FOUC
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0F0D',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://veebran.com'),
  title: {
    default: "VeeBran | Beyond the Horizon",
    template: "%s | VeeBran"
  },
  description: "VeeBran provides AI-driven business consulting for small businesses. We specialize in digital transformation, automation, and data analytics to help you grow.",
  keywords: ["AI Consulting", "Business Strategy", "Digital Transformation", "Data Analytics", "VeeBran", "Small Business Growth", "Automated Marketing", "Fractional CMO"],
  authors: [{ name: "VeeBran Team" }],
  creator: "VeeBran",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://veebran.com",
    title: "VeeBran | AI-Powered Business Consulting",
    description: "Transform your business with AI-driven strategies. We help small businesses scale through automation, data insights, and digital products.",
    siteName: "VeeBran",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VeeBran - Nature Meets Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VeeBran | AI-Powered Business Consulting",
    description: "Expert AI consulting for small business growth. Scale faster with data-driven strategies.",
    images: ["/og-image.jpg"],
    creator: "@veebran",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://veebran.com',
  },
  category: 'Business Consulting',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VeeBran",
    "url": "https://veebran.com",
    "logo": "https://veebran.com/logo-light.png",
    "sameAs": [
      "https://twitter.com/veebran",
      "https://linkedin.com/company/veebran"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-555-5555",
      "contactType": "customer service"
    },
    "description": "VeeBran provides AI-driven business consulting for small businesses, specializing in digital transformation and automation."
  };

  return (
    // CRITICAL: inline style ensures dark background BEFORE CSS loads (prevents FOUC)
    <html lang="en" className={`${inter.variable} ${montserrat.variable} scroll-smooth`} style={{ backgroundColor: '#0A0F0D' }} suppressHydrationWarning>
      <body
        className="bg-brand-dark text-white antialiased"
        style={{ backgroundColor: '#0A0F0D', color: '#E0E0E0', margin: 0, minHeight: '100vh' }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <Cursor />
        {children}
        <LiveChat />
      </body>
    </html>
  );
}
