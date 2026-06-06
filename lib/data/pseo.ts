export const pSEOData = {
  destinations: [
    { id: "europe", name: "Europe" },
    { id: "japan", name: "Japan" },
    { id: "thailand", name: "Thailand" },
    { id: "iceland", name: "Iceland" },
    { id: "nyc", name: "New York City" },
    { id: "bali", name: "Bali" },
    { id: "mexico", name: "Mexico" },
    { id: "costa-rica", name: "Costa Rica" },
  ],
  climates: [
    { id: "winter", name: "Winter" },
    { id: "summer", name: "Summer" },
    { id: "rainy", name: "Rainy Season" },
    { id: "tropical", name: "Tropical" },
    { id: "cold-weather", name: "Cold Weather" },
  ],
  tripTypes: [
    { id: "business", name: "Business Trip" },
    { id: "backpacking", name: "Backpacking" },
    { id: "luxury", name: "Luxury Travel" },
    { id: "family", name: "Family Trip" },
    { id: "minimalist", name: "Minimalist Travel" },
    { id: "digital-nomad", name: "Digital Nomad" },
  ],
  durations: [
    { id: "weekend", name: "Weekend", days: 3 },
    { id: "5-day", name: "5 Days", days: 5 },
    { id: "1-week", name: "1 Week", days: 7 },
    { id: "2-week", name: "2 Weeks", days: 14 },
    { id: "1-month", name: "1 Month", days: 30 },
  ],
  luggageTypes: [
    { id: "carry-on", name: "Carry-On" },
    { id: "checked-bag", name: "Checked Bag" },
    { id: "ultralight-backpack", name: "Ultralight Backpack" },
    { id: "personal-item-only", name: "Personal Item Only" },
  ]
};

// Define structure of parsed slug data
export interface ParsedGuideSlug {
  tripType: string;
  destination: string;
  duration: string;
  climate?: string;
  luggageType?: string;
}

// Generate valid combinations (slug strings)
export function generatePseoSlugs(): string[] {
  const slugs: string[] = [];

  // Core pattern: [trip-type]-[destination]-[duration]
  // Optional add-ons: [luggage-type], [climate]

  pSEOData.tripTypes.forEach(trip => {
    pSEOData.destinations.forEach(dest => {
      pSEOData.durations.forEach(dur => {
        // Base permutation
        slugs.push(`${trip.id}-${dest.id}-${dur.id}`);

        // Add climate variations
        pSEOData.climates.forEach(climate => {
           slugs.push(`${trip.id}-${dest.id}-${dur.id}-${climate.id}`);
        });

        // Add luggage variations
        pSEOData.luggageTypes.forEach(luggage => {
           slugs.push(`${luggage.id}-${trip.id}-${dest.id}-${dur.id}`);
        });
      });
    });
  });

  return slugs;
}

// Parse a slug back into structured data
export function parsePseoSlug(slug: string): ParsedGuideSlug | null {


  const result: Partial<ParsedGuideSlug> = {};

  // Simple brute-force parsing based on known dictionaries
  const allIds = {
    destinations: pSEOData.destinations.map(d => d.id),
    climates: pSEOData.climates.map(d => d.id),
    tripTypes: pSEOData.tripTypes.map(d => d.id),
    durations: pSEOData.durations.map(d => d.id),
    luggageTypes: pSEOData.luggageTypes.map(d => d.id),
  };

  // Because some IDs have hyphens (e.g. cold-weather, 2-week),
  // we check against full dictionary matches instead of just splitting.

  let remainingSlug = slug;

  // Extract luggage type if present at start
  for (const l of allIds.luggageTypes) {
    if (remainingSlug.startsWith(l + "-")) {
      result.luggageType = l;
      remainingSlug = remainingSlug.replace(l + "-", "");
      break;
    }
  }

  // Extract trip type (usually at start or after luggage)
  for (const t of allIds.tripTypes) {
    if (remainingSlug.startsWith(t + "-")) {
      result.tripType = t;
      remainingSlug = remainingSlug.replace(t + "-", "");
      break;
    }
  }

  // Extract destination
  for (const d of allIds.destinations) {
    if (remainingSlug.startsWith(d + "-")) {
      result.destination = d;
      remainingSlug = remainingSlug.replace(d + "-", "");
      break;
    }
  }

  // Extract duration
  for (const dur of allIds.durations) {
    if (remainingSlug.includes(dur)) {
      result.duration = dur;
      remainingSlug = remainingSlug.replace(dur, "").replace(/^-|-$/g, ""); // clean dangling hyphens
      break;
    }
  }

  // Whatever is left might be climate
  if (remainingSlug.length > 0) {
    for (const c of allIds.climates) {
      if (remainingSlug === c) {
        result.climate = c;
        break;
      }
    }
  }

  // Validation: Must have at least tripType, destination, and duration
  if (result.tripType && result.destination && result.duration) {
    return result as ParsedGuideSlug;
  }

  return null;
}

// Lookup helpers
export const getPseoName = (category: keyof typeof pSEOData, id: string) => {
  const item = (pSEOData[category] as {id: string; name: string; days?: number}[]).find(i => i.id === id);
  return item ? item.name : id;
};

export const getPseoDays = (durationId: string) => {
  const dur = pSEOData.durations.find(d => d.id === durationId);
  return dur ? dur.days : 7;
};
