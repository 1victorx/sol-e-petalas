import Link from "next/link";
import { Search, UserRound } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { CartLink } from "@/features/cart/cart-link";

const links = [
  { href: "/catalogo?categoria=maquiagem", label: "Maquiagem" },
  { href: "/catalogo?categoria=acessorios", label: "Acessórios" },
  { href: "/catalogo", label: "Novidades" },
] as const;

export function SiteHeader() {
  return (
    <>
      <div className="demo-bar" role="status">
        Ambiente demonstrativo — produtos, preços, estoque e pedidos são
        fictícios.
      </div>
      <header className="site-header">
        <div className="site-header__inner">
          <nav aria-label="Categorias" className="site-header__nav">
            {links.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </nav>
          <Logo className="site-header__logo" />
          <nav aria-label="Ações" className="site-header__actions">
            <Link aria-label="Buscar" href="/buscar">
              <Search aria-hidden="true" />
            </Link>
            <Link aria-label="Minha conta" href="/conta">
              <UserRound aria-hidden="true" />
            </Link>
            <CartLink />
          </nav>
        </div>
      </header>
    </>
  );
}
