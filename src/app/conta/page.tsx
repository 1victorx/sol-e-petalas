import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = { title: "Conta indisponível" };

export default function AccountPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell" id="conteudo">
        <section className="empty-state">
          <h1>Área de conta ainda indisponível</h1>
          <p>
            Autenticação e área administrativa ficam fora do MVP até a definição
            do banco, papéis e autenticação multifator.
          </p>
          <Link className="primary-action" href="/catalogo">
            Voltar ao catálogo
          </Link>
        </section>
      </main>
    </>
  );
}
