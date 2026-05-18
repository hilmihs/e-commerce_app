"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Wordmark } from "@/components/design";

const NAV = [
  ["Katalog", "/"],
  ["Wastra", "/?c=wastra"],
  ["Rumah", "/?c=rumah"],
  ["Pantry", "/?c=pantry"],
  ["Jurnal", "/jurnal"]
] as const;

const FOOTER_COLS = [
  { h: "Belanja", items: ["Katalog", "Edisi terbatas", "Restock", "Kartu hadiah"] },
  { h: "Bantuan", items: ["Pengiriman", "Pengembalian", "Lacak pesanan", "Hubungi"] },
  { h: "Cerita", items: ["Pembuat", "Jurnal", "Workshop", "Tentang"] },
  { h: "Akun", items: ["Masuk", "Daftar", "Pesanan saya", "Wishlist"] }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const minimal =
    pathname?.startsWith("/checkout") ||
    pathname?.startsWith("/payment") ||
    pathname?.startsWith("/admin");

  if (minimal) {
    return <div style={{ minHeight: "100vh", background: "var(--paper)" }}>{children}</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <header style={{ borderBottom: "1px solid var(--line)", background: "var(--paper)" }}>
        {/* Marquee strip */}
        <div
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
            padding: "8px 40px",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            display: "flex",
            gap: 40,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <span>Gratis ongkir Jabodetabek di atas Rp 350.000</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Dikurasi dari 12 pulau di Nusantara</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Bayar pakai Midtrans Snap</span>
        </div>
        {/* Main bar */}
        <div
          style={{
            padding: "20px 40px",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 32
          }}
        >
          <nav style={{ display: "flex", gap: 28, fontSize: 14, color: "var(--ink-soft)", flexWrap: "wrap" }}>
            {NAV.map(([n, h]) => {
              const active = pathname === h.split("?")[0];
              return (
                <Link
                  key={n}
                  href={h}
                  style={{
                    fontWeight: active ? 500 : 400,
                    color: active ? "var(--ink)" : "var(--ink-soft)",
                    borderBottom: active ? "1px solid var(--ink)" : "1px solid transparent",
                    paddingBottom: 2
                  }}
                >
                  {n}
                </Link>
              );
            })}
          </nav>
          <Link href="/" style={{ justifySelf: "center" }}>
            <Wordmark size={28} />
          </Link>
          <div
            style={{
              display: "flex",
              gap: 18,
              justifyContent: "flex-end",
              alignItems: "center",
              color: "var(--ink)"
            }}
          >
            <button className="tn-btn-link" style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
              <Search size={17} /> <span style={{ fontSize: 13 }}>Cari</span>
            </button>
            <Link href="/admin/login" className="tn-btn-link" style={{ textDecoration: "none" }} aria-label="Admin">
              <ShieldCheck size={18} />
            </Link>
            <Link
              href="/cart"
              className="tn-btn-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                position: "relative"
              }}
            >
              <ShoppingBag size={18} />
              <span style={{ fontSize: 13 }}>Keranjang</span>
              {totalItems > 0 && (
                <span
                  className="tn-price"
                  style={{
                    fontSize: 11,
                    padding: "2px 6px",
                    background: "var(--terracotta)",
                    color: "var(--paper)",
                    borderRadius: 999,
                    minWidth: 18,
                    textAlign: "center"
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer
        style={{
          marginTop: 120,
          background: "var(--ink)",
          color: "var(--paper)",
          padding: "72px 40px 28px"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr",
            gap: 48,
            alignItems: "start"
          }}
          className="footer-grid"
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 56,
                lineHeight: 0.95,
                letterSpacing: "-0.015em"
              }}
            >
              Kriya yang
              <br />
              <em style={{ fontStyle: "italic" }}>bertahan</em>.
            </div>
            <p
              style={{
                marginTop: 24,
                fontSize: 13,
                color: "rgba(245,239,228,0.65)",
                maxWidth: 320,
                lineHeight: 1.6
              }}
            >
              Toko Nusa adalah kurator independen untuk kriya dan pangan dari Sabang sampai Merauke. Setiap produk dipilih langsung dari pembuatnya.
            </p>
          </div>
          {FOOTER_COLS.map((c) => (
            <div key={c.h}>
              <div className="tn-eyebrow" style={{ color: "rgba(245,239,228,0.5)", marginBottom: 14 }}>
                {c.h}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                {c.items.map((i) => (
                  <li key={i} style={{ fontSize: 14 }}>
                    <a href="#" style={{ color: "var(--paper)" }}>
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 56,
            paddingTop: 20,
            borderTop: "1px solid rgba(245,239,228,0.12)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(245,239,228,0.5)",
            flexWrap: "wrap",
            gap: 12
          }}
        >
          <span>© Toko Nusa MMXXVI · Jakarta</span>
          <span>v 1.0 · Next.js · Midtrans · Supabase</span>
        </div>
      </footer>
    </div>
  );
}
