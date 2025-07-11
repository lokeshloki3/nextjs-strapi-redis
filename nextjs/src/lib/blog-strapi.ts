import axios from 'axios';
import { getStrapiURL } from './utils';

const STRAPI_BASE_URL = getStrapiURL();
const API_URL = `${STRAPI_BASE_URL}/api`;


// const headers = {
//   Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
// };

export async function getAllBlogs() {
  const response = await axios.get(`${API_URL}/blogs?populate=*`, {
    // headers,
  });
  return response.data;
}

export async function getBlogBySlug(slug: string, status: string) {
  try {
    console.log("slug", slug);
    console.log("status", status);

    const response = await axios.get(`${API_URL}/blogs`, {
      params: {
        'filters[slug][$eq]': slug,
        'status': status, // 'draft' or 'published'
        'populate': '*',
      },
      // headers: {
      //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      // },
    });

    return response.data;
    // return response;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}

