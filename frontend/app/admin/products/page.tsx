"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PackagePlus } from "lucide-react";
import { AdminGuard } from "@/components/AdminGuard";
import { adminApi, formatCurrency } from "@/lib/api";
import type { AdminSession, Product } from "@/types/api";

function ProductsTable({ session }: { session: AdminSession }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi.products(session.token).then(setProducts).catch((caught) => {
      setError(caught instanceof Error ? caught.message : "Produk admin gagal dimuat.");
    });
  }, [session.token]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-ink">Produk</h1>
          <p className="text-sm text-muted">CRUD endpoint tersedia di Laravel API.</p>
        </div>
        <Link className="rounded border border-line bg-white px-4 py-2 text-sm font-semibold hover:border-brand" href="/admin/orders">
          Orders
        </Link>
      </div>
      <div className="overflow-hidden rounded border border-line bg-white">
        <div className="flex items-center gap-3 border-b border-line p-4">
          <PackagePlus aria-hidden size={20} className="text-brand" />
          <p className="font-semibold">Product inventory</p>
        </div>
        {error ? <p className="p-4 text-sm text-warning">{error}</p> : null}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-surface text-muted">
              <tr>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Stok</th>
                <th className="px-4 py-3">Berat</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-line">
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3">{formatCurrency(product.price)}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">{product.weight_grams}g</td>
                  <td className="px-4 py-3">{product.is_active ? "Aktif" : "Draft"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  return <AdminGuard>{(session) => <ProductsTable session={session} />}</AdminGuard>;
}
