import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { CatalogView } from "@/features/catalog/catalog-view";
import { demoProducts } from "@/features/catalog/demo-products";

export const metadata: Metadata = { title: "Catálogo demonstrativo" };

export default function CatalogPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell" id="conteudo">
        <nav aria-label="Trilha de navegação" className="breadcrumb">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <span>Catálogo</span>
        </nav>
        <Suspense fallback={<p>Carregando catálogo…</p>}>
          <CatalogView products={demoProducts} />
        </Suspense>
      </main>
    </>
  );
}
