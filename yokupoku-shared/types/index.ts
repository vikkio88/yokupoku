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
  released: Date | null;
  consumed: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Device {
  id: string;
  name: string;
  type: DeviceTypes;
  meta: Record<string, any>;
  links: string | null;
  notes: string | null;
  ownedFrom: Date | null;
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
  createdAt: Date;
  updatedAt: Date;
}
