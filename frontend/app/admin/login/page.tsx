"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { adminApi } from "@/lib/api";
import { saveAdminSession } from "@/lib/admin-session";
import { Wordmark } from "@/components/design";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const session = await adminApi.login(email, password);
      saveAdminSession(session);
      router.push("/admin");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Login gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "40px 20px",
        background: "var(--paper)"
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="tn-card"
        style={{ width: "100%", maxWidth: 440, padding: 36 }}
      >
        <Link href="/">
          <Wordmark size={24} />
        </Link>
        <div className="tn-eyebrow" style={{ marginTop: 28, marginBottom: 8 }}>
          № 01 · AKSES
        </div>
        <h1 className="tn-display-4" style={{ marginBottom: 8 }}>
          Masuk sebagai <em style={{ fontStyle: "italic" }}>admin</em>
        </h1>
        <p className="tn-body-sm" style={{ marginBottom: 24 }}>
          Halaman ini terbatas untuk pengelola Toko Nusa.
        </p>

        <div style={{ display: "grid", gap: 16 }}>
          <label style={{ display: "block" }}>
            <div className="tn-eyebrow" style={{ marginBottom: 8 }}>
              Email
            </div>
            <input
              className="tn-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label style={{ display: "block" }}>
            <div className="tn-eyebrow" style={{ marginBottom: 8 }}>
              Password
            </div>
            <input
              className="tn-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        {error && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              border: "1px solid var(--warning)",
              background: "var(--paper-soft)",
              color: "var(--warning)",
              fontSize: 14
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          className="tn-btn tn-btn-lg"
          style={{ width: "100%", marginTop: 20 }}
          disabled={loading}
        >
          {loading ? "Memproses…" : "Masuk"}
        </button>

        <div
          className="tn-body-sm"
          style={{ marginTop: 18, display: "flex", gap: 10, alignItems: "flex-start" }}
        >
          <ShieldCheck size={16} strokeWidth={1.4} style={{ marginTop: 1, color: "var(--ink)" }} />
          <span>
            Token disimpan di localStorage browser. Untuk produksi, gunakan HTTPS dan logout setelah selesai.
          </span>
        </div>
      </form>
    </div>
  );
}
