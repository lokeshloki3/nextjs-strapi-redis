import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function POST(req: Request) {
  const token = req.headers.get('authorization') || req.headers.get('Authorization');

  if (token !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  console.log("body", body);

  // If this is a webhook test event
  // if (body.event === 'trigger-test') {
  //   return NextResponse.json({ ok: true, test: true });
  // }

  const uid = body.uid; // e.g., "api::article.article" or "api::blog.blog"
  const slug = body.entry?.slug;
  console.log("slug", slug);

  if (!uid || !slug) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const type = uid.split('::')[1]?.split('.')[0]; // extracts 'article' or 'blog' from 'api::article.article'

  console.log("type", type);

  if (type === 'article') {
    await redis.del('blog:articles');
    await redis.del(`blog:article:${slug}:published`);
    await redis.del(`blog:article:${slug}:draft`);
  } else if (type === 'blog') {
    await redis.del('blog:blogs');
    await redis.del(`blog:blog:${slug}:published`);
    await redis.del(`blog:blog:${slug}:draft`);
  }

  return NextResponse.json({ revalidated: true });
}


// import redis from '@/lib/redis';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { slug, type } = body; // type: "article" or "blog"

//     if (type === 'article') {
//       await redis.del('blog:articles');
//       if (slug) {
//         await redis.del(`blog:article:${slug}:published`);
//         await redis.del(`blog:article:${slug}:draft`);
//       }
//     } else if (type === 'blog') {
//       await redis.del('blog:blogs');
//       if (slug) {
//         await redis.del(`blog:blog:${slug}:published`);
//         await redis.del(`blog:blog:${slug}:draft`);
//       }
//     }

//     return NextResponse.json({ revalidated: true });
//   } catch (error) {
//     return NextResponse.json({ revalidated: false, error: error.message }, { status: 500 });
//   }
// }


// // import redis from '@/lib/redis';
// // import { NextResponse } from 'next/server';

// // export async function POST(req: Request) {
// //   try {
// //     const body = await req.json();
// //     const slug = body.slug; // send from webhook body

// //     await redis.del('blog:articles');
// //     if (slug) {
// //       await redis.del(`blog:article:${slug}:published`);
// //       await redis.del(`blog:article:${slug}:draft`);
// //     }

// //     return NextResponse.json({ revalidated: true });
// //   } catch (error) {
// //     return NextResponse.json({ revalidated: false, error: error.message }, { status: 500 });
// //   }
// // }
