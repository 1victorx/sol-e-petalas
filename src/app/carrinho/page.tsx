import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { CartView } from "@/features/cart/cart-view";

export const metadata: Metadata = { title: "Carrinho demonstrativo" };

export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell" id="conteudo">
        <nav aria-label="Trilha de navegação" className="breadcrumb">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <span>Carrinho</span>
        </nav>
        <CartView />
      </main>
    </>
  );
}
