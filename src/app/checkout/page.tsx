import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { CheckoutDemo } from "@/features/checkout/checkout-demo";

export const metadata: Metadata = { title: "Checkout demonstrativo" };

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell" id="conteudo">
        <nav aria-label="Trilha de navegação" className="breadcrumb">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href="/carrinho">Carrinho</Link>
          <span aria-hidden="true">/</span>
          <span>Checkout</span>
        </nav>
        <CheckoutDemo />
      </main>
    </>
  );
}
