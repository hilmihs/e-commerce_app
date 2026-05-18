import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { formatCurrency, getOrder } from "@/lib/api";
import { Stepper, SumRow, Wordmark } from "@/components/design";

const statusLabel: Record<string, string> = {
  paid: "Pembayaran diterima",
  pending: "Menunggu pembayaran",
  failed: "Pembayaran gagal",
  expired: "Pembayaran kedaluwarsa"
};

const orderStep: Record<string, number> = {
  paid: 4,
  pending: 3,
  failed: 3,
  expired: 3
};

export default async function PaymentStatusPage({
  params
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const order = await getOrder(orderNumber);
  const isPaid = order.payment_status === "paid";
  const isPending = order.payment_status === "pending";
  const step = orderStep[order.payment_status] ?? 3;

  return (
    <>
      <header
        style={{
          borderBottom: "1px solid var(--line)",
          background: "var(--paper)",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap"
        }}
      >
        <Link href="/">
          <Wordmark size={26} />
        </Link>
        <Stepper step={step} steps={["Alamat", "Pengiriman", "Bayar", "Selesai"]} />
        <Link href="/" className="tn-btn-link" style={{ fontSize: 13 }}>
          Beranda
        </Link>
      </header>

      <section style={{ padding: "72px 40px 64px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 64,
            alignItems: "start"
          }}
          className="success-grid"
        >
          <div>
            <div
              style={{
                width: 64,
                height: 64,
                border: "1.5px solid var(--ink)",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 28,
                color: isPaid ? "var(--terracotta)" : "var(--muted)"
              }}
            >
              <Check size={28} strokeWidth={1.6} />
            </div>
            <div className="tn-eyebrow" style={{ marginBottom: 12 }}>
              NOMOR PESANAN · {order.order_number}
            </div>
            <h1 className="tn-display-2" style={{ marginBottom: 24 }}>
              {isPaid ? (
                <>
                  Terima <em style={{ fontStyle: "italic" }}>kasih</em>.
                </>
              ) : (
                <>
                  {statusLabel[order.payment_status] ?? "Pesanan dibuat"}
                  <em style={{ fontStyle: "italic" }}>.</em>
                </>
              )}
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: 520 }}>
              {isPaid &&
                "Pembayaran berhasil. Konfirmasi sudah dikirim ke email kamu. Pembuat sudah mendapat notifikasi dan akan mengemas pesananmu dalam 24 jam."}
              {isPending &&
                "Pesanan dibuat dan menunggu pembayaran melalui Midtrans Snap. Setelah pembayaran selesai, kami akan memproses pengirimanmu."}
              {!isPaid &&
                !isPending &&
                "Pembayaran tidak berhasil diselesaikan. Kamu dapat mencoba ulang atau membuat pesanan baru."}
            </p>

            <div style={{ marginTop: 48 }}>
              <div className="tn-eyebrow" style={{ marginBottom: 16 }}>
                JEJAK PESANAN
              </div>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 0 }}>
                {[
                  { s: "Pesanan dibuat", done: true },
                  { s: "Pembayaran diterima", done: isPaid },
                  { s: "Pengemasan & label kurir", done: false },
                  { s: "Paket diserahkan ke kurir", done: false },
                  { s: "Tiba di alamat tujuan", done: false }
                ].map((t, i, arr) => (
                  <li
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "20px 1fr",
                      gap: 18,
                      padding: "14px 0",
                      position: "relative"
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          background: t.done ? "var(--ink)" : "var(--page)",
                          border: "1.5px solid " + (t.done ? "var(--ink)" : "var(--line)"),
                          display: "block",
                          marginTop: 6,
                          marginLeft: 4
                        }}
                      />
                      {i < arr.length - 1 && (
                        <span
                          style={{
                            position: "absolute",
                            top: 22,
                            left: 9,
                            bottom: -14,
                            width: 1,
                            background: t.done ? "var(--ink)" : "var(--line)"
                          }}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        fontWeight: t.done ? 500 : 400,
                        color: t.done ? "var(--ink)" : "var(--muted)"
                      }}
                    >
                      {t.s}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
              {order.snap_redirect_url && isPending ? (
                <a className="tn-btn" href={order.snap_redirect_url}>
                  Lanjutkan pembayaran <ArrowRight size={14} />
                </a>
              ) : (
                <Link className="tn-btn" href="/">
                  Lanjut belanja <ArrowRight size={14} />
                </Link>
              )}
              <Link className="tn-btn tn-btn-ghost" href="/">
                Beranda
              </Link>
            </div>
          </div>

          <aside className="tn-card" style={{ padding: 28 }}>
            <div className="tn-eyebrow" style={{ marginBottom: 14 }}>
              RINGKASAN
            </div>
            <SumRow k="Status pesanan" v={order.status} muted />
            <SumRow k="Status bayar" v={order.payment_status} muted />
            <hr className="tn-hr" style={{ margin: "12px 0" }} />
            <SumRow k="Subtotal" v={formatCurrency(order.subtotal)} muted />
            <SumRow k="Ongkir" v={formatCurrency(order.shipping_cost)} muted />
            <hr className="tn-hr" style={{ margin: "10px 0" }} />
            <SumRow k="Total" v={formatCurrency(order.total)} strong />
          </aside>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .success-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
