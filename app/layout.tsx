import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DogePay | Simple DOGE Payment Links",
  description: "Create payment links and get paid directly in DOGE. No middlemen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-200">
        {children}
      </body>
    </html>
  );
}
