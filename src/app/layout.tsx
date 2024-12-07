import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Nunito_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { ErrorMessages } from "@/components/error-messages";
import { ptBR } from '@clerk/localizations'

import "./globals.css";

const nunitoSans = Nunito_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abacate Cursos",
  description: "Plataforma fictícia de cursos online",
  icons: {
    icon: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body
          className={`${nunitoSans.className} antialiased min-h-screen flex flex-col bg-background`}
        >
          <Toaster position="top-right" />
          <ErrorMessages />
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
