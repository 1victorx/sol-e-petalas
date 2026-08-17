"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Search } from "lucide-react";
import { ProductCard } from "./product-card";
import type { DemoProduct } from "./types";

export function CatalogView({
  products,
}: {
  products: readonly DemoProduct[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("categoria") ?? "";
  const category =
    categoryParam === "maquiagem" || categoryParam === "acessorios"
      ? categoryParam
      : "";
  const rawQuery = searchParams.get("busca") ?? "";
  const query = rawQuery.trim().toLocaleLowerCase("pt-BR");
  const visibleProducts = products.filter((product) => {
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
          {visibleProducts.length}{" "}
          {visibleProducts.length === 1 ? "item" : "itens"}
        </p>
      </header>

      <form
        className="catalog-tools"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const next = new URLSearchParams();
          const search = String(data.get("busca") ?? "").trim();
          const selectedCategory = String(data.get("categoria") ?? "");
          if (search) next.set("busca", search);
          if (selectedCategory) next.set("categoria", selectedCategory);
          router.push(`/catalogo${next.size ? `?${next.toString()}` : ""}`);
        }}
      >
        <label className="search-field">
          <span className="sr-only">Buscar no catálogo</span>
          <Search aria-hidden="true" />
          <input
            defaultValue={rawQuery}
            key={`search-${rawQuery}`}
            name="busca"
            placeholder="Buscar produto"
            type="search"
          />
        </label>
        <label className="select-field">
          <Filter aria-hidden="true" />
          <span className="sr-only">Filtrar por categoria</span>
          <select
            defaultValue={category}
            key={`category-${category}`}
            name="categoria"
          >
            <option value="">Todas as categorias</option>
            <option value="maquiagem">Maquiagem</option>
            <option value="acessorios">Acessórios</option>
          </select>
        </label>
        <button className="secondary-action" type="submit">
          Aplicar
        </button>
      </form>

      {visibleProducts.length > 0 ? (
        <section aria-label="Produtos demonstrativos" className="product-grid">
          {visibleProducts.map((product, index) => (
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
    </>
  );
}
