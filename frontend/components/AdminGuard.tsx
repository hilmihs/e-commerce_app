"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAdminSession } from "@/lib/admin-session";
import type { AdminSession } from "@/types/api";

export function AdminGuard({ children }: { children: (session: AdminSession) => React.ReactNode }) {
  const [session, setSession] = useState<AdminSession | null | undefined>(undefined);

  useEffect(() => {
    setSession(getAdminSession());
  }, []);

  if (session === undefined) {
    return (
      <div style={{ padding: 40, color: "var(--muted)", textAlign: "center" }}>
        Memeriksa sesi admin…
      </div>
    );
  }

  if (!session) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "grid",
          placeItems: "center",
          padding: 40
        }}
      >
        <div className="tn-card" style={{ padding: 32, textAlign: "center", maxWidth: 420 }}>
          <h1 className="tn-display-4" style={{ marginBottom: 12 }}>
            Sesi <em style={{ fontStyle: "italic" }}>admin</em> diperlukan
          </h1>
          <p className="tn-body-sm" style={{ marginBottom: 20 }}>
            Halaman ini terbatas untuk pengelola Toko Nusa.
          </p>
          <Link className="tn-btn" href="/admin/login">
            Masuk
          </Link>
        </div>
      </div>
    );
  }

  return <>{children(session)}</>;
}
