"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <section
      style={{
        padding: "120px 40px",
        display: "grid",
        placeItems: "center",
        textAlign: "center"
      }}
    >
      <div style={{ maxWidth: 520 }}>
        <div className="tn-eyebrow" style={{ marginBottom: 16 }}>
          № 500 · GANGGUAN SEMENTARA
        </div>
        <h1 className="tn-display-2" style={{ marginBottom: 18 }}>
          Ada yang <em style={{ fontStyle: "italic" }}>tersendat</em>.
        </h1>
        <p
          className="tn-body"
          style={{ maxWidth: 440, marginInline: "auto", marginBottom: 28 }}
        >
          Kami tidak bisa memuat halaman ini sekarang. Coba ulang atau kembali ke katalog dulu.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          <button className="tn-btn" onClick={reset}>
            Coba ulang
          </button>
          <Link className="tn-btn tn-btn-ghost" href="/">
            Ke katalog
          </Link>
        </div>
        {error.digest && (
          <div className="tn-label-mono" style={{ marginTop: 24, fontSize: 11 }}>
            ID · {error.digest}
          </div>
        )}
      </div>
    </section>
  );
}
