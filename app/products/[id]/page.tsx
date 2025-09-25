import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${(await params).id}`
    );

    if (!response.ok) {
      notFound();
    }

    const product: Product = await response.json();

    return (
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 to-white"
        ></div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-6">
            <Link
              href="/products"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
            >
              ← Back to Products
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative aspect-square bg-white rounded-2xl border border-gray-300 shadow-sm overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                className="object-contain p-8"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-6">
              <div>
                <div className="text-sm text-indigo-600 font-medium uppercase tracking-wide mb-2">
                  {product.category}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl font-bold text-gray-900">
                    €{product.price.toFixed(2)}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto pt-6">
                <button className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 transition-colors duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </main>
      </section>
    );
  } catch (error) {
    notFound();
  }
}
