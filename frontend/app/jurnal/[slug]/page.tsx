import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PlaceImg } from "@/components/design";
import type { Tint } from "@/components/design";

type Article = {
  slug: string;
  num: string;
  category: string;
  title: string;
  italic?: string;
  excerpt: string;
  body: string[];
  author: string;
  read: string;
  date: string;
  tint: Tint;
};

const ARTICLES: Record<string, Article> = {
  "studio-waingapu": {
    slug: "studio-waingapu",
    num: "№ 01",
    category: "PORTRAIT",
    title: "Empat puluh hari di",
    italic: "Studio Waingapu",
    excerpt:
      "Bagaimana Ratna Hidayah dan tujuh ibu di Sumba Timur mempertahankan tenun ikat dengan pewarna mengkudu, sembari menolak permintaan ekspor massal yang akan membunuh kerajinannya sendiri.",
    body: [
      "Rumah Ratna terletak setengah kilometer dari jalan utama Waingapu. Atapnya seng, dindingnya papan, dan di teras ada tujuh ATBM tua yang berderit pelan setiap kali ditiup angin laut.",
      "Setiap helai tenun ikat — yang anda lihat di etalase Toko Nusa — adalah hasil empat puluh hari pekerjaan. Pertama, ratusan benang katun pintal tangan diikat dengan teknik “patola” untuk menahan bagian yang tidak akan dicelup. Lalu pewarnaan: mengkudu, indigo, dan kunyit. Tiga lapis. Tiap lapis butuh tiga hari kering.",
      "Yang sering tidak diceritakan adalah bagian mental: butuh kesabaran luar biasa untuk tidak menerima permintaan dari pembeli grosir yang mau bayar dua puluh persen lebih murah asal kuantitas dua ratus pcs sebulan. Ratna selalu menolak. “Kalau saya iyakan,” katanya, “tahun depan tidak ada lagi yang bisa menenun.”",
      "Toko Nusa membeli langsung dari Studio Waingapu dengan harga yang disepakati di awal musim. Tidak ada potongan, tidak ada konsinyasi. Yang sampai ke kamu adalah harga akhir — sebagian besar tetap di Sumba."
    ],
    author: "Tim Toko Nusa",
    read: "8 menit",
    date: "12 Mei 2026",
    tint: 3
  },
  "kopi-gayo": {
    slug: "kopi-gayo",
    num: "№ 02",
    category: "PANGAN",
    title: "Gayo, kopi yang",
    italic: "berjalan lambat",
    excerpt:
      "Tentang kebun kopi keluarga di Aceh Tengah, proses natural yang butuh sabar, dan kenapa biji yang ‘bersih’ kadang justru kehilangan nyawa.",
    body: [
      "Di Bener Meriah, kopi tidak dipanen — ia dipetik. Buah satu per satu. Cherry yang merah tua, sisanya ditinggal sampai matang.",
      "Roastery Tanoh memilih proses natural: cherry dikeringkan utuh di atas raised bed selama 18–22 hari. Hasilnya kompleks: ada nada anggur, sedikit tropis, aftertaste yang berputar di langit-langit.",
      "Proses ini repot. Lebih lambat dari washed. Risiko jamur tinggi kalau cuaca tidak konsisten. Tapi karakter biji jadi lebih hidup — dan itu yang ingin dipertahankan."
    ],
    author: "Roastery Tanoh",
    read: "5 menit",
    date: "08 Mei 2026",
    tint: "dark"
  },
  "rotan-yang-belajar": {
    slug: "rotan-yang-belajar",
    num: "№ 03",
    category: "MATERIAL",
    title: "Rotan yang",
    italic: "belajar bengkok",
    excerpt:
      "Catatan dari Kayuh Studio: mengapa membuat lampu dari rotan adalah proses negosiasi panjang antara tangan, uap, dan kesabaran.",
    body: [
      "Rotan adalah salah satu material paling kuat di dunia per gram. Tapi ia keras kepala. Untuk membentuk, kamu harus mengukus, bukan memaksa.",
      "Setiap lampu di seri ‘Tertulis’ butuh 36 strip rotan. Strip-strip itu disusun di cetakan baja, satu per satu, diiringi uap dari panci yang mendidih di sebelahnya. Tangan harus cepat — dingin sedikit, rotan kembali kaku.",
      "Hasil akhirnya: garis-garis cahaya melengkung yang seperti tulisan tangan. Tidak pernah benar-benar sama dua-duanya."
    ],
    author: "Kayuh Studio",
    read: "6 menit",
    date: "02 Mei 2026",
    tint: 5
  },
  "ekonomi-kriya": {
    slug: "ekonomi-kriya",
    num: "№ 04",
    category: "ESAI",
    title: "Adil itu",
    italic: "berapa rupiah?",
    excerpt:
      "Diskusi terbuka soal margin pembuat, harga eceran, dan kenapa Toko Nusa tidak pernah menawarkan diskon besar pada barang kerajinan.",
    body: [
      "Kalau kamu pernah lihat tenun ikat dijual Rp 350.000 di pasar oleh-oleh, tahukah berapa yang sampai ke penenunnya? Rata-rata Rp 90.000. Sisanya margin perantara, biaya logistik, dan pajak.",
      "Toko Nusa beroperasi dengan model langsung: tidak ada perantara di tengah. Margin kami tipis (rata-rata 32%), tapi cukup untuk operasi, kemasan, dan tim kecil di Jakarta.",
      "Karena itu kami jarang diskon. Bukan karena pelit — tapi karena harga itu sudah mencerminkan apa yang adil untuk pembuatnya."
    ],
    author: "Tim Toko Nusa",
    read: "10 menit",
    date: "28 April 2026",
    tint: 1
  },
  "kemasan-ulang": {
    slug: "kemasan-ulang",
    num: "№ 05",
    category: "OPERASI",
    title: "Kemasan yang",
    italic: "tahu malu",
    excerpt:
      "Kenapa kami pakai karton daur ulang dan kertas serat, dan ekonomi dibalik keputusan kecil itu.",
    body: [
      "Karton kraft daur ulang harganya 18% lebih mahal dari karton baru. Pita rami harganya tiga kali lipat plester plastik. Tapi mereka tidak hidup 500 tahun di tempat pembuangan.",
      "Toko Nusa memilih kompromi yang masuk akal: kemasan luar daur ulang penuh, isian kertas serat (bukan styrofoam), label tanpa laminasi. Pembuat juga dikirimkan stok kemasan ini gratis — jadi standar tetap konsisten."
    ],
    author: "Tim Toko Nusa",
    read: "4 menit",
    date: "21 April 2026",
    tint: 4
  },
  "tongkonan-weave": {
    slug: "tongkonan-weave",
    num: "№ 06",
    category: "PORTRAIT",
    title: "Tongkonan, dan",
    italic: "tenun yang tinggal",
    excerpt:
      "Perjalanan ke Toraja menemui Ibu Bertha — penenun selendang yang belajar dari neneknya dan menolak benang pabrik.",
    body: [
      "Bertha menenun di kolong rumah Tongkonan miliknya. Cahaya masuk dari sela papan, lantai tanah dingin, dan suara ATBM-nya berdengung seperti serangga.",
      "Yang dia tenun adalah selendang — bukan untuk dijual ke turis, tapi sebagai bagian dari upacara. Hingga akhirnya, anak gadisnya pergi ke Makassar untuk kuliah dan ‘kebetulan’ ada teman yang menanyakan harga.",
      "Sekarang Bertha menenun untuk dua hal: keluarga, dan satu pesanan kecil tiap bulan untuk Toko Nusa. Tidak lebih. Karena, katanya, “Kalau saya tenun cepat-cepat, motifnya marah.”"
    ],
    author: "Tim Toko Nusa",
    read: "7 menit",
    date: "14 April 2026",
    tint: 2
  }
};

