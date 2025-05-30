import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PrivyWrapper from "./providers/PrivyWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZKSignals - Anonymous Feedback Platform",
  description:
    "Zero-knowledge based anonymous signals app for private voting and feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrivyWrapper>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </PrivyWrapper>
  );
}
