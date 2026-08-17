"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Banknote,
  CreditCard,
  MessageCircle,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/features/catalog/money";
import { useCart } from "@/features/cart/cart-provider";

export function CheckoutDemo() {
  const { items, quote, loading, message, refreshQuote } = useCart();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (items.length > 0) void refreshQuote();
  }, [items, refreshQuote]);

  if (items.length === 0) {
    return (
      <section className="empty-state">
        <h1>Não há itens para finalizar</h1>
        <p>Adicione um produto antes de testar o checkout.</p>
        <Link className="primary-action" href="/catalogo">
          Ver catálogo
        </Link>
      </section>
    );
  }

  return (
    <div className="checkout-layout">
      <section className="checkout-main">
        <p className="eyebrow">Checkout demonstrativo · bloqueado</p>
        <h1>Revise antes de continuar</h1>
        <div className="security-callout">
          <ShieldCheck aria-hidden="true" />
          <div>
            <strong>Nenhuma cobrança será feita</strong>
            <p>
              O adaptador do Mercado Pago ainda não está conectado. Não informe
              dados reais.
            </p>
          </div>
        </div>

        <section aria-labelledby="contact-title" className="checkout-section">
          <h2 id="contact-title">Contato e endereço</h2>
          <p>
            O formulário real será habilitado somente após aprovação das
            políticas de privacidade, retenção e do número oficial de WhatsApp.
          </p>
          <div className="disabled-form" aria-disabled="true">
            <label>
              Nome completo
              <input disabled placeholder="Aguardando política aprovada" />
            </label>
            <label>
              Celular
              <input disabled placeholder="Aguardando WhatsApp oficial" />
            </label>
            <label>
              Endereço
              <input disabled placeholder="Aguardando integração" />
            </label>
          </div>
        </section>

        <section aria-labelledby="payment-title" className="checkout-section">
          <h2 id="payment-title">Forma de pagamento prevista</h2>
          <div className="payment-methods" aria-label="Métodos planejados">
            <div>
              <QrCode aria-hidden="true" />
              <strong>Pix</strong>
              <small>Indisponível na demonstração</small>
            </div>
            <div>
              <CreditCard aria-hidden="true" />
              <strong>Cartão</strong>
              <small>Checkout hospedado futuro</small>
            </div>
            <div>
              <Banknote aria-hidden="true" />
              <strong>Boleto</strong>
              <small>Indisponível na demonstração</small>
            </div>
          </div>
          <p className="payment-note">
            Não há campos de cartão neste site. No futuro, os dados serão
            coletados diretamente pelo checkout hospedado do provedor.
          </p>
        </section>

        <Button
          loading={loading}
          onClick={async () => {
            const validated = await refreshQuote();
            setStatus(
              validated
                ? "Carrinho validado. A criação do pedido permanece bloqueada até as integrações e políticas serem aprovadas."
                : "Não foi possível validar o carrinho.",
            );
          }}
          size="xl"
        >
          <MessageCircle aria-hidden="true" /> Validar demonstração
        </Button>
        <p aria-live="polite" className="action-message">
          {status || message}
        </p>
      </section>

      <aside className="cart-summary checkout-summary">
        <h2>Resumo validado</h2>
        <ul>
          {quote?.lines.map((line) => (
            <li key={`${line.productId}:${line.variantId}`}>
              <span>
                {line.quantity}× {line.name}
                <small>{line.variantName}</small>
              </span>
              <strong>{formatBRL(line.lineTotalCents)}</strong>
            </li>
          ))}
        </ul>
        <dl>
          <div className="cart-summary__total">
            <dt>Total provisório</dt>
            <dd>{formatBRL(quote?.subtotalCents ?? 0)}</dd>
          </div>
        </dl>
        <p>
          Frete não incluído. Pedido, reserva e pagamento não são criados neste
          MVP.
        </p>
      </aside>
    </div>
  );
}
