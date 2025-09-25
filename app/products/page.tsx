import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default async function ProductsExample() {
  const data = await fetch("https://fakestoreapi.com/products");
  const products = await data.json();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 to-white"
      ></div>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold">Contact</h1>
          <p className="mt-2 text-gray-600 max-w-prose">
            Fill in the form and we’ll get back to you within one business day.
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product: Product) => (
            <article
              key={product.id}
              className="rounded-2xl bg-white border border-gray-300 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="object-contain"
                  sizes="100vw 100vh"
                  fill
                />
              </div>
              <div className="p-6 flex flex-col gap-3">
                <h2 className="font-semibold text-lg line-clamp-1">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-1 text-sm">
                  € {product.price.toFixed(2)}{" "}
                  <span className="text-gray-500">/ piece</span>
                </div>
                <Link
                  href={`/products/${product.id}`}
                  className="mt-auto inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700"
                >
                  View
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </section>
  );
}
