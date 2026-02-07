import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type CreateInquiryInput } from "@shared/routes";

// GET /api/destinations
export function useDestinations() {
  return useQuery({
    queryKey: [api.destinations.list.path],
    queryFn: async () => {
      const res = await fetch(api.destinations.list.path, { credentials: "include" });
      if (!res.ok) throw new Error('Failed to fetch destinations');
      return api.destinations.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/destinations/:slug
export function useDestination(slug: string) {
  return useQuery({
    queryKey: [api.destinations.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.destinations.get.path, { slug });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Failed to fetch destination');
      return api.destinations.get.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}

// POST /api/inquiries
export function useCreateInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateInquiryInput) => {
      const validated = api.inquiries.create.input.parse(data);
      const res = await fetch(api.inquiries.create.path, {
        method: api.inquiries.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.inquiries.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error('Failed to send inquiry');
      }
      return api.inquiries.create.responses[201].parse(await res.json());
    },
    // We don't invalidate queries here because inquiries aren't listed publicly
    // but we could if there was an admin panel
  });
}
