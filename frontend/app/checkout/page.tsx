"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { checkout, formatCurrency, quoteShipping } from "@/lib/api";
import { useCart } from "@/lib/cart";
import type { ShippingQuote } from "@/types/api";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [quotes, setQuotes] = useState<ShippingQuote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<ShippingQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    line1: "",
    line2: "",
    city: "",
    province: "",
    postal_code: "",
    destination_city_id: "",
    courier: "jne"
  });

  const total = useMemo(() => subtotal + (selectedQuote?.cost ?? 0), [selectedQuote, subtotal]);
  const itemPayload = items.map((item) => ({ product_id: item.product.id, quantity: item.quantity }));

  async function handleQuote() {
    setLoading(true);
    setError(null);
    try {
      const data = await quoteShipping({
        destination_city_id: form.destination_city_id,
        courier: form.courier,
        items: itemPayload
      });
      setQuotes(data);
      setSelectedQuote(data[0] ?? null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Gagal menghitung ongkir.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedQuote) {
      setError("Pilih ongkir terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const order = await checkout({
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,
        shipping_address: {
          line1: form.line1,
          line2: form.line2,
          city: form.city,
          province: form.province,
          postal_code: form.postal_code,
          destination_city_id: form.destination_city_id
        },
        shipping_quote: selectedQuote,
        items: itemPayload
      });
      clearCart();
      if (order.snap_redirect_url) {
        window.location.href = order.snap_redirect_url;
      } else {
        router.push(`/payment/${order.order_number}`);
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Checkout gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-ink">Checkout</h1>
      {items.length === 0 ? (
        <div className="mt-6 rounded border border-line bg-white p-8 text-muted">Cart kosong.</div>
      ) : (
        <form className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]" onSubmit={handleCheckout}>
          <section className="grid gap-4 rounded border border-line bg-white p-5">
            {[
              ["customer_name", "Nama"],
              ["customer_email", "Email"],
              ["customer_phone", "Telepon"],
              ["line1", "Alamat"],
              ["line2", "Alamat tambahan"],
              ["city", "Kota"],
              ["province", "Provinsi"],
              ["postal_code", "Kode pos"],
              ["destination_city_id", "RajaOngkir city ID"]
            ].map(([key, label]) => (
              <label key={key} className="grid gap-1 text-sm font-medium">
                {label}
                <input
                  className="focus-ring rounded border border-line px-3 py-2 font-normal"
                  required={!["line2"].includes(key)}
                  value={form[key as keyof typeof form]}
                  onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                />
              </label>
            ))}
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <label className="grid gap-1 text-sm font-medium">
                Kurir
                <select
                  className="focus-ring rounded border border-line px-3 py-2 font-normal"
                  value={form.courier}
                  onChange={(event) => setForm((current) => ({ ...current, courier: event.target.value }))}
                >
                  <option value="jne">JNE</option>
                  <option value="pos">POS</option>
                  <option value="tiki">TIKI</option>
                </select>
              </label>
              <button
                type="button"
                className="focus-ring self-end rounded border border-line bg-white px-4 py-2 font-semibold hover:border-brand"
                onClick={handleQuote}
                disabled={loading}
              >
                Hitung ongkir
              </button>
            </div>
            {quotes.length > 0 ? (
              <div className="grid gap-2">
                {quotes.map((quote) => (
                  <label key={`${quote.courier}-${quote.service}`} className="flex cursor-pointer items-center gap-3 rounded border border-line p-3">
                    <input
                      type="radio"
                      name="shipping_quote"
                      checked={selectedQuote?.service === quote.service}
                      onChange={() => setSelectedQuote(quote)}
                    />
                    <span className="flex-1">
                      <span className="block font-semibold">{quote.courier.toUpperCase()} {quote.service}</span>
                      <span className="text-sm text-muted">{quote.description} {quote.etd ? `- ${quote.etd} hari` : ""}</span>
                    </span>
                    <span className="font-semibold">{formatCurrency(quote.cost)}</span>
                  </label>
                ))}
              </div>
            ) : null}
            {error ? <p className="rounded border border-warning/30 bg-surface p-3 text-sm text-warning">{error}</p> : null}
          </section>
          <aside className="h-fit rounded border border-line bg-white p-5 shadow-sm">
            <h2 className="font-semibold">Ringkasan</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between"><span>Ongkir</span><span>{formatCurrency(selectedQuote?.cost ?? 0)}</span></div>
              <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
                <span>Total</span><span>{formatCurrency(total)}</span>
              </div>
            </div>
            <button
              className="focus-ring mt-5 w-full rounded bg-ink px-4 py-3 font-semibold text-white hover:bg-brand disabled:cursor-not-allowed disabled:bg-line"
              disabled={loading || !selectedQuote}
            >
              Buat pesanan
            </button>
          </aside>
        </form>
      )}
    </div>
  );
}
