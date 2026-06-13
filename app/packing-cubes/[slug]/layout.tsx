import { ReactNode } from "react";
import { parsePseoSlug, getPseoName } from "@/lib/data/pseo";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

type Props = {
  params: Promise<{ slug: string }>;
  children: ReactNode;
};

export async function generateMetadata(
  { params }: Props

): Promise<Metadata> {
  const resolvedParams = await params;
  const parsedSlug = parsePseoSlug(resolvedParams.slug);

  if (!parsedSlug) {
    return {
      title: "Packing Cube Optimizer",
    };
  }

  const destName = getPseoName("destinations", parsedSlug.destination);
  const tripName = getPseoName("tripTypes", parsedSlug.tripType);
  const durName = getPseoName("durations", parsedSlug.duration);

  // Optional modifiers
  const climateString = parsedSlug.climate ? ` ${getPseoName("climates", parsedSlug.climate)}` : "";
  const luggageString = parsedSlug.luggageType ? `${getPseoName("luggageTypes", parsedSlug.luggageType)} ` : "";

  // e.g., Best Carry-On Packing Cubes for a Winter Europe Trip (2 Weeks)
  const title = `Best ${luggageString}Packing Cubes for a${climateString} ${destName} ${tripName} (${durName})`;

  const description = `Optimize your ${luggageString.toLowerCase() || 'travel '}packing for a ${durName.toLowerCase()} ${tripName.toLowerCase()} to ${destName}. Get exact cube allocation and compression strategies${climateString ? ` for ${climateString.toLowerCase().trim()} weather` : ''}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/packing-cubes/${resolvedParams.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export default function PseoLayout({ children }: Props) {
  return <>{children}</>;
}
