import { relations } from "drizzle-orm/relations";
import { devices, reviews, products } from "./schema";

export const reviewsRelations = relations(reviews, ({one}) => ({
	device: one(devices, {
		fields: [reviews.deviceId],
		references: [devices.id]
	}),
	product: one(products, {
		fields: [reviews.productId],
		references: [products.id]
	}),
}));

export const devicesRelations = relations(devices, ({many}) => ({
	reviews: many(reviews),
}));

export const productsRelations = relations(products, ({many}) => ({
	reviews: many(reviews),
}));