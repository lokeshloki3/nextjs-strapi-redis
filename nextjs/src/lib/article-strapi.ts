import axios from 'axios';
import redis from './redis';
import { getStrapiURL } from './utils';

const STRAPI_BASE_URL = getStrapiURL();
const API_URL = `${STRAPI_BASE_URL}/api`;

export async function getAllArticles() {
  const cacheKey = 'blog:articles';

  // get from Redis
  const cached = await redis.get(cacheKey);
  console.log("cached", cached);

  if (cached) return JSON.parse(cached);

  // If not cached, fetch from Strapi
  const response = await axios.get(`${API_URL}/articles?populate=*`);

  // Cache it for 60 seconds
  await redis.set(cacheKey, JSON.stringify(response.data), 'EX', 260);
  console.log(`Data cached with key: ${cacheKey}`);

  return response.data;
}

export async function getArticleBySlug(slug: string, status: string) {
  const cacheKey = `blog:article:${slug}:${status}`;

  const cached = await redis.get(cacheKey);
  console.log("cached", cached);

  if (cached) return JSON.parse(cached);

  try {
    const response = await axios.get(`${API_URL}/articles`, {
      params: {
        'filters[slug][$eq]': slug,
        'status': status,
        'populate': '*',
      },
    });

    // console.log("data", response.data);
    await redis.set(cacheKey, JSON.stringify(response.data), 'EX', 260);
    console.log(`Data cached with key: ${cacheKey}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}


// import axios from 'axios';
// import { getStrapiURL } from './utils';

// const STRAPI_BASE_URL = getStrapiURL();
// const API_URL = `${STRAPI_BASE_URL}/api`;


// // const headers = {
// //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
// // };

// export async function getAllArticles() {
//   const response = await axios.get(`${API_URL}/articles?populate=*`, {
//     // headers,
//   });
//   return response.data;
// }

// export async function getArticleBySlug(slug: string, status: string) {
//   try {
//     console.log("slug", slug);
//     console.log("status", status);

//     const response = await axios.get(`${API_URL}/articles`, {
//       params: {
//         'filters[slug][$eq]': slug,
//         'status': status, // 'draft' or 'published'
//         'populate': '*',
//       },
//       // headers: {
//       //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
//       // },
//     });

//     return response.data;
//     // return response;
//   } catch (error) {
//     console.error("Error fetching article:", error);
//     throw error;
//   }
// }
