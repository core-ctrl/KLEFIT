import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ClientLayout } from "@/components/layout/ClientLayout";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: "EFIT — Engineer's Fine-tuned with Information Technology",
    template: "%s | EFIT",
  },
  description:
    "The official B.Tech Computer Science & Information Technology student body at KL University. Build. Compete. Lead.",
  keywords: [
    "EFIT",
    "KL University",
    "Computer Science",
    "Information Technology",
    "Student Body",
    "CSE",
    "IT",
    "seo club kl",
    "klclubs",
    "kl student body",
    "student body kl",
    "kl csit",
    "kl cs&it",
    "cs&it kl",
    "student bodys kl",
    "kl student bodyi",
    "csit student bosies",
    "cs it student bodies kl",
    "efit cs&it",
    "kl efit"
  ],
  openGraph: {
    title: "EFIT — Engineer's Fine-tuned with Information Technology",
    description:
      "The official B.Tech CS&IT student body at KL University.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className={`antialiased min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-blue-1)] selection:text-white ${inter.variable} ${jetbrainsMono.variable}`}>
        <QueryProvider>
          <AuthProvider>
            <LenisProvider>
              <ClientLayout>
                {children}
              </ClientLayout>
            </LenisProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
