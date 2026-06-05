import { getTemplateBySlug, getTemplates, getCubeById } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Box, PlaneTakeoff, Clock, Sun, User } from "lucide-react";

export async function generateStaticParams() {
  const templates = getTemplates();
  return templates.map((template) => ({
    slug: template.slug,
  }));
}

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const template = getTemplateBySlug(resolvedParams.slug);

  if (!template) {
    notFound();
  }

  // Aggregate cubes to count quantities
  const cubeCounts = template.recommendedCubes.reduce((acc, cubeId) => {
    acc[cubeId] = (acc[cubeId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/templates">
        <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-brand-navy">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to templates
        </Button>
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex gap-2 mb-4">
              <Badge variant="secondary" className="capitalize bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20"><User className="w-3 h-3 mr-1"/> {template.travelerType}</Badge>
              <Badge variant="outline" className="capitalize"><Sun className="w-3 h-3 mr-1"/> {template.climate}</Badge>
              <Badge variant="outline"><Clock className="w-3 h-3 mr-1"/> {template.durationDays} Days</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">{template.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {template.description}
            </p>
          </div>

          <div className="bg-brand-sand/20 rounded-2xl p-6 border border-brand-beige">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Box className="h-6 w-6 text-brand-olive" /> Recommended Cube Setup
            </h2>
            <div className="space-y-4">
              {Object.entries(cubeCounts).map(([cubeId, count]) => {
                const cube = getCubeById(cubeId);
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
                    <div className="hidden sm:block text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Best For</p>
                      <p className="text-sm font-medium truncate max-w-[200px]">{cube.useCase}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-brand-beige shadow-sm sticky top-24">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
               <PlaneTakeoff className="h-5 w-5 text-brand-navy" /> Packing Checklist
            </h3>
            <ul className="space-y-3">
              {template.packingChecklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-olive shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-dashed">
              <Link href="/simulator">
                <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white" size="lg">
                  Try this in Simulator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
