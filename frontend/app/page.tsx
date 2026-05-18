import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Leaf, Package } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { PlaceImg, SectionHead } from "@/components/design";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/api";

export const dynamic = "force-dynamic";

const CATEGORIES = [
  { slug: "wastra", name: "Wastra", hint: "Kain & tenun" },
  { slug: "rumah", name: "Rumah", hint: "Furniture & dekor" },
  { slug: "dapur", name: "Dapur", hint: "Keramik & utensil" },
  { slug: "pantry", name: "Pantry", hint: "Kopi, madu, rempah" },
  { slug: "rawat-diri", name: "Rawat Diri", hint: "Sabun & minyak" },
  { slug: "kriya", name: "Kriya", hint: "Anyaman & ukir" }
];

const PROMISES = [
  { icon: Truck, h: "Ongkir RajaOngkir", d: "Hitung otomatis JNE, J&T, SiCepat dari Jakarta." },
  { icon: ShieldCheck, h: "Bayar aman", d: "Midtrans Snap · QRIS, VA, kartu, e-wallet." },
  { icon: Leaf, h: "Kemasan ulang", d: "Karton daur ulang & isian kertas serat." },
  { icon: Package, h: "Garansi pengrajin", d: "Cacat di luar wajar diganti dalam 14 hari." }
];

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Produk belum bisa dimuat.";
  }

  const { c: activeCategory } = await searchParams;
  const filtered = activeCategory
    ? products.filter((_, i) => {
        const cats = CATEGORIES.map((c) => c.slug);
        const idx = cats.indexOf(activeCategory);
        return idx < 0 ? true : i % cats.length === idx;
      })
    : products;
  const featured = filtered.slice(0, 8);
  const activeCat = CATEGORIES.find((c) => c.slug === activeCategory);

  return (
    <>
      {/* HERO — asymmetric editorial split */}
      <section style={{ padding: "64px 40px 80px", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 48,
            alignItems: "end"
          }}
        >
          <div style={{ paddingBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
              <span className="tn-num">№ 01 — KATALOG MUSIM PANEN</span>
              <span style={{ flex: 1, height: 1, background: "var(--ink)", maxWidth: 120 }} />
              <span className="tn-num">MEI · MMXXVI</span>
            </div>
            <h1 className="tn-display-1" style={{ marginBottom: 32 }}>
              Kriya
              <br />
              <em style={{ fontStyle: "italic" }}>Nusantara</em>,
              <br />
              pulang ke{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>rumah</em>.
            </h1>
            <p style={{ maxWidth: 480, fontSize: 17, lineHeight: 1.55, color: "var(--ink-soft)" }}>
              Dua belas pulau, empat puluh tujuh pembuat, satu keranjang. Belanja kriya kurasi
              langsung dari studio dan dusun, dengan checkout cepat dan ongkir transparan.
            </p>
            <div style={{ marginTop: 36, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <Link href="#katalog" className="tn-btn tn-btn-lg">
                Lihat katalog <ArrowRight size={16} />
              </Link>
              <Link href="#cerita" className="tn-btn tn-btn-ghost tn-btn-lg">
                Cerita pembuat
              </Link>
            </div>
            <div
              style={{
                marginTop: 56,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 0,
                borderTop: "1px solid var(--line)"
              }}
            >
              {[
                { k: "47", l: "pembuat terkurasi" },
                { k: "12", l: "pulau" },
                { k: "< 2h", l: "pengemasan" }
              ].map((s, i) => (
                <div
                  key={s.l}
                  style={{
                    padding: "20px 0",
                    borderLeft: i ? "1px solid var(--line)" : "none",
                    paddingLeft: i ? 24 : 0
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 48,
                      lineHeight: 1,
                      fontStyle: i === 1 ? "italic" : "normal"
                    }}
                  >
                    {s.k}
                  </div>
                  <div className="tn-body-sm" style={{ marginTop: 6 }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Hero image */}
          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1fr 0.45fr",
              gap: 12,
              minHeight: 560
            }}
          >
            <PlaceImg label="Hero · tenun ikat Sumba" tint={3} ratio="auto" style={{ height: "100%" }} />
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 12 }}>
              <PlaceImg label="rotan tertulis" tint={5} ratio="auto" style={{ height: "100%" }} />
              <PlaceImg label="madu hutan" tint="dark" ratio="auto" style={{ height: "100%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY INDEX */}
      <section
        style={{
          padding: "64px 40px",
          background: "var(--page)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 16
          }}
        >
          <div>
            <div className="tn-eyebrow" style={{ marginBottom: 10 }}>№ 02 · INDEKS</div>
            <h2 className="tn-display-4">
              Telusuri menurut <em style={{ fontStyle: "italic" }}>kategori</em>
            </h2>
          </div>
          <Link href="#katalog" className="tn-btn-link" style={{ fontSize: 13 }}>
            Semua kategori <ArrowRight size={13} style={{ display: "inline" }} />
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            borderTop: "1px solid var(--ink)"
          }}
          className="cat-grid"
        >
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.slug}
              href={`/?c=${c.slug}#katalog`}
              style={{
                padding: "20px 16px 20px 0",
                borderRight: i < CATEGORIES.length - 1 ? "1px solid var(--line)" : "none",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minHeight: 140
              }}
            >
              <span className="tn-num">№ 0{i + 1}</span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 34,
                  lineHeight: 1.02,
                  marginTop: 6
                }}
              >
                {c.name}
              </span>
              <span className="tn-body-sm" style={{ marginTop: "auto" }}>
                {c.hint}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                Lihat <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED GRID */}
      <section id="katalog" style={{ padding: "96px 40px 32px" }}>
        <SectionHead
          num="№ 03"
          eyebrow={activeCat ? `KATEGORI · ${activeCat.name.toUpperCase()}` : "DIPILIH MINGGU INI"}
          title={activeCat ? `Pilihan dari` : "Sembilan benda yang"}
          italic={activeCat ? activeCat.name.toLowerCase() : "pantas singgah."}
          action={
            activeCategory ? (
              <Link href="/" className="tn-btn-link" style={{ fontSize: 13 }}>
                Hapus filter <ArrowRight size={13} style={{ display: "inline" }} />
              </Link>
            ) : (
              <Link href="/" className="tn-btn-link" style={{ fontSize: 13 }}>
                Semua produk <ArrowRight size={13} style={{ display: "inline" }} />
              </Link>
            )
          }
        />
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          <Link
            href="/"
            className={!activeCategory ? "tn-chip tn-chip-active" : "tn-chip"}
            style={{ textDecoration: "none" }}
          >
            Semua
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/?c=${c.slug}#katalog`}
              className={activeCategory === c.slug ? "tn-chip tn-chip-active" : "tn-chip"}
              style={{ textDecoration: "none" }}
            >
              {c.name}
            </Link>
          ))}
        </div>
        {error ? (
          <div
            style={{
              padding: 16,
              border: "1px solid var(--warning)",
              background: "var(--paper-soft)",
              color: "var(--warning)",
              fontSize: 14
            }}
          >
            {error}
          </div>
        ) : featured.length === 0 ? (
          <div
            className="tn-card"
            style={{ padding: 40, textAlign: "center", color: "var(--muted)" }}
          >
            Belum ada produk. Tambahkan dari admin atau jalankan seeder.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20
            }}
            className="product-grid"
          >
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} tag={i === 0 ? "Edisi terbatas" : undefined} />
            ))}
          </div>
        )}
      </section>

      {/* EDITORIAL BAND */}
      <section id="cerita" style={{ padding: "120px 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1.3fr",
            gap: 64,
            alignItems: "center"
          }}
          className="story-grid"
        >
          <PlaceImg label="potret pembuat" tint={1} ratio="3/4" />
          <div>
            <div className="tn-eyebrow" style={{ marginBottom: 18 }}>№ 04 · CERITA PEMBUAT</div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4vw, 56px)",
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
                marginBottom: 32,
                color: "var(--ink)"
              }}
            >
              “Setiap helai tenun butuh empat puluh hari di tangan ibu-ibu.{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>Bukan barang murah</em>, tapi adil.”
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ width: 1, height: 36, background: "var(--ink)" }} />
              <div>
                <div style={{ fontWeight: 500 }}>Ratna Hidayah</div>
                <div className="tn-body-sm">Studio Waingapu · Sumba Timur</div>
              </div>
              <span style={{ flex: 1 }} />
              <button className="tn-btn tn-btn-ghost">
                Baca jurnal <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROMISES */}
      <section style={{ padding: "40px 40px 88px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "1px solid var(--ink)"
          }}
          className="promise-grid"
        >
          {PROMISES.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.h}
                style={{
                  padding: "28px 24px 0 0",
                  borderRight: i < 3 ? "1px solid var(--line)" : "none",
                  paddingLeft: i ? 24 : 0
                }}
              >
                <div style={{ color: "var(--terracotta)", marginBottom: 14 }}>
                  <Icon size={22} strokeWidth={1.4} />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 26,
                    fontStyle: "italic",
                    marginBottom: 8
                  }}
                >
                  {p.h}
                </div>
                <div className="tn-body-sm">{p.d}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1024px) {
          .product-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .cat-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .promise-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .story-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .promise-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
