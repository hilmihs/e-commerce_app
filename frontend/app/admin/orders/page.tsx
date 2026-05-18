"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/AdminGuard";
import { adminApi, formatCurrency } from "@/lib/api";
import type { AdminSession, OrderSummary } from "@/types/api";

function OrdersTable({ session }: { session: AdminSession }) {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi.orders(session.token).then(setOrders).catch((caught) => {
      setError(caught instanceof Error ? caught.message : "Order admin gagal dimuat.");
    });
  }, [session.token]);

  async function updateStatus(order: OrderSummary, status: string) {
    const updated = await adminApi.updateOrderStatus(session.token, order.id, status);
    setOrders((current) => current.map((item) => (item.id === updated.id ? updated : item)));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-ink">Orders</h1>
          <p className="text-sm text-muted">Payment status diperbarui oleh webhook Midtrans.</p>
        </div>
        <Link className="rounded border border-line bg-white px-4 py-2 text-sm font-semibold hover:border-brand" href="/admin/products">
          Produk
        </Link>
      </div>
      <div className="overflow-hidden rounded border border-line bg-white">
        {error ? <p className="p-4 text-sm text-warning">{error}</p> : null}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-surface text-muted">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-line">
                  <td className="px-4 py-3 font-medium">{order.order_number}</td>
                  <td className="px-4 py-3">{order.status}</td>
                  <td className="px-4 py-3">{order.payment_status}</td>
                  <td className="px-4 py-3">{formatCurrency(order.total)}</td>
                  <td className="px-4 py-3">
                    <select
                      className="focus-ring rounded border border-line px-2 py-1"
                      value={order.status}
                      onChange={(event) => updateStatus(order, event.target.value)}
                    >
                      <option value="pending_payment">Pending payment</option>
                      <option value="paid">Paid</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  return <AdminGuard>{(session) => <OrdersTable session={session} />}</AdminGuard>;
}
