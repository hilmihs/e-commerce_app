"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ChevronDown } from "lucide-react";
import { checkout, formatCurrency, quoteShipping } from "@/lib/api";
import { useCart } from "@/lib/cart";
import type { ShippingQuote } from "@/types/api";
import { PlaceImg, Stepper, SumRow, Wordmark, pickTint } from "@/components/design";

type FormState = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  line1: string;
  line2: string;
  city: string;
  province: string;
  postal_code: string;
  destination_city_id: string;
  courier: string;
};

const COURIER_OPTIONS = [
  { value: "jne", label: "JNE" },
  { value: "pos", label: "POS Indonesia" },
  { value: "tiki", label: "TIKI" }
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [quotes, setQuotes] = useState<ShippingQuote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<ShippingQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
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

  const totalWeight = useMemo(
    () => items.reduce((s, i) => s + (i.product.weight_grams ?? 0) * i.quantity, 0),
    [items]
  );
  const total = useMemo(() => subtotal + (selectedQuote?.cost ?? 0), [selectedQuote, subtotal]);
  const itemPayload = items.map((item) => ({ product_id: item.product.id, quantity: item.quantity }));

  const currentStep = selectedQuote ? 3 : quotes.length > 0 ? 2 : 1;

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

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <>
      <header
        style={{
          borderBottom: "1px solid var(--line)",
          background: "var(--paper)",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap"
        }}
      >
        <Link href="/">
          <Wordmark size={26} />
        </Link>
        <Stepper step={currentStep} steps={["Alamat", "Pengiriman", "Bayar"]} />
        <span className="tn-label-mono" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <ShieldCheck size={14} /> CHECKOUT AMAN
        </span>
      </header>

      <section style={{ padding: "40px 40px 80px" }}>
        {items.length === 0 ? (
          <div
            className="tn-card"
            style={{ padding: 40, textAlign: "center", color: "var(--muted)", maxWidth: 600, margin: "0 auto" }}
          >
            Cart kosong. Pilih produk dulu dari{" "}
            <Link className="tn-btn-link" href="/">
              katalog
            </Link>
            .
          </div>
        ) : (
          <form
            onSubmit={handleCheckout}
            style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 56 }}
            className="checkout-grid"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {/* CONTACT */}
              <Block num="№ 01" title="Kontak" italic="& pembeli">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-grid">
                  <Field label="Nama lengkap" value={form.customer_name} onChange={(v) => set("customer_name", v)} required />
                  <Field label="No. telepon" value={form.customer_phone} onChange={(v) => set("customer_phone", v)} required />
                  <Field label="Email" value={form.customer_email} onChange={(v) => set("customer_email", v)} required full type="email" />
                </div>
              </Block>

              {/* ADDRESS */}
              <Block num="№ 02" title="Alamat" italic="pengiriman">
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12 }} className="form-grid">
                  <Field label="Alamat (jalan, no., RT/RW)" value={form.line1} onChange={(v) => set("line1", v)} required full />
                  <Field label="Patokan / unit (opsional)" value={form.line2} onChange={(v) => set("line2", v)} />
                  <Field label="Kode pos" value={form.postal_code} onChange={(v) => set("postal_code", v)} required />
                  <Field label="Kota / kabupaten" value={form.city} onChange={(v) => set("city", v)} required />
                  <Field label="Provinsi" value={form.province} onChange={(v) => set("province", v)} required />
                  <Field
                    label="RajaOngkir city ID"
                    value={form.destination_city_id}
                    onChange={(v) => set("destination_city_id", v)}
                    required
                  />
                </div>
              </Block>

              {/* SHIPPING */}
              <Block
                num="№ 03"
                title="Metode"
                italic="pengiriman"
                hint={`Dihitung via RajaOngkir · berat ${new Intl.NumberFormat("id-ID").format(totalWeight)} g`}
              >
                <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                  {COURIER_OPTIONS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      className={form.courier === c.value ? "tn-chip tn-chip-active" : "tn-chip"}
                      onClick={() => set("courier", c.value)}
                    >
                      {c.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="tn-btn tn-btn-ghost tn-btn-sm"
                    style={{ marginLeft: "auto" }}
                    onClick={handleQuote}
                    disabled={loading || !form.destination_city_id}
                  >
                    Hitung ongkir
                  </button>
                </div>

                {quotes.length > 0 && (
                  <div style={{ border: "1px solid var(--line)", borderRadius: 4, overflow: "hidden" }}>
                    {quotes.map((o, i) => {
                      const sel = selectedQuote?.service === o.service && selectedQuote?.courier === o.courier;
                      return (
                        <label
                          key={`${o.courier}-${o.service}-${i}`}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "24px 1fr auto",
                            gap: 16,
                            padding: "16px 18px",
                            alignItems: "center",
                            borderTop: i ? "1px solid var(--line)" : "none",
                            background: sel ? "var(--paper-soft)" : "var(--page)",
                            cursor: "pointer"
                          }}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            checked={!!sel}
                            onChange={() => setSelectedQuote(o)}
                            style={{ accentColor: "var(--ink)" }}
                          />
                          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                            <span style={{ fontWeight: 500, minWidth: 88 }}>{o.courier.toUpperCase()}</span>
                            <span className="tn-label-mono">{o.service}</span>
                            <span className="tn-body-sm">· tiba {o.etd ?? "—"} {o.etd && "hari"}</span>
                          </div>
                          <span className="tn-price" style={{ fontSize: 15 }}>
                            {formatCurrency(o.cost)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </Block>

              {/* PAYMENT */}
              <Block num="№ 04" title="Bayar" italic="dengan" hint="Diproses Midtrans Snap">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }} className="pay-grid">
                  {[
                    { n: "QRIS", d: "Semua e-wallet & m-banking" },
                    { n: "Virtual Account", d: "BCA, Mandiri, BNI, BRI" },
                    { n: "Kartu Kredit", d: "Visa, Mastercard, JCB" },
                    { n: "E-Wallet", d: "GoPay, OVO, ShopeePay, DANA" }
                  ].map((m, i) => (
                    <div
                      key={m.n}
                      style={{
                        padding: "18px 16px",
                        border: "1px solid " + (i === 0 ? "var(--ink)" : "var(--line)"),
                        background: i === 0 ? "var(--paper-soft)" : "var(--page)",
                        borderRadius: 4
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 24,
                          marginBottom: 12,
                          background: "var(--ink)",
                          color: "var(--paper)",
                          fontFamily: "var(--font-mono)",
                          fontSize: 9,
                          letterSpacing: "0.1em",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 2
                        }}
                      >
                        {m.n.split(" ")[0].slice(0, 4).toUpperCase()}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{m.n}</div>
                      <div className="tn-body-sm" style={{ marginTop: 2 }}>
                        {m.d}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="tn-body-sm" style={{ marginTop: 14 }}>
                  Pemilihan metode akan ditawarkan pada halaman Midtrans Snap setelah pesanan dibuat.
                </p>
              </Block>

              {error && (
                <div
                  style={{
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
            </div>

            {/* summary */}
            <aside style={{ position: "sticky", top: 24, alignSelf: "start" }}>
              <div className="tn-card" style={{ padding: 24 }}>
                <h3 className="tn-display-5" style={{ marginBottom: 16 }}>
                  <em style={{ fontStyle: "italic" }}>Pesanan</em> anda
                </h3>
                {items.map(({ product, quantity }) => {
                  const image = product.images[0]?.url;
                  const tint = pickTint(product.id);
                  return (
                    <div
                      key={product.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "56px 1fr auto",
                        gap: 14,
                        padding: "12px 0",
                        borderBottom: "1px solid var(--line-soft)"
                      }}
                    >
                      <div style={{ width: 56, height: 56, position: "relative", background: "var(--paper-soft)" }}>
                        {image ? (
                          <Image src={image} alt={product.name} fill style={{ objectFit: "cover" }} />
                        ) : (
                          <PlaceImg tint={tint} ratio="1/1" style={{ height: "100%" }} />
                        )}
                        <span
                          style={{
                            position: "absolute",
                            top: -6,
                            right: -6,
                            width: 20,
                            height: 20,
                            borderRadius: 999,
                            background: "var(--ink)",
                            color: "var(--paper)",
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          {quantity}
                        </span>
                      </div>
                      <div>
                        <div className="tn-label-mono" style={{ fontSize: 10 }}>
                          TOKO NUSA
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-display)",
                            fontStyle: "italic",
                            fontSize: 16,
                            lineHeight: 1.15
                          }}
                        >
                          {product.name}
                        </div>
                      </div>
                      <span className="tn-price" style={{ fontSize: 13, alignSelf: "center" }}>
                        {formatCurrency(product.price * quantity)}
                      </span>
                    </div>
                  );
                })}
                <div style={{ marginTop: 16 }}>
                  <SumRow k="Subtotal" v={formatCurrency(subtotal)} />
                  <SumRow
                    k={`Ongkir${selectedQuote ? ` · ${selectedQuote.courier.toUpperCase()} ${selectedQuote.service}` : ""}`}
                    v={selectedQuote ? formatCurrency(selectedQuote.cost) : "—"}
                    muted
                  />
                  <SumRow k="PPN sudah termasuk" v="—" muted />
                  <hr className="tn-hr" style={{ margin: "12px 0" }} />
                  <SumRow k="Total" v={formatCurrency(total)} strong />
                </div>
                <button
                  type="submit"
                  className="tn-btn tn-btn-lg"
                  style={{ width: "100%", marginTop: 18 }}
                  disabled={loading || !selectedQuote}
                >
                  {loading ? "Memproses…" : `Bayar sekarang · ${formatCurrency(total)}`}
                </button>
                <p className="tn-body-sm" style={{ marginTop: 14, textAlign: "center" }}>
                  Dengan menekan tombol di atas anda setuju dengan{" "}
                  <a className="tn-btn-link" href="#">
                    Ketentuan
                  </a>
                  .
                </p>
              </div>
            </aside>
          </form>
        )}
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
          .pay-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr !important; }
          .pay-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function Block({
  num,
  title,
  italic,
  hint,
  children
}: {
  num: string;
  title: string;
  italic?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          marginBottom: 18,
          flexWrap: "wrap"
        }}
      >
        <span className="tn-num">{num}</span>
        <h2 className="tn-display-5">
          {title}
          {italic && (
            <>
              {" "}
              <em style={{ fontStyle: "italic" }}>{italic}</em>
            </>
          )}
        </h2>
        {hint && (
          <span style={{ marginLeft: "auto" }} className="tn-body-sm">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  full,
  required,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  full?: boolean;
  required?: boolean;
  type?: string;
}) {
  return (
    <label style={{ display: "block", gridColumn: full ? "1 / -1" : "auto" }}>
      <div className="tn-eyebrow" style={{ marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ position: "relative" }}>
        <input
          className="tn-input"
          type={type}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </label>
  );
}
