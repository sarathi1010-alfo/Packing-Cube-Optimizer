import { generatePseoSlugs, parsePseoSlug, getPseoName, getPseoDays } from "@/lib/data/pseo";
import { notFound } from "next/navigation";
import { getCubes } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Box } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedGuides } from "@/components/seo/RelatedGuides";

export async function generateStaticParams() {
  const slugs = generatePseoSlugs();
  return slugs.slice(0, 500).map(slug => ({
    slug: slug,
  }));
}

export default async function PseoGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const parsedSlug = parsePseoSlug(resolvedParams.slug);

  if (!parsedSlug) {
    notFound();
  }

  const destName = getPseoName("destinations", parsedSlug.destination);
  const tripName = getPseoName("tripTypes", parsedSlug.tripType);
  const durName = getPseoName("durations", parsedSlug.duration);
  const climateName = parsedSlug.climate ? getPseoName("climates", parsedSlug.climate) : "Mixed Weather";
  const luggageName = parsedSlug.luggageType ? getPseoName("luggageTypes", parsedSlug.luggageType) : "Standard Luggage";

  const tripDays = getPseoDays(parsedSlug.duration);

  const cubes = getCubes();
  const calculatedCubes: Record<string, number> = {};

  calculatedCubes["small-standard"] = 1;
  calculatedCubes["clear-toiletry"] = 1;

  if (parsedSlug.climate === "cold-weather" || parsedSlug.climate === "winter") {
    calculatedCubes["large-compression"] = Math.ceil(tripDays / 5);
    calculatedCubes["medium-compression"] = 1;
  } else if (parsedSlug.climate === "tropical" || parsedSlug.climate === "summer") {
    calculatedCubes["medium-standard"] = Math.ceil(tripDays / 4);
    calculatedCubes["small-compression"] = 1;
  } else {
    calculatedCubes["medium-compression"] = Math.ceil(tripDays / 5);
    calculatedCubes["small-standard"] = 2;
  }

  if (parsedSlug.tripType === "business" || parsedSlug.tripType === "digital-nomad") {
    calculatedCubes["tube-cube"] = 1;
  }

  if (tripDays > 5 && parsedSlug.tripType !== "minimalist" && parsedSlug.tripType !== "backpacking") {
     calculatedCubes["shoe-bag"] = 1;
  }

  // Schema generation
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How many packing cubes do I need for a ${durName.toLowerCase()} ${tripName.toLowerCase()} to ${destName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `For a ${durName.toLowerCase()} trip to ${destName}, we recommend ${Object.values(calculatedCubes).reduce((a,b) => a+b, 0)} packing cubes. This includes specific sizes optimized for ${climateName.toLowerCase()} conditions.`
        }
      },
      {
        "@type": "Question",
        "name": `Should I use compression cubes for ${destName} in ${climateName.toLowerCase()}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": parsedSlug.climate === 'winter' || parsedSlug.climate === 'cold-weather'
            ? `Yes, compression cubes are highly recommended for ${destName} in ${climateName.toLowerCase()} to condense bulky items like sweaters and jackets.`
            : `Standard cubes are usually sufficient for ${climateName.toLowerCase()} in ${destName}, though one small compression cube is useful for dirty laundry or swimwear.`
        }
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Best Packing Cube Setup for a ${durName} ${tripName} in ${destName}`,
    "author": {
      "@type": "Organization",
      "name": "PackFit"
    }
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/templates">
          <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-brand-navy">
            <ArrowLeft className="mr-2 h-4 w-4" /> Browse all templates
          </Button>
        </Link>

        <div className="space-y-6 mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-semibold tracking-wider uppercase">{luggageName}</span>
            <span className="px-3 py-1 bg-brand-sand/50 text-brand-navy rounded-full text-xs font-semibold tracking-wider uppercase">{climateName}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy leading-tight">
            Best Packing Cube Setup for a {durName} {tripName} in {destName}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Optimize your {luggageName.toLowerCase()} packing for {destName}. Based on a {durName.toLowerCase()} duration and {climateName.toLowerCase()} conditions, here is the exact cube configuration you need to pack perfectly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-brand-sand/20 rounded-2xl p-6 border border-brand-beige">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Box className="h-6 w-6 text-brand-olive" /> Recommended Cube Strategy
              </h2>
              <div className="space-y-4">
                {Object.entries(calculatedCubes).map(([cubeId, count]) => {
                  const cube = cubes.find(c => c.id === cubeId);
                  if (!cube) return null;
                  return (
                    <div key={cubeId} className="flex items-center justify-between bg-white p-4 rounded-xl border border-brand-beige shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border border-black/5" style={{ backgroundColor: cube.color }}>
                          <span className="font-bold text-black/60">{count}x</span>
                        </div>
                        <div>
                          <p className="font-semibold text-brand-navy text-lg">{cube.name}</p>
                          <p className="text-sm text-muted-foreground">{cube.volumeLiters}L • {cube.type}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-dashed">
                <h3 className="text-lg font-semibold mb-3">Why this setup works for {destName}</h3>
                <p className="text-muted-foreground">
                  For a {durName.toLowerCase()} {tripName.toLowerCase()} in {climateName.toLowerCase()} weather, you need to balance capacity with weight limits. {parsedSlug.climate === 'winter' || parsedSlug.climate === 'cold-weather' ? 'Compression cubes are strictly necessary to handle bulky sweaters and jackets.' : 'Standard cubes provide easy access and breathability for lighter clothing.'}
                </p>
              </div>
            </div>

            {/* Automated FAQ Section for AI Citation */}
            <div className="pt-8 border-t border-brand-beige">
              <h2 className="text-2xl font-bold text-brand-navy mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">How many packing cubes do I need for a {durName.toLowerCase()} {tripName.toLowerCase()} to {destName}?</h3>
                  <p className="text-muted-foreground">For a {durName.toLowerCase()} trip to {destName}, we recommend {Object.values(calculatedCubes).reduce((a,b) => a+b, 0)} packing cubes. This includes specific sizes optimized for {climateName.toLowerCase()} conditions.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">Should I use compression cubes for {destName} in {climateName.toLowerCase()}?</h3>
                  <p className="text-muted-foreground">
                    {parsedSlug.climate === 'winter' || parsedSlug.climate === 'cold-weather'
                      ? `Yes, compression cubes are highly recommended for ${destName} in ${climateName.toLowerCase()} to condense bulky items like sweaters and jackets.`
                      : `Standard cubes are usually sufficient for ${climateName.toLowerCase()} in ${destName}, though one small compression cube is useful for dirty laundry or swimwear.`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-brand-beige shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Quick Details</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Destination</span>
                  <span className="font-medium">{destName}</span>
                </li>
                <li className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{durName}</span>
                </li>
                <li className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Trip Type</span>
                  <span className="font-medium">{tripName}</span>
                </li>
                <li className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Climate</span>
                  <span className="font-medium">{climateName}</span>
                </li>
              </ul>

              <div className="mt-6">
                <Link href="/simulator">
                  <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                    Simulate this setup
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <RelatedGuides currentSlug={parsedSlug} />
      </div>
    </>
  );
}
