import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/src/context/CartContext";

export const metadata = {
  title: "T-Shirt Store",
  description: "Online t-shirt shop",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <CartProvider>
          <Header />
          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}