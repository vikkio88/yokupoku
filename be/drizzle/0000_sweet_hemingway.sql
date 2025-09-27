-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `migrations` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(255),
	`batch` integer,
	`migration_time` numeric,
	CONSTRAINT "products_check_1" CHECK(`type` in ('game', 'movie', 'book', 'tv', 'music', 'comic_book', 'other'),
	CONSTRAINT "devices_check_2" CHECK(`type` in ('game_console', 'pc', 'reading', 'multimedia', 'other')
);
--> statement-breakpoint
CREATE TABLE `migrations_lock` (
	`index` integer PRIMARY KEY NOT NULL,
	`is_locked` integer,
	CONSTRAINT "products_check_1" CHECK(`type` in ('game', 'movie', 'book', 'tv', 'music', 'comic_book', 'other'),
	CONSTRAINT "devices_check_2" CHECK(`type` in ('game_console', 'pc', 'reading', 'multimedia', 'other')
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text(255) PRIMARY KEY,
	`type` text DEFAULT 'other',
	`meta` numeric,
	`name` text(255) NOT NULL,
	`genre` text(255) DEFAULT (null),
	`tags` text DEFAULT (null),
	`links` text DEFAULT (null),
	`notes` text DEFAULT (null),
	`released` numeric DEFAULT (null),
	`consumed` numeric DEFAULT (null),
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` numeric DEFAULT (CURRENT_TIMESTAMP),
	`slug` text(255),
	`image` text,
	CONSTRAINT "products_check_1" CHECK(`type` in ('game', 'movie', 'book', 'tv', 'music', 'comic_book', 'other'),
	CONSTRAINT "devices_check_2" CHECK(`type` in ('game_console', 'pc', 'reading', 'multimedia', 'other')
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);--> statement-breakpoint
CREATE TABLE `devices` (
	`id` text(255) PRIMARY KEY,
	`name` text(255) NOT NULL,
	`type` text DEFAULT 'other',
	`meta` numeric,
	`links` text DEFAULT (null),
	`notes` text DEFAULT (null),
	`ownedFrom` numeric DEFAULT (null),
	CONSTRAINT "products_check_1" CHECK(`type` in ('game', 'movie', 'book', 'tv', 'music', 'comic_book', 'other'),
	CONSTRAINT "devices_check_2" CHECK(`type` in ('game_console', 'pc', 'reading', 'multimedia', 'other')
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` text(255) PRIMARY KEY,
	`slug` text(255) NOT NULL,
	`productId` text(255) NOT NULL,
	`deviceId` text(255) DEFAULT (null),
	`title` text(255) NOT NULL,
	`subtitle` text(255) NOT NULL,
	`image` text NOT NULL,
	`content` text NOT NULL,
	`pros` text DEFAULT (null),
	`cons` text DEFAULT (null),
	`tags` text DEFAULT (null),
	`rating` integer,
	`bsi` integer,
	`suggested` numeric DEFAULT '0',
	`spoiler` numeric DEFAULT '0',
	`published` numeric DEFAULT '0',
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` numeric DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "products_check_1" CHECK(`type` in ('game', 'movie', 'book', 'tv', 'music', 'comic_book', 'other'),
	CONSTRAINT "devices_check_2" CHECK(`type` in ('game_console', 'pc', 'reading', 'multimedia', 'other')
);
--> statement-breakpoint
CREATE UNIQUE INDEX `reviews_slug_unique` ON `reviews` (`slug`);
*/