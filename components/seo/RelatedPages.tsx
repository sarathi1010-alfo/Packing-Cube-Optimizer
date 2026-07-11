import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedPagesProps {
  currentSlug: string;
  currentCluster: "trip-types" | "destinations" | "packing-lists";
}

interface GuideLink {
  slug: string;
  title: string;
  cluster?: string;
}

const LINKS: Record<string, GuideLink[]> = {
  "trip-types": [
    { slug: "backpacking-europe", title: "Backpacking Europe" },
    { slug: "family-vacation", title: "Family Vacation" },
    { slug: "solo-travel", title: "Solo Travel" },
    { slug: "beach-vacation", title: "Beach Vacation" },
    { slug: "business-trip", title: "Business Trip" },
    { slug: "winter-ski-trip", title: "Winter Ski Trip" },
    { slug: "honeymoon-maldives", title: "Honeymoon Maldives" },
    { slug: "music-festival-guide", title: "Music Festival Guide" },
    { slug: "photography-expedition", title: "Photography Expedition" },
  ],
  "destinations": [
    { slug: "asia-packing-guide", title: "Asia Packing Guide" },
    { slug: "europe-packing-guide", title: "Europe Packing Guide" },
    { slug: "japan-packing-guide", title: "Japan Packing Guide" },
    { slug: "mexico-packing-guide", title: "Mexico Packing Guide" },
    { slug: "thailand-packing-guide", title: "Thailand Packing Guide" },
    { slug: "italy-packing-guide", title: "Italy Packing Guide" },
    { slug: "australia-packing-guide", title: "Australia Packing Guide" },
    { slug: "egypt-packing-guide", title: "Egypt Packing Guide" },
    { slug: "brazil-packing-guide", title: "Brazil Packing Guide" },
  ],
  "packing-lists": [
    { slug: "weekend-getaway", title: "Weekend Getaway" },
    { slug: "business-trip-checklist", title: "Business Trip Checklist" },
    { slug: "digital-nomad-packing-list", title: "Digital Nomad Packing List" },
    { slug: "ultralight-backpacking-list", title: "Ultralight Backpacking List" },
    { slug: "safari-packing-list", title: "Safari Packing List" },
    { slug: "ski-trip-checklist", title: "Ski Trip Checklist" },
  ]
};

export function RelatedPages({ currentSlug, currentCluster }: RelatedPagesProps) {
  const clusterLinks = LINKS[currentCluster] || [];

  // Filter out current page.
  // Removed Math.random() to ensure stable RSC output and avoid hydration issues.
  const filteredLinks: GuideLink[] = clusterLinks
    .filter(link => link.slug !== currentSlug)
    .slice(0, 4);

  // If we need more, take from other clusters
  if (filteredLinks.length < 4) {
      const otherClusters = (Object.keys(LINKS) as (keyof typeof LINKS)[]).filter(c => c !== currentCluster);
      for (const cluster of otherClusters) {
          if (filteredLinks.length >= 4) break;
          const otherLinks = LINKS[cluster].slice(0, 4 - filteredLinks.length).map(l => ({ ...l, cluster }));
          filteredLinks.push(...otherLinks);
      }
  }

  return (
    <div className="mt-16 pt-8 border-t border-brand-beige">
      <h3 className="text-2xl font-bold text-brand-navy mb-6">Explore More Guides</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {filteredLinks.slice(0, 4).map((link) => (
          <Link
            key={link.slug}
            href={`/${link.cluster || currentCluster}/${link.slug}`}
            className="group block p-4 bg-white border border-brand-beige rounded-xl hover:shadow-md hover:border-brand-orange/50 transition-all"
          >
            <p className="font-medium text-brand-navy group-hover:text-brand-orange flex items-center justify-between">
              {link.title}
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
