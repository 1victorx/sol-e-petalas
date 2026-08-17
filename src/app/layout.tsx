import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CartProvider } from "@/features/cart/cart-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "SOL & PETALAS",
    template: "%s | SOL & PETALAS",
  },
  description:
    "Loja de demonstração da SOL & PETALAS para maquiagens e acessórios femininos.",
  openGraph: {
    title: "SOL & PETALAS",
    description:
      "Experiência demonstrativa de maquiagens e acessórios femininos.",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "Composição demonstrativa SOL & PETALAS",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <CartProvider>
          <div className="relative isolate flex min-h-svh flex-col">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
