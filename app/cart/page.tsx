"use client";

import { useCart } from "@/src/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

          </div>

          <h2 className="text-xl font-bold mt-6">Total: ${total}</h2>
          <Link
            href="/checkout"
            className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-lg"
            >
            Proceed to checkout
          </Link>
        </>
      )}
    </div>
  );
}