import { z } from "zod";

export const AirlineSchema = z.object({
  id: z.string(),
  name: z.string(),
  region: z.string(),
  carryOn: z.object({
    width: z.number(),
    height: z.number(),
    depth: z.number(),
    weightKg: z.number().nullable(),
    isIncluded: z.boolean(),
  }),
  personalItem: z.object({
    width: z.number(),
    height: z.number(),
    depth: z.number(),
    weightKg: z.number().nullable(),
    isIncluded: z.boolean(),
  }),
});

export const CubeSchema = z.object({
  id: z.string(),
  name: z.string(),
  dimensions: z.object({
    width: z.number(),
    height: z.number(),
    depth: z.number(),
  }),
  volumeLiters: z.number(),
  type: z.enum(["standard", "compression", "specialty"]),
  useCase: z.string(),
  recommendedTripLength: z.string(),
  compressionFactor: z.number(),
  color: z.string(),
});

export const TemplateSchema = z.object({
  slug: z.string(),
  title: z.string(),
  durationDays: z.number(),
  climate: z.enum(["hot", "warm", "mild", "mixed", "cold", "variable"]),
  travelerType: z.enum(["minimalist", "standard", "tech", "business", "family", "active"]),
  description: z.string(),
  recommendedCubes: z.array(z.string()),
  packingChecklist: z.array(z.string()),
});

export type Airline = z.infer<typeof AirlineSchema>;
export type Cube = z.infer<typeof CubeSchema>;
export type Template = z.infer<typeof TemplateSchema>;
