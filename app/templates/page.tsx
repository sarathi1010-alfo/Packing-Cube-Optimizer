import { getTemplates } from "@/lib/data";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LayoutTemplate, Clock, Sun, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TemplatesPage() {
  const templates = getTemplates();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="space-y-4 mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-navy">Packing Templates</h1>
        <p className="text-xl text-muted-foreground">
          Don&#39;t start from scratch. Steal our proven packing layouts designed for specific trips, climates, and travel styles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map(template => (
          <Card key={template.slug} className="flex flex-col h-full hover:shadow-md transition-shadow border-brand-beige">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="bg-brand-orange/10 w-10 h-10 rounded-lg flex items-center justify-center text-brand-orange">
                  <LayoutTemplate className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="capitalize">{template.travelerType}</Badge>
              </div>
              <CardTitle className="text-xl line-clamp-1">{template.title}</CardTitle>
              <CardDescription className="line-clamp-2 mt-2">{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 bg-brand-sand/30 px-2 py-1 rounded-md">
                  <Clock className="w-4 h-4" /> {template.durationDays} days
                </span>
                <span className="flex items-center gap-1.5 bg-brand-sand/30 px-2 py-1 rounded-md capitalize">
                  <Sun className="w-4 h-4" /> {template.climate}
                </span>
              </div>

              <div className="pt-4 border-t border-dashed">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Setup Includes</p>
                <p className="text-sm font-medium text-brand-navy">
                  {template.recommendedCubes.length} Packing Cubes
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {template.packingChecklist.length} Item Checklist
                </p>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href={`/templates/${template.slug}`} className="w-full">
                <Button className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white">
                  View Template <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