export async function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export default async function JurnalArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  return (
    <article style={{ padding: "48px 40px 96px" }}>
      <div style={{ maxWidth: 760, marginInline: "auto" }}>
        <Link href="/jurnal" className="tn-btn-link" style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>
          <ArrowLeft size={14} /> Kembali ke jurnal
        </Link>
        <div className="tn-eyebrow" style={{ marginBottom: 14 }}>
          {article.num} · {article.category}
        </div>
        <h1 className="tn-display-2" style={{ marginBottom: 24 }}>
          {article.title}{" "}
          {article.italic && <em style={{ fontStyle: "italic" }}>{article.italic}</em>}
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--muted)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 40
          }}
        >
          <span>{article.author}</span>
          <span>·</span>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.read} baca</span>
        </div>
      </div>

      <div style={{ maxWidth: 980, marginInline: "auto", marginBottom: 48 }}>
        <PlaceImg label={article.title} tint={article.tint} ratio="16/9" />
      </div>

      <div style={{ maxWidth: 680, marginInline: "auto" }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            lineHeight: 1.3,
            color: "var(--ink)",
            marginBottom: 36,
            fontStyle: "italic"
          }}
        >
          {article.excerpt}
        </p>
        {article.body.map((paragraph, i) => (
          <p
            key={i}
            style={{
              fontSize: 17,
              lineHeight: 1.75,
              color: "var(--ink-soft)",
              marginBottom: 22
            }}
          >
            {paragraph}
          </p>
        ))}

        <hr className="tn-hr" style={{ margin: "48px 0 24px" }} />
        <div className="tn-label-mono" style={{ fontSize: 11, marginBottom: 16 }}>
          BACA JUGA
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }} className="related-grid">
          {Object.values(ARTICLES)
            .filter((a) => a.slug !== article.slug)
            .slice(0, 2)
            .map((a) => (
              <Link
                key={a.slug}
                href={`/jurnal/${a.slug}`}
                className="tn-card"
                style={{ padding: 18, display: "flex", flexDirection: "column", gap: 8 }}
              >
                <span className="tn-label-mono" style={{ fontSize: 11 }}>
                  {a.category}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontStyle: "italic",
                    lineHeight: 1.15
                  }}
                >
                  {a.title}
                </span>
                <span className="tn-body-sm">{a.read} baca</span>
              </Link>
            ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </article>
  );
}
