import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PremiumApps Store",
  description: "Website katalog aplikasi premium dengan order cepat via WhatsApp."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
