import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { ToastProvider } from "@/lib/toast";
import { AppShell } from "@/components/AppShell";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap"
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Toko Nusa · Kriya Nusantara",
  description:
    "Kurator kriya & pangan dari Sabang sampai Merauke. Belanja kurasi langsung dari pembuat, checkout cepat, ongkir transparan."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <ToastProvider>
          <CartProvider>
            <AppShell>{children}</AppShell>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
