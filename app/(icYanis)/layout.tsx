import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from 'next/link'
import { Button } from "@/components/ui/button"

import "../globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <header className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">QUEEN</h1>
        <p className="text-xl text-center mb-12">Il faut: </p>
        <ul>
          <li>Proposer une liste de type de site (vitrine, ecommerce, landingpage, forum, wiki, doc, etc...)</li>
          <li>Puis proposer une liste de catégorie sociaux-professionnelles, afin que le style et le comportement de l'application soit aligné sur cette catégorie (sociaux-professionnelles)de client</li>
        </ul>
      </header>

      {children}
        
      <footer>footer</footer>
    </body>
  );
}
