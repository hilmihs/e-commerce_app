"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/AdminGuard";
import { AdminShell } from "@/components/AdminShell";
import { adminApi, formatCurrency } from "@/lib/api";
import type { AdminSession, Product } from "@/types/api";
import { PlaceImg, pickTint } from "@/components/design";

function ProductsTable({ session }: { session: AdminSession }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .products(session.token)
      .then(setProducts)
      .catch((caught) => {
        setError(caught instanceof Error ? caught.message : "Produk admin gagal dimuat.");
      });
  }, [session.token]);

  return (
    <AdminShell
      subtitle="Sabtu · Katalog"
      title={
        <>
          Produk <em style={{ fontStyle: "italic" }}>terkurasi</em>.
        </>
      }
      action={
        <button className="tn-btn" disabled>
          + Produk baru
        </button>
      }
    >
      {error && (
        <div
          style={{
            padding: 12,
            marginBottom: 20,
            border: "1px solid var(--warning)",
            background: "var(--paper-soft)",
            color: "var(--warning)",
            fontSize: 14
          }}
        >
          {error}
        </div>
      )}

      <div className="tn-card" style={{ padding: 0, overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: "22px 24px 16px"
          }}
        >
          <h3 className="tn-display-5">
            Inventori <em style={{ fontStyle: "italic" }}>terkini</em>
          </h3>
          <span className="tn-label-mono">{products.length} ITEM</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 720 }}>
            <thead>
              <tr
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  color: "var(--muted)",
                  textTransform: "uppercase"
                }}
              >
                {["", "Produk", "Harga", "Stok", "Berat", "Status"].map((h, i) => (
                  <th
                    key={i}
                    style={{
                      textAlign: "left",
                      padding: "12px 24px",
                      borderTop: "1px solid var(--ink)",
                      borderBottom: "1px solid var(--line)",
                      fontWeight: 500
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => {
                const image = p.images[0]?.url;
                const tint = pickTint(p.id);
                return (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom:
                        i < products.length - 1 ? "1px solid var(--line-soft)" : "none"
                    }}
                  >
                    <td style={{ padding: "12px 24px", width: 56 }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          position: "relative",
                          background: "var(--paper-soft)"
                        }}
                      >
                        {image ? (
                          <Image src={image} alt={p.name} fill style={{ objectFit: "cover" }} />
                        ) : (
                          <PlaceImg tint={tint} ratio="1/1" style={{ height: "100%" }} />
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "12px 24px" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16 }}>
                        {p.name}
                      </div>
                      <div className="tn-body-sm" style={{ fontSize: 11 }}>
                        {p.slug}
                      </div>
                    </td>
                    <td style={{ padding: "12px 24px" }}>
                      <span className="tn-price">{formatCurrency(p.price)}</span>
                    </td>
                    <td style={{ padding: "12px 24px" }}>
                      <span
                        className="tn-price"
                        style={{ color: p.stock < 6 ? "var(--danger)" : "var(--ink)" }}
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td style={{ padding: "12px 24px", color: "var(--ink-soft)" }}>{p.weight_grams} g</td>
                    <td style={{ padding: "12px 24px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "3px 10px",
                          borderRadius: 999,
                          background: "var(--paper-soft)",
                          border: "1px solid var(--line)",
                          fontSize: 12
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 999,
                            background: p.is_active ? "var(--success)" : "var(--muted)"
                          }}
                        />
                        {p.is_active ? "Aktif" : "Draft"}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && !error && (
                <tr>
                  <td colSpan={6} style={{ padding: 32, textAlign: "center", color: "var(--muted)" }}>
                    Belum ada produk. Tambahkan via API.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

export default function AdminProductsPage() {
  return <AdminGuard>{(session) => <ProductsTable session={session} />}</AdminGuard>;
}
