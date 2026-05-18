"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/api";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import type { Product } from "@/types/api";
import { PlaceImg, pickTint } from "@/components/design";

export function ProductCard({ product, tag }: { product: Product; tag?: string }) {
  const image = product.images[0]?.url ?? null;
  const tint = pickTint(product.id);
  const lowStock = product.stock > 0 && product.stock < 6;
  const { addItem } = useCart();
  const { push } = useToast();

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.stock) return;
    addItem(product, 1);
    push({
      message: `${product.name} ditambahkan ke keranjang.`,
      href: "/cart",
      cta: "Lihat",
      tone: "success"
    });
  }

  return (
    <article
      className="tn-card tn-card-hover"
      style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
      <Link href={`/products/${product.slug}`} style={{ position: "relative", display: "block" }}>
        <div
          className="tn-img-zoom"
          style={{ aspectRatio: "4/5", position: "relative", background: "var(--paper-soft)" }}
        >
          {image ? (
            <Image
              src={image}
              alt={product.images[0]?.alt_text ?? product.name}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <PlaceImg label={product.name} tint={tint} ratio="4/5" style={{ height: "100%" }} />
          )}
        </div>
        {tag && (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "var(--paper)",
              color: "var(--ink)",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "5px 9px",
              border: "1px solid var(--line)"
            }}
          >
            {tag}
          </span>
        )}
        <button
          aria-label="Simpan"
          onClick={(e) => e.preventDefault()}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 34,
            height: 34,
            borderRadius: 999,
            background: "rgba(250,246,238,0.85)",
            border: "1px solid var(--line)",
            backdropFilter: "blur(6px)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--ink)"
          }}
        >
          <Heart size={15} />
        </button>
      </Link>
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 6 }}>
        <div className="tn-label-mono" style={{ fontSize: 11 }}>
          {(product.images[0]?.alt_text ?? "Toko Nusa").toUpperCase()}
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              lineHeight: 1.1,
              fontStyle: "italic"
            }}
          >
            {product.name}
          </h3>
        </Link>
        <div
          style={{
            marginTop: 12,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 8
          }}
        >
          <span className="tn-price" style={{ fontSize: 15 }}>
            {formatCurrency(product.price)}
          </span>
          <span className="tn-label-mono" style={{ fontSize: 11 }}>
            {product.stock === 0 ? "Habis" : lowStock ? `Sisa ${product.stock}` : "Tersedia"}
          </span>
        </div>
        <button
          onClick={quickAdd}
          disabled={!product.stock}
          className="tn-btn tn-btn-sm"
          style={{ marginTop: 14, width: "100%" }}
        >
          <Plus size={14} /> {product.stock ? "Tambah ke keranjang" : "Stok habis"}
        </button>
      </div>
    </article>
  );
}
