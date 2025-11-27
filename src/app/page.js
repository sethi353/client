import Link from "next/link"; 


export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-pink-600">
        Welcome to Cosmetics Store
      </h1>

      <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
        Discover premium skincare, beauty products, and cosmetics.
      </p>

      <Link
        href="/products"
        className="mt-8 inline-block px-6 py-3 bg-pink-600 text-white rounded-lg text-lg"
      >
        Shop Now
      </Link>

      {/* static section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
        <div className="p-6 shadow rounded-lg">
            <img
          src="https://i.ibb.co.com/8L9pBVww/download-34.jpg" 
          alt="Cosmetics Banner"
          className="mx-auto rounded-lg shadow-lg max-w-full"
        />
          <h3 className="text-xl font-bold">Premium Products</h3>
          <p className="text-gray-600 mt-2">Top-quality beauty items.</p>
        </div>

        <div className="p-6 shadow rounded-lg">
            <img
          src="https://i.ibb.co.com/8L9pBVww/download-34.jpg" 
          alt="Cosmetics Banner"
          className="mx-auto rounded-lg shadow-lg max-w-full"
        />
          <h3 className="text-xl font-bold">Fast Delivery</h3>
          <p className="text-gray-600 mt-2">Get your order within 2–3 days.</p>
        </div>

        <div className="p-6 shadow rounded-lg">
            <img
          src="https://i.ibb.co.com/8L9pBVww/download-34.jpg" 
          alt="Cosmetics Banner"
          className="mx-auto rounded-lg shadow-lg max-w-full"
        />
            

          <h3 className="text-xl font-bold">Trusted Brand</h3>
          <p className="text-gray-600 mt-2">Thousands of happy customers.</p>
        </div>
      </div>
    </div>
  );
}
