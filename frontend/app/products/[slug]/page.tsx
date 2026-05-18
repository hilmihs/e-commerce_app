import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatCurrency, getProduct } from "@/lib/api";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const product = await getProduct(slug);
    const image = product.images[0]?.url ?? "/placeholder-product.svg";

    return (
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded border border-line bg-white">
          <Image src={image} alt={product.images[0]?.alt_text ?? product.name} fill className="object-cover" priority />
        </div>
        <section className="space-y-6">
          <div>
            <p className="text-sm font-medium text-accent">Stok {product.stock}</p>
            <h1 className="mt-2 text-4xl font-semibold text-ink">{product.name}</h1>
            <p className="mt-3 text-2xl font-semibold">{formatCurrency(product.price)}</p>
          </div>
          <p className="leading-7 text-muted">{product.description}</p>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded border border-line bg-white p-3">
              <dt className="text-muted">Berat</dt>
              <dd className="font-semibold">{product.weight_grams} gram</dd>
            </div>
            <div className="rounded border border-line bg-white p-3">
              <dt className="text-muted">Status</dt>
              <dd className="font-semibold">{product.is_active ? "Aktif" : "Tidak aktif"}</dd>
            </div>
          </dl>
          <AddToCartButton product={product} />
        </section>
      </div>
    );
  } catch {
    notFound();
  }
}
