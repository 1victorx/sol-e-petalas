"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/features/catalog/money";
import { useCart } from "./cart-provider";

export function CartView() {
  const {
    items,
    quote,
    loading,
    message,
    refreshQuote,
    updateQuantity,
    removeItem,
  } = useCart();

  useEffect(() => {
    if (items.length > 0) void refreshQuote();
  }, [items, refreshQuote]);

  if (items.length === 0) {
    return (
      <section className="empty-state cart-empty">
        <h1>Seu carrinho está vazio</h1>
        <p>
          Explore o catálogo demonstrativo e escolha um item para testar a
          jornada.
        </p>
        <Link className="primary-action" href="/catalogo">
          Ver catálogo
        </Link>
      </section>
    );
  }

  return (
    <div className="cart-layout">
      <section aria-labelledby="cart-title" className="cart-lines">
        <div className="cart-heading">
          <div>
            <p className="eyebrow">Ambiente demonstrativo</p>
            <h1 id="cart-title">Seu carrinho</h1>
          </div>
          <Button
            loading={loading}
            onClick={() => void refreshQuote()}
            variant="outline"
          >
            <RefreshCw aria-hidden="true" /> Revalidar
          </Button>
        </div>
        <p aria-live="polite" className="action-message">
          {message}
        </p>
        {quote?.lines.map((line) => (
          <article
            className="cart-line"
            key={`${line.productId}:${line.variantId}`}
          >
            <Link className="cart-line__image" href={`/produto/${line.slug}`}>
              <Image alt="" fill sizes="112px" src={line.image} />
            </Link>
            <div className="cart-line__info">
              <h2>
                <Link href={`/produto/${line.slug}`}>{line.name}</Link>
              </h2>
              <p>Variação: {line.variantName}</p>
              <p>{formatBRL(line.unitPriceCents)} por unidade</p>
              <div
                className="quantity-control"
                role="group"
                aria-label={`Quantidade de ${line.name}`}
              >
                <button
                  aria-label="Diminuir"
                  disabled={line.quantity <= 1}
                  onClick={() =>
                    updateQuantity(
                      line.productId,
                      line.variantId,
                      line.quantity - 1,
                    )
                  }
                  type="button"
                >
                  <Minus aria-hidden="true" />
                </button>
                <output>{line.quantity}</output>
                <button
                  aria-label="Aumentar"
                  disabled={line.quantity >= line.availableStock}
                  onClick={() =>
                    updateQuantity(
                      line.productId,
                      line.variantId,
                      line.quantity + 1,
                    )
                  }
                  type="button"
                >
                  <Plus aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="cart-line__total">
              <strong>{formatBRL(line.lineTotalCents)}</strong>
              <button
                className="remove-button"
                onClick={() => removeItem(line.productId, line.variantId)}
                type="button"
              >
                <Trash2 aria-hidden="true" /> Remover
              </button>
            </div>
          </article>
        ))}
      </section>

      <aside className="cart-summary">
        <h2>Resumo</h2>
        <dl>
          <div>
            <dt>Subtotal</dt>
            <dd>{formatBRL(quote?.subtotalCents ?? 0)}</dd>
          </div>
          <div>
            <dt>Frete</dt>
            <dd>A calcular</dd>
          </div>
          <div className="cart-summary__total">
            <dt>Total provisório</dt>
            <dd>{formatBRL(quote?.subtotalCents ?? 0)}</dd>
          </div>
        </dl>
        <p>
          Preço e estoque foram revalidados pelo servidor. Frete e pagamento
          permanecem demonstrativos.
        </p>
        <Link className="primary-action cart-checkout" href="/checkout">
          Continuar demonstração
        </Link>
      </aside>
    </div>
  );
}
