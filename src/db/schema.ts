import {
  pgTable,
  serial,
  text,
  integer,
  real,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  species: text("species").notNull(), // dog, cat, bird, rabbit, reptile, other
  breed: text("breed").notNull().default("Mixed"),
  ageYears: real("age_years").notNull().default(1),
  weightKg: real("weight_kg").notNull().default(5),
  gender: text("gender").notNull().default("Unknown"),
  color: text("color").default(""),
  imageUrl: text("image_url").default(""),
  ownerName: text("owner_name").default(""),
  notes: text("notes").default(""),
  neutered: boolean("neutered").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const vets = pgTable("vets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull().default("DVM"),
  specialties: text("specialties").notNull().default("General Practice"),
  species: text("species").notNull().default("Dogs, Cats"),
  rating: real("rating").notNull().default(4.9),
  reviewsCount: integer("reviews_count").notNull().default(120),
  priceCents: integer("price_cents").notNull().default(3500),
  yearsExp: integer("years_exp").notNull().default(8),
  languages: text("languages").notNull().default("English"),
  avatarUrl: text("avatar_url").default(""),
  bio: text("bio").default(""),
  clinic: text("clinic").default("VetIQ Virtual Clinic"),
  isOnline: boolean("is_online").default(true),
  nextSlot: text("next_slot").default("Today 4:30 PM"),
  consultsDone: integer("consults_done").default(1200),
  verified: boolean("verified").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const aiConsults = pgTable("ai_consults", {
  id: serial("id").primaryKey(),
  petId: integer("pet_id"),
  petName: text("pet_name").default(""),
  species: text("species").notNull().default("dog"),
  symptoms: jsonb("symptoms").$type<string[]>().default([]),
  duration: text("duration").default(""),
  extraNotes: text("extra_notes").default(""),
  triageLevel: text("triage_level").notNull().default("routine"), // emergency | urgent | routine | info
  urgencyScore: integer("urgency_score").notNull().default(20),
  summary: text("summary").default(""),
  possibleCauses: jsonb("possible_causes").$type<{ name: string; likelihood: string; detail: string }[]>().default([]),
  immediateActions: jsonb("immediate_actions").$type<string[]>().default([]),
  homeCare: jsonb("home_care").$type<string[]>().default([]),
  seeVetWhen: text("see_vet_when").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  petId: integer("pet_id"),
  petName: text("pet_name").notNull().default(""),
  vetId: integer("vet_id"),
  vetName: text("vet_name").notNull().default(""),
  scheduledAt: text("scheduled_at").notNull(),
  reason: text("reason").notNull().default("General checkup"),
  visitType: text("visit_type").notNull().default("video"), // video | chat | phone
  status: text("status").notNull().default("upcoming"), // upcoming | completed | cancelled
  notes: text("notes").default(""),
  priceCents: integer("price_cents").default(3500),
  meetingLink: text("meeting_link").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const healthRecords = pgTable("health_records", {
  id: serial("id").primaryKey(),
  petId: integer("pet_id"),
  petName: text("pet_name").default(""),
  kind: text("kind").notNull().default("checkup"), // vaccination | checkup | medication | surgery | allergy | weight | other
  title: text("title").notNull(),
  recordDate: text("record_date").notNull(),
  vetClinic: text("vet_clinic").default(""),
  notes: text("notes").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  plan: text("plan").notNull().default("plus"), // plus | pro
  priceCents: integer("price_cents").notNull().default(900),
  status: text("status").notNull().default("active"),
  referralCode: text("referral_code").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  source: text("source").notNull().default("landing"), // landing | referral | social
  referrerCode: text("referrer_code").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Pet = typeof pets.$inferSelect;
export type Vet = typeof vets.$inferSelect;
export type AiConsult = typeof aiConsults.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type HealthRecord = typeof healthRecords.$inferSelect;
