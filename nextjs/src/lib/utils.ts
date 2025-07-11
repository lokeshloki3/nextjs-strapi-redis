export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_BASE_URL ?? "http://localhost:1337";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}
