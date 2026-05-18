"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { adminApi } from "@/lib/api";
import { saveAdminSession } from "@/lib/admin-session";

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
      router.push("/admin/products");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Login gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md px-4 py-12">
      <form className="w-full rounded border border-line bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        <span className="flex h-11 w-11 items-center justify-center rounded bg-surface text-brand">
          <LockKeyhole aria-hidden size={22} />
        </span>
        <h1 className="mt-4 text-2xl font-semibold text-ink">Admin login</h1>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-1 text-sm font-medium">
            Email
            <input
              className="focus-ring rounded border border-line px-3 py-2 font-normal"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="grid gap-1 text-sm font-medium">
            Password
            <input
              className="focus-ring rounded border border-line px-3 py-2 font-normal"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        {error ? <p className="mt-4 rounded border border-warning/30 bg-surface p-3 text-sm text-warning">{error}</p> : null}
        <button className="focus-ring mt-5 w-full rounded bg-ink px-4 py-3 font-semibold text-white hover:bg-brand" disabled={loading}>
          Masuk
        </button>
      </form>
    </div>
  );
}
