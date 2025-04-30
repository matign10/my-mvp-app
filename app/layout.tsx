import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ECEN - Estudio Jurídico",
  description: "Estudio jurídico especializado en derecho civil, penal y laboral.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
      </head>
      <body className={inter.className}>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
      </body>
    </html>
  );
}
