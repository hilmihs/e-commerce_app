"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, BarChart3 } from "lucide-react";
import { AdminGuard } from "@/components/AdminGuard";
import { AdminShell } from "@/components/AdminShell";
import { adminApi, formatCurrency } from "@/lib/api";
import type { AdminSession, OrderSummary } from "@/types/api";

const STATUS_COLOR: Record<string, string> = {
  pending_payment: "var(--gold)",
  paid: "var(--gold)",
  processing: "var(--terracotta)",
  shipped: "var(--olive)",
  completed: "var(--success)",
  cancelled: "var(--danger)",
  refunded: "var(--danger)"
};

const STATUS_LABEL: Record<string, string> = {
  pending_payment: "Menunggu bayar",
  paid: "Dibayar",
  processing: "Dikemas",
  shipped: "Dikirim",
  completed: "Selesai",
  cancelled: "Batal",
  refunded: "Refund"
};

const STATUS_OPTIONS = [
  "pending_payment",
  "paid",
  "processing",
  "shipped",
  "completed",
  "cancelled"
];

function todayLabel() {
  const d = new Date();
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function OrdersTable({ session }: { session: AdminSession }) {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .orders(session.token)
      .then(setOrders)
      .catch((caught) => {
        setError(caught instanceof Error ? caught.message : "Order admin gagal dimuat.");
      });
  }, [session.token]);

  async function updateStatus(order: OrderSummary, status: string) {
    const updated = await adminApi.updateOrderStatus(session.token, order.id, status);
    setOrders((current) => current.map((item) => (item.id === updated.id ? updated : item)));
  }

  const kpis = useMemo(() => {
    const total = orders.reduce((s, o) => s + o.total, 0);
    const pending = orders.filter((o) => o.payment_status === "pending").length;
    const paid = orders.filter((o) => o.payment_status === "paid").length;
    const avg = orders.length ? Math.round(total / orders.length) : 0;
    return { total, pending, paid, avg, count: orders.length };
  }, [orders]);

  return (
    <AdminShell
      subtitle={todayLabel()}
      title={
        <>
          Selamat pagi, <em style={{ fontStyle: "italic" }}>{session.user.name.split(" ")[0]}</em>.
        </>
      }
      action={
        <span className="tn-label-mono" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <BarChart3 size={14} /> {kpis.count} PESANAN
        </span>
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

      {/* KPI cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 32
        }}
        className="kpi-grid"
      >
        {[
          { l: "Total nilai", v: formatCurrency(kpis.total), d: `${kpis.count} pesanan` },
          { l: "Pesanan baru", v: String(kpis.pending), d: "menunggu pembayaran", tone: "var(--terracotta)" },
          { l: "Dibayar", v: String(kpis.paid), d: "siap proses", tone: "var(--success)" },
          { l: "Rata-rata", v: formatCurrency(kpis.avg), d: "per pesanan" }
        ].map((k) => (
          <div key={k.l} className="tn-card" style={{ padding: 22 }}>
            <div className="tn-label-mono" style={{ fontSize: 11, marginBottom: 10 }}>
              {k.l.toUpperCase()}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 36,
                lineHeight: 1,
                marginBottom: 10
              }}
            >
              {k.v}
            </div>
            <div className="tn-body-sm" style={{ color: k.tone ?? "var(--muted)" }}>
              {k.d}
            </div>
          </div>
        ))}
      </div>

      {/* table */}
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
            Pesanan <em style={{ fontStyle: "italic" }}>terbaru</em>
          </h3>
          <span className="tn-label-mono">DIPERBARUI OLEH WEBHOOK MIDTRANS</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 860 }}
          >
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
                {["Nomor", "Status", "Bayar", "Total", "Ubah status", ""].map((h, i) => (
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
              {orders.map((o, i) => (
                <tr
                  key={o.id}
                  style={{
                    borderBottom: i < orders.length - 1 ? "1px solid var(--line-soft)" : "none"
                  }}
                >
                  <td style={{ padding: "14px 24px" }}>
                    <span className="tn-price" style={{ fontSize: 12 }}>
                      {o.order_number}
                    </span>
                  </td>
                  <td style={{ padding: "14px 24px" }}>
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
                          background: STATUS_COLOR[o.status] ?? "var(--muted)"
                        }}
                      />
                      {STATUS_LABEL[o.status] ?? o.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 24px", color: "var(--ink-soft)" }}>
                    {o.payment_status}
                  </td>
                  <td style={{ padding: "14px 24px" }}>
                    <span className="tn-price">{formatCurrency(o.total)}</span>
                  </td>
                  <td style={{ padding: "14px 24px" }}>
                    <select
                      className="tn-input"
                      style={{ height: 36, padding: "0 10px" }}
                      value={o.status}
                      onChange={(event) => updateStatus(o, event.target.value)}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {STATUS_LABEL[opt] ?? opt}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: "14px 24px", textAlign: "right" }}>
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="tn-btn-link"
                      style={{ fontSize: 12 }}
                    >
                      Buka <ChevronRight size={12} style={{ display: "inline" }} />
                    </Link>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && !error && (
                <tr>
                  <td colSpan={6} style={{ padding: 32, textAlign: "center", color: "var(--muted)" }}>
                    Belum ada pesanan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .kpi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AdminShell>
  );
}

export default function AdminOrdersPage() {
  return <AdminGuard>{(session) => <OrdersTable session={session} />}</AdminGuard>;
}
