import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <h1 className="text-4xl font-bold mb-4">Order placed successfully</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. Your order has been received.
      </p>

      <Link
        href="/shop"
        className="inline-block px-6 py-3 bg-black text-white rounded-lg"
      >
        Back to shop
      </Link>
    </div>
  );
}