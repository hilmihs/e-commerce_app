import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Toko Nusa",
  description: "Modern e-commerce storefront with guest checkout and Midtrans payments."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <CartProvider>
          <AppShell>{children}</AppShell>
        </CartProvider>
      </body>
    </html>
  );
}
