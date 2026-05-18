"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/api";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem } = useCart();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-ink">Cart</h1>
          <p className="mt-1 text-sm text-muted">Periksa item sebelum checkout.</p>
        </div>
        <Link className="rounded border border-line bg-white px-4 py-2 text-sm font-semibold hover:border-brand" href="/">
          Lanjut belanja
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded border border-line bg-white p-8 text-center text-muted">Cart masih kosong.</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="space-y-3">
            {items.map((item) => (
              <article key={item.product.id} className="grid gap-4 rounded border border-line bg-white p-4 sm:grid-cols-[96px_1fr_auto]">
                <div className="relative h-24 overflow-hidden rounded bg-surface">
                  <Image
                    src={item.product.images[0]?.url ?? "/placeholder-product.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="mt-1 text-sm text-muted">{formatCurrency(item.product.price)}</p>
                  <div className="mt-3 inline-flex items-center rounded border border-line">
                    <button className="focus-ring p-2" onClick={() => setQuantity(item.product.id, item.quantity - 1)}>
                      <Minus aria-hidden size={16} />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                    <button className="focus-ring p-2" onClick={() => setQuantity(item.product.id, item.quantity + 1)}>
                      <Plus aria-hidden size={16} />
                    </button>
                  </div>
                </div>
                <button
                  className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded text-muted hover:bg-surface hover:text-ink"
                  onClick={() => removeItem(item.product.id)}
                  title="Hapus item"
                >
                  <Trash2 aria-hidden size={18} />
                </button>
              </article>
            ))}
          </section>
          <aside className="h-fit rounded border border-line bg-white p-5 shadow-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <p className="mt-2 text-sm text-muted">Ongkir dihitung di halaman checkout.</p>
            <Link
              className="focus-ring mt-5 block rounded bg-ink px-4 py-3 text-center font-semibold text-white hover:bg-brand"
              href="/checkout"
            >
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
