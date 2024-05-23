import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'], weight: ['300', '400', '500', '600', '700']
});


export const metadata: Metadata = {
  title: "PricePal",
  description: "Track product prices and compare between e-commerse websites",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/icons/logo.svg" />
      </head>
      <body className={inter.className} >
        <main className="max-w-10x1 mx-auto">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}

