import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PlaceImg, SectionHead } from "@/components/design";
import type { Tint } from "@/components/design";
import { NewsletterForm } from "@/components/NewsletterForm";

type Article = {
  slug: string;
  num: string;
  category: string;
  title: string;
  italic?: string;
  excerpt: string;
  author: string;
  read: string;
  date: string;
  tint: Tint;
};

const ARTICLES: Article[] = [
  {
    slug: "studio-waingapu",
    num: "№ 01",
    category: "PORTRAIT",
    title: "Empat puluh hari di",
    italic: "Studio Waingapu",
    excerpt:
      "Bagaimana Ratna Hidayah dan tujuh ibu di Sumba Timur mempertahankan tenun ikat dengan pewarna mengkudu, sembari menolak permintaan ekspor massal yang akan membunuh kerajinannya sendiri.",
    author: "Tim Toko Nusa",
    read: "8 menit",
    date: "12 Mei 2026",
    tint: 3
  },
  {
    slug: "kopi-gayo",
    num: "№ 02",
    category: "PANGAN",
    title: "Gayo, kopi yang",
    italic: "berjalan lambat",
    excerpt:
      "Tentang kebun kopi keluarga di Aceh Tengah, proses natural yang butuh sabar, dan kenapa biji yang ‘bersih’ kadang justru kehilangan nyawa.",
    author: "Roastery Tanoh",
    read: "5 menit",
    date: "08 Mei 2026",
    tint: "dark"
  },
  {
    slug: "rotan-yang-belajar",
    num: "№ 03",
    category: "MATERIAL",
    title: "Rotan yang",
    italic: "belajar bengkok",
    excerpt:
      "Catatan dari Kayuh Studio: mengapa membuat lampu dari rotan adalah proses negosiasi panjang antara tangan, uap, dan kesabaran.",
    author: "Kayuh Studio",
    read: "6 menit",
    date: "02 Mei 2026",
    tint: 5
  },
  {
    slug: "ekonomi-kriya",
    num: "№ 04",
    category: "ESAI",
    title: "Adil itu",
    italic: "berapa rupiah?",
    excerpt:
      "Diskusi terbuka soal margin pembuat, harga eceran, dan kenapa Toko Nusa tidak pernah menawarkan diskon besar pada barang kerajinan.",
    author: "Tim Toko Nusa",
    read: "10 menit",
    date: "28 April 2026",
    tint: 1
  },
  {
    slug: "kemasan-ulang",
    num: "№ 05",
    category: "OPERASI",
    title: "Kemasan yang",
    italic: "tahu malu",
    excerpt:
      "Kenapa kami pakai karton daur ulang dan kertas serat, dan ekonomi dibalik keputusan kecil itu.",
    author: "Tim Toko Nusa",
    read: "4 menit",
    date: "21 April 2026",
    tint: 4
  },
  {
    slug: "tongkonan-weave",
    num: "№ 06",
    category: "PORTRAIT",
    title: "Tongkonan, dan",
    italic: "tenun yang tinggal",
    excerpt:
      "Perjalanan ke Toraja menemui Ibu Bertha — penenun selendang yang belajar dari neneknya dan menolak benang pabrik.",
    author: "Tim Toko Nusa",
    read: "7 menit",
    date: "14 April 2026",
    tint: 2
  }
];

export const metadata = {
  title: "Jurnal · Toko Nusa",
  description: "Cerita dari studio, kebun, dan dapur para pembuat Toko Nusa."
};

export default function JurnalPage() {
  const [hero, ...rest] = ARTICLES;

  return (
    <>
      {/* Hero article */}
      <section style={{ padding: "64px 40px 56px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <span className="tn-num">№ 01 — JURNAL</span>
          <span style={{ flex: 1, height: 1, background: "var(--ink)", maxWidth: 120 }} />
          <span className="tn-num">EDISI MEI · MMXXVI</span>
        </div>
        <Link
          href={`/jurnal/${hero.slug}`}
          style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: 56,
            alignItems: "center"
          }}
          className="hero-grid"
        >
          <PlaceImg label={hero.title} tint={hero.tint} ratio="4/5" />
          <div>
            <div className="tn-eyebrow" style={{ marginBottom: 14 }}>
              {hero.num} · {hero.category}
            </div>
            <h1 className="tn-display-2" style={{ marginBottom: 22 }}>
              {hero.title}{" "}
              {hero.italic && <em style={{ fontStyle: "italic" }}>{hero.italic}</em>}
            </h1>
            <p
              className="tn-body"
              style={{ fontSize: 17, lineHeight: 1.55, marginBottom: 24, maxWidth: 540 }}
            >
              {hero.excerpt}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase"
              }}
            >
              <span>{hero.author}</span>
              <span>·</span>
              <span>{hero.date}</span>
              <span>·</span>
              <span>{hero.read} baca</span>
            </div>
            <div style={{ marginTop: 24 }}>
              <span className="tn-btn-link" style={{ fontSize: 14 }}>
                Baca selengkapnya <ArrowRight size={14} style={{ display: "inline" }} />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Article grid */}
      <section style={{ padding: "56px 40px 96px", background: "var(--page)", borderTop: "1px solid var(--line)" }}>
        <SectionHead
          num="№ 02"
          eyebrow="LEBIH DARI JURNAL"
          title="Catatan & cerita,"
          italic="terbaru."
        />
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}
          className="grid-3"
        >
          {rest.map((a, i) => (
            <Link
              key={a.slug}
              href={`/jurnal/${a.slug}`}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
              className="article-card"
            >
              <div className="tn-img-zoom" style={{ aspectRatio: "4/5" }}>
                <PlaceImg
                  label={a.title}
                  tint={a.tint}
                  ratio="4/5"
                  style={{ height: "100%" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase"
                }}
              >
                <span>{a.num}</span>
                <span>·</span>
                <span>{a.category}</span>
                <span>·</span>
                <span>{a.read}</span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em"
                }}
              >
                {a.title}{" "}
                {a.italic && <em style={{ fontStyle: "italic" }}>{a.italic}</em>}
              </h3>
              <p className="tn-body-sm" style={{ lineHeight: 1.6 }}>
                {a.excerpt}
              </p>
              <div className="tn-label-mono" style={{ fontSize: 11 }}>
                {a.author.toUpperCase()} · {a.date}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: "96px 40px" }}>
        <div
          className="tn-card"
          style={{
            padding: "56px 40px",
            background: "var(--ink)",
            color: "var(--paper)",
            border: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "center"
          }}
          // eslint-disable-next-line react/no-unknown-property
        >
          <div>
            <div
              className="tn-eyebrow"
              style={{ color: "rgba(245,239,228,0.55)", marginBottom: 14 }}
            >
              EDISI BULANAN · MIN. 2× SEBULAN
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 1.02 }}>
              Cerita pendek,{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>kotak masuk</em>
              .
            </h2>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
