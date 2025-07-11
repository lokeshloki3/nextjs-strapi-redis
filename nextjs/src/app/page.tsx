import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col gap-10 font-bold text-2xl">
        <div className="text-black mx-auto">Select One</div>
        <div className="flex gap-10">
          <Link href="/blogs">
            <div className="cursor-pointer bg-amber-600 text-white text-2xl font-semibold p-6 rounded-lg shadow-md hover:bg-blue-700 transition">
              Blogs
            </div>
          </Link>

          <Link href="/articles">
            <div className="cursor-pointer bg-green-600 text-white text-2xl font-semibold p-6 rounded-lg shadow-md hover:bg-green-700 transition">
              Articles
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
