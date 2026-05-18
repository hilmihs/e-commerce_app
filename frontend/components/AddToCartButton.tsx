"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/types/api";

export function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        className="focus-ring h-12 w-24 rounded border border-line bg-white px-3"
        min={1}
        max={product.stock}
        type="number"
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      />
      <button
        className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded bg-ink px-5 font-semibold text-white hover:bg-brand disabled:cursor-not-allowed disabled:bg-line"
        disabled={!product.stock}
        onClick={() => addItem(product, quantity)}
      >
        <ShoppingCart aria-hidden size={18} />
        Tambah ke cart
      </button>
    </div>
  );
}
