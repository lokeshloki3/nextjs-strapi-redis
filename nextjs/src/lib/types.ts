
export interface Blog {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: {
    url: string;
  };
  category: {
    id: number;
    documentId: string;
    name: string;
  };
  author: {
    id: number;
    documentId: string;
    name: string;
  };
}



export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: {
    url: string;
  };
  category: {
    id: number;
    documentId: string;
    name: string;
  };
  author: {
    id: number;
    documentId: string;
    name: string;
  };
}
