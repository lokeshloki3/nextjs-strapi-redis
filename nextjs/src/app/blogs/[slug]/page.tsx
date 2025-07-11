import Image from "next/image";
import { getBlogBySlug } from "@/lib/blog-strapi";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export default async function BlogDetail({ params, }: { params: Promise<{ slug: string }>; }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { isEnabled: isDraftMode } = await draftMode();
  const status = isDraftMode ? "draft" : "published";
  // console.log("status", status);
  const { data } = await getBlogBySlug(slug, status);
  if (data.length === 0) notFound();
  const blog = data[0];

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "";
  const imageUrl = baseUrl + blog.image.url;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="relative h-64 w-full mb-6">
        <Image
          src={imageUrl}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700">{blog.description}</p>
    </div>
  );
}
