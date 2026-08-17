"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, Copy, Minus, Plus, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/cart-provider";
import { formatBRL } from "./money";
import type { DemoProduct } from "./types";

type ShippingOption = {
  id: string;
  label: string;
  priceCents: number;
  estimate: string;
};

export function ProductPurchase({ product }: { product: DemoProduct }) {
  const firstAvailable = product.variants.find((variant) => variant.stock > 0);
  const [variantId, setVariantId] = useState(
    firstAvailable?.id ?? product.variants[0]?.id ?? "",
  );
  const [quantity, setQuantity] = useState(1);
  const [shareStatus, setShareStatus] = useState("");
  const [cep, setCep] = useState("");
  const [shipping, setShipping] = useState<ShippingOption[]>([]);
  const [shippingStatus, setShippingStatus] = useState("");
  const [shippingLoading, setShippingLoading] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { addItem, loading, message } = useCart();
  const selected = product.variants.find((variant) => variant.id === variantId);
  const available = Boolean(selected && selected.stock > 0);
  const maxQuantity = selected
    ? Math.min(selected.stock, product.maxPerOrder)
    : 1;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const requested = new URL(window.location.href).searchParams.get(
        "variacao",
      );
      const availableVariant = product.variants.find(
        (variant) => variant.id === requested && variant.stock > 0,
      );
      if (availableVariant) setVariantId(availableVariant.id);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [product.variants]);

  function selectVariant(id: string) {
    setVariantId(id);
    setQuantity(1);
    const url = new URL(window.location.href);
    url.searchParams.set("variacao", id);
    window.history.replaceState({}, "", url);
  }

  async function shareProduct() {
    setShareStatus("");
    const url = new URL(window.location.href);
    url.searchParams.set("variacao", variantId);
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: "Produto demonstrativo SOL & PETALAS",
          url: url.toString(),
        });
        setShareStatus("Link compartilhado.");
      } else {
        await navigator.clipboard.writeText(url.toString());
        setShareStatus("Link copiado.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(url.toString());
        setShareStatus("Link copiado.");
      } catch {
        setShareStatus("Não foi possível compartilhar o link.");
      }
    }
  }

  async function checkCep(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = cep.replace(/\D/g, "");
    setShipping([]);
    if (digits.length !== 8) {
      setShippingStatus("Informe um CEP com 8 dígitos.");
      return;
    }
    setShippingLoading(true);
    setShippingStatus("");
    try {
      let data: {
        error?: string;
        address?: { city: string; state: string };
        shipping?: ShippingOption[];
      };

      if (process.env.NEXT_PUBLIC_STATIC_DEMO === "true") {
        const response = await fetch(
          `https://viacep.com.br/ws/${digits}/json/`,
        );
        const address = (await response.json()) as {
          erro?: boolean;
          localidade?: string;
          uf?: string;
        };
        if (!response.ok || address.erro)
          throw new Error("CEP não encontrado.");
        data = {
          address: {
            city: address.localidade ?? "",
            state: address.uf ?? "",
          },
          shipping: [
            {
              id: "demo-economico",
              label: "Envio econômico — simulação",
              priceCents: 1890,
              estimate: "5 a 8 dias úteis (demonstrativo)",
            },
            {
              id: "demo-expresso",
              label: "Envio expresso — simulação",
              priceCents: 2990,
              estimate: "2 a 4 dias úteis (demonstrativo)",
            },
          ],
        };
      } else {
        const response = await fetch("/api/cep", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cep: digits }),
        });
        data = (await response.json()) as typeof data;
        if (!response.ok) throw new Error(data.error ?? "Falha na consulta.");
      }

      setShipping(data.shipping ?? []);
      setShippingStatus(
        `Destino consultado: ${data.address?.city ?? ""} — ${data.address?.state ?? ""}. Valores abaixo são apenas demonstração.`,
      );
    } catch (error) {
      setShippingStatus(
        error instanceof Error ? error.message : "Frete indisponível.",
      );
    } finally {
      setShippingLoading(false);
    }
  }

  return (
    <div className="product-detail">
      <section aria-label="Galeria do produto" className="product-gallery">
        <button
          className="product-gallery__main"
          onClick={() => dialogRef.current?.showModal()}
          type="button"
        >
          <Image
            alt={product.imageAlt}
            fetchPriority="high"
            fill
            loading="eager"
            sizes="(max-width: 64rem) 100vw, 55vw"
            src={product.image}
          />
          <span>Toque ou clique para ampliar</span>
        </button>
        <div className="product-thumbnails">
          <button aria-current="true" type="button">
            <Image alt="" height={72} src={product.image} width={72} />
          </button>
          <span>1 imagem demonstrativa</span>
        </div>
      </section>

      <section className="product-buy" aria-labelledby="product-name">
        <p className="product-card__category">
          {product.categoryLabel} · Demonstração
        </p>
        <h1 id="product-name">{product.name}</h1>
        <p className="product-buy__description">{product.description}</p>
        <p className="product-buy__price">{formatBRL(product.priceCents)}</p>
        <p className="payment-note">
          Parcelamento e juros ainda não definidos. O BACEN não estabelece uma
          tabela universal de parcelas.
        </p>

        <fieldset className="variant-fieldset">
          <legend>
            Variação: <strong>{selected?.name ?? "selecione"}</strong>
          </legend>
          <div className="variant-options">
            {product.variants.map((variant) => (
              <button
                aria-pressed={variant.id === variantId}
                className="variant-option"
                disabled={variant.stock < 1}
                key={variant.id}
                onClick={() => selectVariant(variant.id)}
                type="button"
              >
                {variant.colorHex ? (
                  <span
                    aria-hidden="true"
                    className="color-swatch"
                    style={{ backgroundColor: variant.colorHex }}
                  />
                ) : null}
                <span>{variant.name}</span>
                {variant.id === variantId ? <Check aria-hidden="true" /> : null}
                {variant.stock < 1 ? <small>Indisponível</small> : null}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="purchase-row">
          <div
            className="quantity-control"
            role="group"
            aria-label="Quantidade"
          >
            <button
              aria-label="Diminuir quantidade"
              disabled={quantity <= 1}
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              type="button"
            >
              <Minus aria-hidden="true" />
            </button>
            <output aria-live="polite">{quantity}</output>
            <button
              aria-label="Aumentar quantidade"
              disabled={quantity >= maxQuantity}
              onClick={() =>
                setQuantity((value) => Math.min(maxQuantity, value + 1))
              }
              type="button"
            >
              <Plus aria-hidden="true" />
            </button>
          </div>
          <Button
            className="add-to-cart"
            disabled={!available}
            loading={loading}
            onClick={() =>
              void addItem({ productId: product.id, variantId, quantity })
            }
            size="xl"
          >
            {available ? "Adicionar ao carrinho" : "Variação indisponível"}
          </Button>
        </div>
        <p aria-live="polite" className="action-message">
          {message}
        </p>
        <p className="stock-note">
          Limite demonstrativo: {product.maxPerOrder} por pedido. Reserva
          prevista por 15 minutos no checkout futuro.
        </p>

        <Button
          className="share-button"
          onClick={() => void shareProduct()}
          variant="outline"
        >
          {shareStatus === "Link copiado." ? (
            <Copy aria-hidden="true" />
          ) : (
            <Share2 aria-hidden="true" />
          )}
          Compartilhar
        </Button>
        <p aria-live="polite" className="action-message">
          {shareStatus}
        </p>

        <form
          className="shipping-form"
          onSubmit={(event) => void checkCep(event)}
        >
          <label htmlFor="cep">Calcular entrega por CEP</label>
          <div>
            <input
              autoComplete="postal-code"
              id="cep"
              inputMode="numeric"
              maxLength={9}
              onChange={(event) => {
                const digits = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 8);
                setCep(
                  digits.length > 5
                    ? `${digits.slice(0, 5)}-${digits.slice(5)}`
                    : digits,
                );
              }}
              placeholder="00000-000"
              value={cep}
            />
            <Button loading={shippingLoading} type="submit" variant="secondary">
              Consultar
            </Button>
          </div>
        </form>
        <p aria-live="polite" className="shipping-status">
          {shippingStatus}
        </p>
        {shipping.length > 0 ? (
          <ul className="shipping-options">
            {shipping.map((option) => (
              <li key={option.id}>
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.estimate}</small>
                </span>
                <strong>{formatBRL(option.priceCents)}</strong>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="product-accordions">
          <details open>
            <summary>Descrição e dados</summary>
            <p>{product.description}</p>
          </details>
          <details>
            <summary>Materiais e cuidados</summary>
            <ul>
              {product.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </details>
          <details>
            <summary>Avaliações</summary>
            <p>
              Ainda não existem avaliações. Nenhuma avaliação fictícia foi
              criada.
            </p>
          </details>
        </div>
      </section>

      <dialog className="image-dialog" ref={dialogRef}>
        <button
          aria-label="Fechar ampliação"
          onClick={() => dialogRef.current?.close()}
          type="button"
        >
          <X aria-hidden="true" />
        </button>
        <Image
          alt={product.imageAlt}
          height={1200}
          src={product.image}
          width={1200}
        />
      </dialog>
    </div>
  );
}
