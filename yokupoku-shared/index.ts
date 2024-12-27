export const PRODUCT_TYPES = {
  GAME: "game",
  MOVIE: "movie",
  BOOK: "book",
  TV: "tv",
  MUSIC: "music",
  COMIC_BOOK: "comic_book",
  OTHER: "other",
};

export type ProductType = (typeof PRODUCT_TYPES)[keyof typeof PRODUCT_TYPES];

export enum DeviceTypes {
  OTHER = "OTHER",
  PC = "PC",
}
export const DEVICES = [
  "pc",
  "ps4",
  "ps3",
  "nintendo:switch",
  "android",
  "nintendo:gameboyadvance",
  "psx",
  "ps2",
  "nintendo:ds",
  "nintendo:64",
  "other",
] as const;

export const DEVICE_TYPES = {
  GAME_CONSOLE: "game_console",
  PC: "pc",
  READING: "reading",
  MULTIMEDIA: "multimedia",
  OTHER: "other",
} as const;

export const GAMES_STORES = [
  "steam",
  "gog",
  "origin",
  "epic",
  "battle.net",
  "ubi",
  "itch.io",
  "nintendo:eshop",
  "playstation:store",
  "xbox:store",
  // used for slug
  "other",
  "physicalsupport",
  "amazon",
  "amazon:used",
] as const;

export type Meta =
  Record<string, string|boolean|number>
export interface Product {
  id: string;
  type: ProductType;
  meta: Meta;
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
// this is used for parsing/editing meta
export type MetaProduct = Omit<Product, "meta"> & { meta: string };

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

export default {
  PRODUCT_TYPES,
  GAMES_STORES,
};
