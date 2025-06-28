import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { User, Sparkles, UserPlus, Gift, LogOut } from "lucide-react";
import UserNav from "@/components/UserNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PersonaSync - Voice-Powered Personality Discovery",
  description: "Discover your true self through voice-powered surveys and AI-generated avatars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navigation Header */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <Sparkles className="w-8 h-8 text-purple-600" />
                <span className="text-xl font-bold text-gray-900">PersonaSync</span>
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center space-x-4">
                <Link 
                  href="/rewards" 
                  className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <Gift className="w-4 h-4" />
                  <span className="text-sm font-medium">Rewards</span>
                </Link>
                
                {/* Dynamic User Navigation */}
                <UserNav />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content with top padding for fixed header */}
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
