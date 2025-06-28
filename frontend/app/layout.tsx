import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "PersonSync",
  description: "A Next.js + Tailwind project",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">{children}</body>
    </html>
  );
} 