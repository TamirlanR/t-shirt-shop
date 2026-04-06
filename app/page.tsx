import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect T-Shirt</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Simple and stylish t-shirts for everyday wear.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-90"
        >
          Shop now
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}