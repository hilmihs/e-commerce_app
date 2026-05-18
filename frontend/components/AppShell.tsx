"use client";

import Link from "next/link";
import { ShoppingBag, ShoppingCart, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded bg-ink text-white">
              <ShoppingBag aria-hidden size={19} />
            </span>
            Toko Nusa
          </Link>
          <nav className="flex items-center gap-2 text-sm font-medium">
            <Link className="rounded px-3 py-2 text-muted hover:bg-surface hover:text-ink" href="/">
              Katalog
            </Link>
            <Link className="relative rounded px-3 py-2 text-muted hover:bg-surface hover:text-ink" href="/cart">
              <ShoppingCart aria-hidden size={18} className="inline" />
              {totalItems > 0 ? (
                <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-accent px-1 text-center text-xs leading-5 text-white">
                  {totalItems}
                </span>
              ) : null}
            </Link>
            <Link className="rounded px-3 py-2 text-muted hover:bg-surface hover:text-ink" href="/admin/login">
              <ShieldCheck aria-hidden size={18} className="inline" />
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
