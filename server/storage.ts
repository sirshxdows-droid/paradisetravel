import { users, type User, type InsertUser, destinations, type Destination, inquiries, type Inquiry, type InsertInquiry } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getDestinations(): Promise<Destination[]>;
  getDestinationBySlug(slug: string): Promise<Destination | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  createDestination(destination: typeof destinations.$inferInsert): Promise<Destination>;
}

export class DatabaseStorage implements IStorage {
  async getDestinations(): Promise<Destination[]> {
    return await db.select().from(destinations);
  }

  async getDestinationBySlug(slug: string): Promise<Destination | undefined> {
    const [destination] = await db.select().from(destinations).where(eq(destinations.slug, slug));
    return destination;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db.insert(inquiries).values(insertInquiry).returning();
    return inquiry;
  }

  async createDestination(insertDestination: typeof destinations.$inferInsert): Promise<Destination> {
    const [destination] = await db.insert(destinations).values(insertDestination).returning();
    return destination;
  }
}

export const storage = new DatabaseStorage();
