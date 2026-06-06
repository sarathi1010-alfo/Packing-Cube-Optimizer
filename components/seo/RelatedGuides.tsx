import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ParsedGuideSlug, generatePseoSlugs, parsePseoSlug, getPseoName } from "@/lib/data/pseo";

interface RelatedGuidesProps {
  currentSlug: ParsedGuideSlug;
}

export function RelatedGuides({ currentSlug }: RelatedGuidesProps) {
  const allSlugs = generatePseoSlugs();

  // Find related guides based on semantic clustering:
  // 1. Same destination, different duration
  // 2. Same duration & climate, different destination

  const relatedLinks: { url: string; title: string; type: string }[] = [];

  for (const slug of allSlugs) {
    if (relatedLinks.length >= 6) break; // Limit to 6 links

    const parsed = parsePseoSlug(slug);
    if (!parsed) continue;

    // Skip the exact current page
    if (
      parsed.destination === currentSlug.destination &&
      parsed.duration === currentSlug.duration &&
      parsed.tripType === currentSlug.tripType &&
      parsed.climate === currentSlug.climate
    ) {
      continue;
    }

    let relationType = "";

    if (parsed.destination === currentSlug.destination && parsed.tripType === currentSlug.tripType) {
       relationType = "Different Duration";
    } else if (parsed.duration === currentSlug.duration && parsed.climate === currentSlug.climate && parsed.destination !== currentSlug.destination) {
       relationType = "Similar Climate / Duration";
    }

    if (relationType) {
       // Avoid duplicates
       if (!relatedLinks.find(l => l.url === `/packing-cubes/${slug}`)) {
           const destName = getPseoName("destinations", parsed.destination);
           const tripName = getPseoName("tripTypes", parsed.tripType);
           const durName = getPseoName("durations", parsed.duration);

           relatedLinks.push({
               url: `/packing-cubes/${slug}`,
               title: `${durName} ${tripName} in ${destName}`,
               type: relationType
           });
       }
    }
  }

  if (relatedLinks.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-brand-navy mb-4">Related Packing Guides</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {relatedLinks.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className="group block p-4 bg-white border border-brand-beige rounded-xl hover:shadow-md hover:border-brand-orange/50 transition-all"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">{link.type}</p>
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
