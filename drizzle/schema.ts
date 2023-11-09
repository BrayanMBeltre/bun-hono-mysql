import { pgTable, uniqueIndex, serial, text, timestamp, foreignKey, integer, varchar } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"


export const user = pgTable("User", {
	id: serial("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email"),
	emailVerified: timestamp("emailVerified", { precision: 3, mode: 'string' }),
	image: text("image"),
	hashedPassword: text("hashedPassword"),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	favoriteIds: integer("favoriteIds").array(),
},
(table) => {
	return {
		emailKey: uniqueIndex("User_email_key").on(table.email),
	}
});

export const account = pgTable("Account", {
	id: serial("id").primaryKey().notNull(),
	userId: integer("userId").notNull().references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		providerProviderAccountIdKey: uniqueIndex("Account_provider_providerAccountId_key").on(table.provider, table.providerAccountId),
	}
});

export const listing = pgTable("Listing", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	imageSrc: text("imageSrc").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	category: text("category").notNull(),
	roomCount: integer("roomCount").notNull(),
	bathroomCount: integer("bathroomCount").notNull(),
	guestCount: integer("guestCount").notNull(),
	locationValue: text("locationValue").notNull(),
	userId: integer("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	price: integer("price").notNull(),
});

export const reservation = pgTable("Reservation", {
	id: serial("id").primaryKey().notNull(),
	userId: integer("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	listingId: integer("listingId").notNull().references(() => listing.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	startDate: timestamp("startDate", { precision: 3, mode: 'string' }).notNull(),
	endDate: timestamp("endDate", { precision: 3, mode: 'string' }).notNull(),
	totalPrice: integer("totalPrice").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
});

export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});