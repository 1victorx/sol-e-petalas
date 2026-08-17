import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";

const previewProducts = [
  { kind: "compact", label: "Maquiagem", tone: "rose" },
  { kind: "tube", label: "Beleza", tone: "saffron" },
  { kind: "pouch", label: "Acessórios", tone: "forest" },
] as const;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <section className="hero-shell">
          <div className="hero-copy">
            <p className="eyebrow">
              <Sparkles aria-hidden="true" /> Curadoria em construção
            </p>
            <h1>Beleza que encontra o seu ritmo.</h1>
            <p className="hero-lede">
              Uma experiência acolhedora para explorar maquiagens e acessórios
              femininos. Este primeiro catálogo usa conteúdo demonstrativo até a
              chegada dos produtos oficiais.
            </p>
            <div className="hero-actions">
              <Link className="primary-action" href="/catalogo">
                Explorar demonstração <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="text-action" href="/sobre">
                Conhecer o projeto
              </Link>
            </div>
            <p className="demo-assurance">
              <ShieldCheck aria-hidden="true" /> Nenhuma cobrança real é
              realizada neste ambiente.
            </p>
          </div>

          <div className="hero-products" aria-label="Prévia de categorias">
            <div className="sun-disc" aria-hidden="true" />
            {previewProducts.map((product, index) => (
              <article
                className={`preview-product preview-product--${product.tone}`}
                key={product.kind}
                style={{ "--index": index } as React.CSSProperties}
              >
                <div
                  aria-hidden="true"
                  className={`product-silhouette product-silhouette--${product.kind}`}
                />
                <p>{product.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="principios" className="principles-strip">
          <h2 className="sr-only" id="principios">
            Princípios da experiência
          </h2>
          <p>Informações comerciais identificadas com clareza</p>
          <p>Navegação acessível por toque e teclado</p>
          <p>
            {process.env.NEXT_PUBLIC_STATIC_DEMO === "true"
              ? "Valores e estoque validados no navegador desta demonstração"
              : "Valores e estoque validados no servidor"}
          </p>
        </section>
      </main>
    </>
  );
}
