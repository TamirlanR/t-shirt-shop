"use client";

import Link from "next/link";
import { useCart } from "@/src/context/CartContext";

export default function Header() {
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          T-Shirt Store
        </Link>

        <nav className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart ({totalItems})</Link>
        </nav>
      </div>
    </header>
  );
}