export enum ProductTypes {
  OTHER = "OTHER",
  GAME = "GAME",
}

export enum DeviceTypes {
  OTHER = "OTHER",
  PC = "PC",
}

export interface Product {
  id: string;
  type: ProductTypes;
  meta: Record<string, any>;
  name: string;
  genre: string | null;
  tags: string | null;
  links: string | null;
  notes: string | null;
  slug: string;
  image: string | null;
  released: Date | null | string;
  consumed: Date | null | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Device {
  id: string;
  name: string;
  type: DeviceTypes;
  meta: Record<string, any>;
  links: string | null;
  notes: string | null;
  ownedFrom: Date | null | string;
}

export interface Review {
  id: string;
  slug: string;
  productId: string;
  deviceId: string | null;
  title: string;
  subtitle: string;
  image: string;
  content: string;
  pros: string | null;
  cons: string | null;
  tags: string | null;
  rating: number | null;
  bsi: number | null;
  suggested: boolean;
  spoiler: boolean;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
