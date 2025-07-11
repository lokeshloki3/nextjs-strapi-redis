import axios from 'axios';
import redis from './redis';
import { getStrapiURL } from './utils';

const STRAPI_BASE_URL = getStrapiURL();
const API_URL = `${STRAPI_BASE_URL}/api`;

export async function getAllBlogs() {
  const cacheKey = 'blog:blogs';

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const response = await axios.get(`${API_URL}/blogs?populate=*`);
  await redis.set(cacheKey, JSON.stringify(response.data), 'EX', 60);

  return response.data;
}

export async function getBlogBySlug(slug: string, status: string) {
  const cacheKey = `blog:blog:${slug}:${status}`;

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  try {
    const response = await axios.get(`${API_URL}/blogs`, {
      params: {
        'filters[slug][$eq]': slug,
        'status': status,
        'populate': '*',
      },
    });

    await redis.set(cacheKey, JSON.stringify(response.data), 'EX', 60);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
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

// export async function getAllBlogs() {
//   const response = await axios.get(`${API_URL}/blogs?populate=*`, {
//     // headers,
//   });
//   return response.data;
// }

// export async function getBlogBySlug(slug: string, status: string) {
//   try {
//     console.log("slug", slug);
//     console.log("status", status);

//     const response = await axios.get(`${API_URL}/blogs`, {
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
//     console.error("Error fetching blog:", error);
//     throw error;
//   }
// }

