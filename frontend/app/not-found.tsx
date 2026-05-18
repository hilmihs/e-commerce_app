import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section
      style={{
        padding: "120px 40px",
        display: "grid",
        placeItems: "center",
        textAlign: "center"
      }}
    >
      <div style={{ maxWidth: 600 }}>
        <div className="tn-eyebrow" style={{ marginBottom: 16 }}>
          № 404 · TIDAK DITEMUKAN
        </div>
        <h1 className="tn-display-1" style={{ marginBottom: 24, fontSize: "clamp(72px, 12vw, 168px)" }}>
          Empat<br />
          <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>nol</em>
          <br />empat.
        </h1>
        <p
          className="tn-body"
          style={{ maxWidth: 440, marginInline: "auto", marginBottom: 28 }}
        >
          Halaman yang kamu cari sepertinya sudah pindah atau memang tidak pernah ada.
          Coba mulai dari katalog.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="tn-btn" href="/">
            Kembali ke katalog <ArrowRight size={14} />
          </Link>
          <Link className="tn-btn tn-btn-ghost" href="/jurnal">
            Baca jurnal
          </Link>
        </div>
      </div>
    </section>
  );
}
