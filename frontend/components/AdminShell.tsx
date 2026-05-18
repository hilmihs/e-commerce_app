"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Package, ShoppingBag, Users, Sparkles, Truck, Banknote, ShieldCheck } from "lucide-react";
import { clearAdminSession, getAdminSession } from "@/lib/admin-session";
import type { AdminSession } from "@/types/api";
import { Wordmark } from "@/components/design";

const NAV_OPERATIONS = [
  { href: "/admin", label: "Dashboard", Icon: BarChart3 },
  { href: "/admin/orders", label: "Pesanan", Icon: Package },
  { href: "/admin/products", label: "Produk", Icon: ShoppingBag }
];

const NAV_PLACEHOLDERS = [
  { label: "Pembuat", Icon: Users },
  { label: "Promo", Icon: Sparkles },
  { label: "Pengiriman", Icon: Truck },
  { label: "Pembayaran", Icon: Banknote },
  { label: "Pengaturan", Icon: ShieldCheck }
];

export function AdminShell({
  title,
  subtitle,
  action,
  children
}: {
  title: React.ReactNode;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<AdminSession | null>(null);

  useEffect(() => {
    setSession(getAdminSession());
  }, []);

  const name = session?.user.name ?? "Admin";
  const role = session?.user.role ?? "ADMIN";
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  function logout() {
    clearAdminSession();
    router.push("/admin/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--page)",
        display: "grid",
        gridTemplateColumns: "240px 1fr"
      }}
      className="admin-shell"
    >
      <aside
        style={{
          borderRight: "1px solid var(--line)",
          padding: "24px 20px",
          background: "var(--paper)",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto"
        }}
        className="admin-sidebar"
      >
        <Link href="/admin">
          <Wordmark size={20} />
        </Link>
        <div className="tn-eyebrow" style={{ marginTop: 28, marginBottom: 10 }}>
          OPERASI
        </div>
        <nav style={{ display: "grid", gap: 2 }}>
          {NAV_OPERATIONS.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding: "8px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  borderRadius: 4,
                  fontSize: 13,
                  background: active ? "var(--ink)" : "transparent",
                  color: active ? "var(--paper)" : "var(--ink-soft)"
                }}
              >
                <Icon size={15} /> <span style={{ flex: 1 }}>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="tn-eyebrow" style={{ marginTop: 28, marginBottom: 10 }}>
          KELOLA
        </div>
        <nav style={{ display: "grid", gap: 2 }}>
          {NAV_PLACEHOLDERS.map(({ label, Icon }) => (
            <span
              key={label}
              style={{
                padding: "8px 10px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 13,
                color: "var(--muted-2)",
                borderRadius: 4,
                cursor: "default"
              }}
            >
              <Icon size={15} /> {label}
            </span>
          ))}
        </nav>
        <div
          style={{
            marginTop: 32,
            padding: 14,
            border: "1px solid var(--line)",
            borderRadius: 4,
            background: "var(--paper-soft)"
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                background: "var(--ink)",
                color: "var(--paper)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 500
              }}
            >
              {initials}
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
              <div className="tn-label-mono" style={{ fontSize: 10 }}>
                {role.toUpperCase()}
              </div>
            </div>
          </div>
          <button onClick={logout} className="tn-btn-link" style={{ fontSize: 12 }}>
            Keluar
          </button>
        </div>
      </aside>

      <div style={{ padding: "28px 36px 56px" }}>
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
            {subtitle && (
              <div className="tn-label-mono" style={{ fontSize: 11 }}>
                {subtitle.toUpperCase()}
              </div>
            )}
            <h1 className="tn-display-3" style={{ marginTop: 4 }}>
              {title}
            </h1>
          </div>
          {action}
        </div>
        {children}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-shell { grid-template-columns: 1fr !important; }
          .admin-sidebar { position: static !important; height: auto !important; }
        }
      `}</style>
    </div>
  );
}
