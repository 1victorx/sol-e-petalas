import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import {
  demoProducts,
  getProductBySlug,
} from "@/features/catalog/demo-products";
import { ProductPurchase } from "@/features/catalog/product-purchase";
import { ProductCard } from "@/features/catalog/product-card";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return demoProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — demonstração`,
    description: product.description,
    alternates: { canonical: `/produto/${product.slug}` },
    openGraph: { images: [{ url: product.image, alt: product.imageAlt }] },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = demoProducts
    .filter(
      (entry) => entry.category === product.category && entry.id !== product.id,
    )
    .slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="page-shell product-page" id="conteudo">
        <nav aria-label="Trilha de navegação" className="breadcrumb">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href="/catalogo">Catálogo</Link>
          <span aria-hidden="true">/</span>
          <span>{product.name}</span>
        </nav>
        <ProductPurchase product={product} />
        <section aria-labelledby="related-title" className="related-products">
          <div className="section-heading">
            <p className="eyebrow">Continue explorando</p>
            <h2 id="related-title">Produtos relacionados</h2>
          </div>
          {related.length > 0 ? (
            <div className="product-grid">
              {related.map((entry) => (
                <ProductCard key={entry.id} product={entry} />
              ))}
            </div>
          ) : (
            <p>Nenhum produto relacionado no catálogo demonstrativo.</p>
          )}
        </section>
      </main>
    </>
  );
}
