import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types";
import { getAllArticles } from "@/lib/article-strapi";

export default async function ArticleList() {
  const articles = await getAllArticles();

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "";
  // console.log(baseUrl);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">Articles</h1>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {articles.data.map((article: Article) => {
          const imageUrl = baseUrl + article.image.url;
          // console.log(imageUrl);

          return (
            <Link key={article.slug} href={`/articles/${article.slug}`}>
              <div className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl text-black font-semibold">{article.title}</h2>
                  <p className="text-gray-600 mt-2">
                    {article.description.slice(0, 100)}...
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
