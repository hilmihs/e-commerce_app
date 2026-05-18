"use client";

import { Minus, Plus, Heart } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "@/lib/api";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import type { Product } from "@/types/api";

export function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { push } = useToast();
  const disabled = !product.stock;

  function handleAdd() {
    addItem(product, quantity);
    push({
      message: `${product.name} ditambahkan ke keranjang.`,
      href: "/cart",
      cta: "Lihat",
      tone: "success"
    });
  }

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          border: "1px solid var(--line)",
          height: 56,
          borderRadius: 999,
          overflow: "hidden"
        }}
      >
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          style={{
            width: 52,
            height: 56,
            background: "transparent",
            border: 0,
            cursor: "pointer",
            color: "var(--ink)"
          }}
          aria-label="Kurangi"
        >
          <Minus size={16} />
        </button>
        <span className="tn-price" style={{ minWidth: 28, textAlign: "center", fontSize: 15 }}>
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))}
          style={{
            width: 52,
            height: 56,
            background: "transparent",
            border: 0,
            cursor: "pointer",
            color: "var(--ink)"
          }}
          aria-label="Tambah"
        >
          <Plus size={16} />
        </button>
      </div>
      <button
        className="tn-btn tn-btn-lg"
        style={{ flex: 1, minWidth: 240 }}
        disabled={disabled}
        onClick={handleAdd}
      >
        Tambahkan ke keranjang · {formatCurrency(product.price * quantity)}
      </button>
      <button
        className="tn-btn tn-btn-ghost tn-btn-lg"
        style={{ width: 56, padding: 0 }}
        aria-label="Wishlist"
      >
        <Heart size={18} />
      </button>
    </div>
  );
}
