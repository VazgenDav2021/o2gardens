import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/client/Footer";
import Header from "@/components/client/Header";
import { Toaster } from "@/ui/toaster";

export const metadata: Metadata = {
  title: "O₂ Cafe & Restaurant",
  description: "Welcome to O₂ Cafe & Restaurant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body>
        <Toaster />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
