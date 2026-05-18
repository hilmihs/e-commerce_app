import { PackageSearch } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Produk belum bisa dimuat.";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Katalog pilihan</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-normal text-ink sm:text-5xl">
            Produk siap kirim dengan checkout cepat.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Pilih produk, hitung ongkir, lalu bayar lewat Midtrans Snap. Cart tersimpan di browser untuk pembeli tamu.
          </p>
        </div>
        <div className="rounded border border-line bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded bg-surface text-brand">
              <PackageSearch aria-hidden size={20} />
            </span>
            <div>
              <p className="font-semibold">MVP production path</p>
              <p className="text-sm text-muted">Next.js, Laravel API, PostgreSQL, R2 images.</p>
            </div>
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded border border-warning/30 bg-white p-4 text-sm text-warning">{error}</div>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </div>
  );
}
