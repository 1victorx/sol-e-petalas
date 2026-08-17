import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = { title: "Sobre o projeto" };

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell content-page" id="conteudo">
        <nav aria-label="Trilha de navegação" className="breadcrumb">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <span>Sobre</span>
        </nav>
        <p className="eyebrow">SOL & PETALAS</p>
        <h1>Uma loja em preparação</h1>
        <p>
          A SOL & PETALAS terá foco inicial em maquiagens e acessórios
          femininos, com atendimento planejado para todo o Brasil. Este site é
          uma demonstração técnica e visual: não realiza vendas, não coleta
          dados pessoais e não representa um catálogo comercial definitivo.
        </p>
        <h2>O que ainda falta</h2>
        <p>
          Catálogo oficial, dados empresariais, políticas, CEP de origem,
          dimensões dos produtos, regras comerciais, conta do provedor de
          pagamento e WhatsApp oficial.
        </p>
      </main>
    </>
  );
}
