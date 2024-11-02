export type Review = {
  bsi: number;
  cons: string;
  content: string;
  createdAt: string;
  deviceId: string | null;
  id: string;
  image: string;
  product: {
    id: string;
    name: string;
    slug: string;
    type: string;
  };
  productId: string;
  pros: string;
  published: boolean;
  rating: number;
  slug: string;
  spoiler: boolean;
  subtitle: string;
  suggested: boolean;
  tags: string;
  title: string;
  updatedAt: string;
};

export type Product = {
  consumed: string | null;
  createdAt: string;
  genre: string;
  id: string;
  image: string;
  links: string;
  meta: {
    device: string;
    edition: string | null;
    played: number;
    price: number;
    refunded: boolean;
    store: string;
  };
  name: string;
  notes: string | null;
  released: string | null;
  reviews: {
    id: string;
    productId: string;
    slug: string;
    spoiler: number;
    subtitle: string;
    tags: string;
    title: string;
    updatedAt: string;
  }[];
  slug: string;
  tags: string;
  type: string;
  updatedAt: string;
};
