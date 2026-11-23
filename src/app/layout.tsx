import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QuoteCartProvider } from "@/context/quote-cart-context";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Toaster } from "sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

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
    <html
      lang="fr"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
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
