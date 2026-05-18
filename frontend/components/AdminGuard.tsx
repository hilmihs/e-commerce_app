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
    return <div className="mx-auto max-w-6xl px-4 py-8 text-muted">Memeriksa sesi admin...</div>;
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        <div className="rounded border border-line bg-white p-6 text-center">
          <h1 className="text-xl font-semibold">Admin session diperlukan</h1>
          <Link className="mt-4 inline-block rounded bg-ink px-4 py-2 font-semibold text-white" href="/admin/login">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return <>{children(session)}</>;
}
