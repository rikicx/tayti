import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "www.tayti.com.br";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);

  return {
    metadataBase: baseUrl,
    title: "Tayti Gelateria & Café | Gelatos artesanais em São Paulo",
    description:
      "Gelatos autorais produzidos diariamente pela Chef Elisabeth Tayti. Visite nossas unidades em Moema e Klabin / Ipiranga.",
    icons: {
      icon: "/images/logo-tayti.png",
      shortcut: "/images/logo-tayti.png",
    },
    openGraph: {
      title: "Tayti Gelateria & Café",
      description: "Gelatos artesanais, receitas autorais e ingredientes escolhidos a dedo.",
      type: "website",
      locale: "pt_BR",
      images: [{ url: new URL("/og.png", baseUrl).toString(), width: 1200, height: 630, alt: "Tayti Gelateria — gelato artesanal" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Tayti Gelateria & Café",
      description: "Gelatos artesanais, receitas autorais e ingredientes escolhidos a dedo.",
      images: [new URL("/og.png", baseUrl).toString()],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
