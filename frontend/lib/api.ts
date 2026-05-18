import type { CheckoutPayload, OrderSummary, Product, ShippingQuote } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

type ApiOptions = RequestInit & {
  token?: string | null;
};

async function request<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    cache: options.method && options.method !== "GET" ? "no-store" : options.cache
  });

  const contentType = response.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json") ? await response.json() : null;

  if (!response.ok) {
    const message = data?.message ?? `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}

export async function getProducts(): Promise<Product[]> {
  const data = await request<{ data: Product[] }>("/products", { next: { revalidate: 60 } });
  return data.data;
}

export async function getProduct(slug: string): Promise<Product> {
  const data = await request<{ data: Product }>(`/products/${slug}`, { next: { revalidate: 60 } });
  return data.data;
}

export async function quoteShipping(payload: {
  destination_city_id: string;
  courier: string;
  items: Array<{ product_id: number; quantity: number }>;
}): Promise<ShippingQuote[]> {
  const data = await request<{ data: ShippingQuote[] }>("/shipping/quote", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return data.data;
}

export async function checkout(payload: CheckoutPayload): Promise<OrderSummary> {
  const data = await request<{ data: OrderSummary }>("/checkout", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return data.data;
}

export async function getOrder(orderNumber: string): Promise<OrderSummary> {
  const data = await request<{ data: OrderSummary }>(`/orders/${orderNumber}`, { cache: "no-store" });
  return data.data;
}

export const adminApi = {
  login(email: string, password: string) {
    return request<{ data: import("@/types/api").AdminSession }>("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    }).then((response) => response.data);
  },
  products(token: string) {
    return request<{ data: Product[] }>("/admin/products", { token, cache: "no-store" }).then((response) => response.data);
  },
  orders(token: string) {
    return request<{ data: OrderSummary[] }>("/admin/orders", { token, cache: "no-store" }).then((response) => response.data);
  },
  order(token: string, id: number | string) {
    return request<{ data: import("@/types/api").OrderDetail }>(`/admin/orders/${id}`, {
      token,
      cache: "no-store"
    }).then((response) => response.data);
  },
  updateOrderStatus(token: string, id: number, status: string) {
    return request<{ data: OrderSummary }>(`/admin/orders/${id}/status`, {
      method: "PATCH",
      token,
      body: JSON.stringify({ status })
    }).then((response) => response.data);
  }
};

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}
