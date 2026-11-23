import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QuoteCartProvider } from "@/context/quote-cart-context";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Groupe MOCOMEL | Ingénierie Électrique HT/BT, Solutions & Retail B2B",
  description:
    "Leader marocain en ingénierie électrique HT/BT, postes de transformation, aménagement tertiaire et distribution de matériel électrique accrédité ONEE. Casablanca, Maroc.",
  icons: {
    icon: "/logos/logo-mocomel.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
        <SmoothScrollProvider>
          <QuoteCartProvider>
            <Header />
            <div className="flex-1 w-full flex flex-col">{children}</div>
            <Footer />
            <Toaster richColors position="top-right" closeButton />
          </QuoteCartProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
