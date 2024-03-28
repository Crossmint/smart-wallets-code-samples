import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const mono = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Wallets SDK",
  description: "Sample code to get started with Crosmint's Smart Wallets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mono.className}>
        <div className="container mx-auto max-w-2xl bg-white rounded-lg">
          <div className="p-8">
            <Navigation />
            <main className="my-10">{children}</main>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
