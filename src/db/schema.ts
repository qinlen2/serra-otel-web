import { boolean, integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const rooms = pgTable("rooms", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  shortDescription: text("short_description").notNull(),
  capacity: integer("capacity").notNull(),
  bedType: varchar("bed_type", { length: 120 }).notNull(),
  size: varchar("size", { length: 40 }).notNull(),
  hasBalcony: boolean("has_balcony").default(false).notNull(),
  hasAirConditioning: boolean("has_air_conditioning").default(true).notNull(),
  hasTv: boolean("has_tv").default(true).notNull(),
  hasWifi: boolean("has_wifi").default(true).notNull(),
  hasBathroom: boolean("has_bathroom").default(true).notNull(),
  suitableFor: text("suitable_for").array().notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const roomImages = pgTable("room_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  roomId: uuid("room_id").references(() => rooms.id).notNull(),
  url: text("url").notNull(),
  alt: varchar("alt", { length: 180 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  isCover: boolean("is_cover").default(false).notNull(),
});

export const hotelAreas = pgTable("hotel_areas", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 160 }).notNull(),
  type: varchar("type", { length: 40 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const breakfastItems = pgTable("breakfast_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  isHighlighted: boolean("is_highlighted").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const transportRoutes = pgTable("transport_routes", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 160 }).notNull(),
  type: varchar("type", { length: 40 }).notNull(),
  description: text("description").notNull(),
  estimatedTime: varchar("estimated_time", { length: 80 }).notNull(),
  stopName: varchar("stop_name", { length: 140 }).notNull(),
  walkingDistance: varchar("walking_distance", { length: 80 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const nearbyPlaces = pgTable("nearby_places", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 140 }).notNull(),
  type: varchar("type", { length: 60 }).notNull(),
  distance: varchar("distance", { length: 60 }).notNull(),
  walkingTime: varchar("walking_time", { length: 60 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const reservationRequests = pgTable("reservation_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 80 }).notNull(),
  email: varchar("email", { length: 180 }),
  checkIn: varchar("check_in", { length: 40 }).notNull(),
  checkOut: varchar("check_out", { length: 40 }).notNull(),
  guestCount: integer("guest_count").notNull(),
  preferredRoomId: uuid("preferred_room_id").references(() => rooms.id),
  message: text("message"),
  status: varchar("status", { length: 40 }).default("new").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  key: varchar("key", { length: 120 }).notNull().unique(),
  value: text("value").notNull(),
});
