import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletWrapper } from "./context/WalletContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet Management",
  description: "Wallet Management System for Oumla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletWrapper>{children}</WalletWrapper>
      </body>
    </html>
  );
}
