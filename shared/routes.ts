import { z } from 'zod';
import { insertInquirySchema, destinations, inquiries } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  destinations: {
    list: {
      method: 'GET' as const,
      path: '/api/destinations',
      responses: {
        200: z.array(z.custom<typeof destinations.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/destinations/:slug',
      responses: {
        200: z.custom<typeof destinations.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },
  inquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/inquiries',
      input: insertInquirySchema,
      responses: {
        201: z.custom<typeof inquiries.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type DestinationResponse = z.infer<typeof api.destinations.list.responses[200]>[number];
export type CreateInquiryInput = z.infer<typeof api.inquiries.create.input>;
