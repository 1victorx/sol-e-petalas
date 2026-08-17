import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      aria-label="SOL & PETALAS — página inicial"
      className={cn("brand-logo", className)}
      href="/"
    >
      <span aria-hidden="true" className="brand-monogram">
        <span className="brand-letter brand-letter-s">S</span>
        <span className="brand-letter brand-letter-p">P</span>
        <span className="brand-petal" />
      </span>
      <span className="brand-wordmark">SOL &amp; PETALAS</span>
    </Link>
  );
}
