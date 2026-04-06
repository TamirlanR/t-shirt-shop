"use client";

import { useCart } from "@/src/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        total,
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
        })),
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error("Checkout failed:", errorData);
      alert("Failed to create order");
      return;
    }

    const data = await res.json();
    console.log("ORDER CREATED:", data);

    clearCart();
    router.push("/order-success");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border p-3 rounded-lg"
              required
            />

            <textarea
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border p-3 rounded-lg"
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              Checkout
            </button>
          </form>

          <div>
            <h2 className="text-xl font-semibold mb-4">Order summary</h2>

            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="border p-3 rounded-lg">
                  <p className="font-semibold">{item.name}</p>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                  <p>
                    {item.quantity} × ${item.price}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold mt-6">Total: ${total}</h2>
          </div>
        </div>
      )}
    </div>
  );
}