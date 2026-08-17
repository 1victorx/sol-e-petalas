import type { Metadata } from "next";
import Link from "next/link";
import { Filter, Search } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { demoProducts } from "@/features/catalog/demo-products";
import { ProductCard } from "@/features/catalog/product-card";

export const metadata: Metadata = { title: "Catálogo demonstrativo" };

type CatalogPageProps = {
  searchParams: Promise<{ categoria?: string; busca?: string }>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const category =
    params.categoria === "maquiagem" || params.categoria === "acessorios"
      ? params.categoria
      : "";
  const query = params.busca?.trim().toLocaleLowerCase("pt-BR") ?? "";
  const products = demoProducts.filter((product) => {
    const matchesCategory = !category || product.category === category;
    const matchesQuery =
      !query ||
      `${product.name} ${product.categoryLabel}`
        .toLocaleLowerCase("pt-BR")
        .includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <SiteHeader />
      <main className="page-shell" id="conteudo">
        <nav aria-label="Trilha de navegação" className="breadcrumb">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <span>Catálogo</span>
        </nav>
        <header className="catalog-heading">
          <div>
            <p className="eyebrow">Catálogo temporário</p>
            <h1>Escolhas para experimentar</h1>
            <p>
              Todos os nomes, valores, imagens e estoques abaixo são fictícios e
              serão substituídos antes da produção.
            </p>
          </div>
          <p className="catalog-count" aria-live="polite">
            {products.length} {products.length === 1 ? "item" : "itens"}
          </p>
        </header>

        <form action="/catalogo" className="catalog-tools" method="get">
          <label className="search-field">
            <span className="sr-only">Buscar no catálogo</span>
            <Search aria-hidden="true" />
            <input
              defaultValue={params.busca ?? ""}
              name="busca"
              placeholder="Buscar produto"
              type="search"
            />
          </label>
          <label className="select-field">
            <Filter aria-hidden="true" />
            <span className="sr-only">Filtrar por categoria</span>
            <select defaultValue={category} name="categoria">
              <option value="">Todas as categorias</option>
              <option value="maquiagem">Maquiagem</option>
              <option value="acessorios">Acessórios</option>
            </select>
          </label>
          <button className="secondary-action" type="submit">
            Aplicar
          </button>
        </form>

        {products.length > 0 ? (
          <section
            aria-label="Produtos demonstrativos"
            className="product-grid"
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                priority={index === 0}
                product={product}
              />
            ))}
          </section>
        ) : (
          <section className="empty-state">
            <h2>Nenhum item encontrado</h2>
            <p>Tente remover os filtros ou usar outro termo.</p>
            <Link className="primary-action" href="/catalogo">
              Limpar busca
            </Link>
          </section>
        )}
      </main>
    </>
  );
}
