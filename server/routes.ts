import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.destinations.list.path, async (_req, res) => {
    const destinations = await storage.getDestinations();
    res.json(destinations);
  });

  app.get(api.destinations.get.path, async (req, res) => {
    const destination = await storage.getDestinationBySlug(req.params.slug);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json(destination);
  });

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  await seedDatabase();

  return httpServer;
}

export async function seedDatabase() {
  const existing = await storage.getDestinations();
  if (existing.length === 0) {
    await storage.createDestination({
      name: "Dubai",
      slug: "dubai",
      description: "Experience the pinnacle of luxury and modern architecture in the heart of the desert. From the Burj Khalifa to Palm Jumeirah.",
      imageUrl: "attached_assets/stock_images/dubai_luxury_holiday_82757812.jpg" 
    });
    await storage.createDestination({
      name: "Mexico",
      slug: "mexico",
      description: "Discover pristine beaches, ancient Mayan ruins, and vibrant culture in Cancun and Riviera Maya.",
      imageUrl: "attached_assets/stock_images/mexico_cancun_beach__017f52ff.jpg"
    });
    await storage.createDestination({
      name: "Dominican Republic",
      slug: "dominican-republic",
      description: "Relax in paradise with crystal clear waters and all-inclusive luxury in Punta Cana.",
      imageUrl: "attached_assets/stock_images/dominican_republic_p_1460e2a5.jpg"
    });
  }
}
