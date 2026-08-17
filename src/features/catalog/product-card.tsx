import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatBRL } from "./money";
import { QuickAddButton } from "./quick-add-button";
import type { DemoProduct } from "./types";

export function ProductCard({
  product,
  priority = false,
}: {
  product: DemoProduct;
  priority?: boolean;
}) {
  const available = product.variants.filter((variant) => variant.stock > 0);
  const quickVariant = available.length === 1 ? available[0] : undefined;

  return (
    <article className="product-card">
      <Link className="product-card__image" href={`/produto/${product.slug}`}>
        <Badge className="product-card__badge" variant="secondary">
          Demonstração
        </Badge>
        <Image
          alt={product.imageAlt}
          fill
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 42rem) 100vw, (max-width: 64rem) 50vw, 25vw"
          src={product.image}
        />
      </Link>
      <div className="product-card__content">
        <p className="product-card__category">{product.categoryLabel}</p>
        <h2>
          <Link href={`/produto/${product.slug}`}>{product.name}</Link>
        </h2>
        <p className="product-card__price">{formatBRL(product.priceCents)}</p>
        <p className="product-card__stock">
          {available.length > 0
            ? "Disponível no estoque demonstrativo"
            : "Indisponível"}
        </p>
      </div>
      {quickVariant ? (
        <QuickAddButton productId={product.id} variantId={quickVariant.id} />
      ) : (
        <Link
          className="product-card__choose"
          href={`/produto/${product.slug}`}
        >
          Escolher variação
        </Link>
      )}
    </article>
  );
}
