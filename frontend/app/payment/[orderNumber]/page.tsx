import Link from "next/link";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { formatCurrency, getOrder } from "@/lib/api";

const statusIcon = {
  paid: CheckCircle2,
  pending: Clock3,
  failed: XCircle,
  expired: XCircle
};

export default async function PaymentStatusPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params;
  const order = await getOrder(orderNumber);
  const Icon = statusIcon[order.payment_status as keyof typeof statusIcon] ?? Clock3;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded border border-line bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded bg-surface text-brand">
            <Icon aria-hidden size={24} />
          </span>
          <div>
            <p className="text-sm font-medium text-muted">Order {order.order_number}</p>
            <h1 className="mt-1 text-3xl font-semibold text-ink">Status pembayaran: {order.payment_status}</h1>
          </div>
        </div>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded border border-line p-3">
            <dt className="text-sm text-muted">Order</dt>
            <dd className="font-semibold">{order.status}</dd>
          </div>
          <div className="rounded border border-line p-3">
            <dt className="text-sm text-muted">Ongkir</dt>
            <dd className="font-semibold">{formatCurrency(order.shipping_cost)}</dd>
          </div>
          <div className="rounded border border-line p-3">
            <dt className="text-sm text-muted">Total</dt>
            <dd className="font-semibold">{formatCurrency(order.total)}</dd>
          </div>
        </dl>
        {order.snap_redirect_url && order.payment_status === "pending" ? (
          <Link className="focus-ring mt-6 inline-block rounded bg-ink px-5 py-3 font-semibold text-white hover:bg-brand" href={order.snap_redirect_url}>
            Lanjutkan pembayaran
          </Link>
        ) : (
          <Link className="focus-ring mt-6 inline-block rounded border border-line px-5 py-3 font-semibold hover:border-brand" href="/">
            Kembali ke katalog
          </Link>
        )}
      </section>
    </div>
  );
}
