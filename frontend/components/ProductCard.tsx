"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { formatCurrency } from "@/lib/api";
import { useCart } from "@/lib/cart";
import type { Product } from "@/types/api";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const image = product.images[0]?.url ?? "/placeholder-product.svg";

  return (
    <article className="overflow-hidden rounded border border-line bg-white shadow-sm">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-surface">
          <Image src={image} alt={product.images[0]?.alt_text ?? product.name} fill className="object-cover" />
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <Link href={`/products/${product.slug}`} className="font-semibold text-ink hover:text-brand">
            {product.name}
          </Link>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{product.description}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-semibold">{formatCurrency(product.price)}</p>
            <p className="text-xs text-muted">Stok {product.stock}</p>
          </div>
          <button
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded bg-ink text-white hover:bg-brand disabled:cursor-not-allowed disabled:bg-line"
            disabled={!product.stock}
            onClick={() => addItem(product)}
            title="Tambah ke cart"
          >
            <Plus aria-hidden size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
