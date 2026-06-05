import { getAirlineById, getAirlines } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, AlertTriangle, Info, Box } from "lucide-react";

export async function generateStaticParams() {
  const airlines = getAirlines();
  return airlines.map((airline) => ({
    slug: airline.id,
  }));
}

export default async function AirlinePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const airline = getAirlineById(resolvedParams.slug);

  if (!airline) {
    notFound();
  }

  // Calculate volume in Liters
  const carryOnVol = (airline.carryOn.height * airline.carryOn.width * airline.carryOn.depth) / 1000;
  const personalVol = airline.personalItem.height > 0 ? (airline.personalItem.height * airline.personalItem.width * airline.personalItem.depth) / 1000 : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/airlines">
        <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-brand-navy">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all airlines
        </Button>
      </Link>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
          <div>
            <h1 className="text-4xl font-bold text-brand-navy mb-2">{airline.name} Baggage Rules</h1>
            <p className="text-muted-foreground">{airline.region} Region</p>
          </div>
          <Link href={`/carry-on-checker?airline=${airline.id}`}>
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white shrink-0">
               Check My Suitcase
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Carry On Card */}
          <Card className="border-brand-beige shadow-sm">
            <CardHeader className="bg-brand-sand/20 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Box className="h-5 w-5 text-brand-navy" />
                  Cabin Bag (Carry-on)
                </CardTitle>
                {airline.carryOn.isIncluded ? (
                  <span className="flex items-center text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full"><CheckCircle2 className="w-3 h-3 mr-1"/> Included</span>
                ) : (
                  <span className="flex items-center text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-full"><AlertTriangle className="w-3 h-3 mr-1"/> Fee Applies</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Max Dimensions</p>
                <p className="text-4xl font-bold text-brand-navy tracking-tight">
                  {airline.carryOn.height}<span className="text-xl text-muted-foreground font-normal mx-1">x</span>
                  {airline.carryOn.width}<span className="text-xl text-muted-foreground font-normal mx-1">x</span>
                  {airline.carryOn.depth}<span className="text-xl text-muted-foreground font-normal ml-1">cm</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed">
                <div className="bg-background rounded-lg p-3 border border-brand-beige">
                  <p className="text-xs text-muted-foreground mb-1">Max Weight</p>
                  <p className="font-semibold text-lg">{airline.carryOn.weightKg ? `${airline.carryOn.weightKg} kg` : "No limit"}</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-brand-beige">
                  <p className="text-xs text-muted-foreground mb-1">Max Volume</p>
                  <p className="font-semibold text-lg">{carryOnVol.toFixed(1)} L</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Item Card */}
          <Card className="border-brand-beige shadow-sm">
            <CardHeader className="bg-brand-sand/20 border-b">
               <CardTitle className="text-xl">Personal Item</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {airline.personalItem.height > 0 ? (
                <>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Max Dimensions</p>
                    <p className="text-4xl font-bold text-brand-navy tracking-tight">
                      {airline.personalItem.height}<span className="text-xl text-muted-foreground font-normal mx-1">x</span>
                      {airline.personalItem.width}<span className="text-xl text-muted-foreground font-normal mx-1">x</span>
                      {airline.personalItem.depth}<span className="text-xl text-muted-foreground font-normal ml-1">cm</span>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed">
                    <div className="bg-background rounded-lg p-3 border border-brand-beige">
                      <p className="text-xs text-muted-foreground mb-1">Status</p>
                      <p className="font-semibold text-sm">Must fit under seat</p>
                    </div>
                    <div className="bg-background rounded-lg p-3 border border-brand-beige">
                      <p className="text-xs text-muted-foreground mb-1">Max Volume</p>
                      <p className="font-semibold text-lg">{personalVol.toFixed(1)} L</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <Info className="h-8 w-8 text-muted-foreground mb-3" />
                  <p className="font-medium">No strict dimensions published</p>
                  <p className="text-sm text-muted-foreground mt-1">Usually must fit under the seat in front of you.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="bg-brand-olive/10 border border-brand-olive/20 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-brand-navy mb-2 flex items-center gap-2">
            <Box className="h-5 w-5 text-brand-olive" /> Recommended Packing Strategy
          </h3>
          <p className="text-muted-foreground mb-4">
            For {airline.name}, with a {carryOnVol.toFixed(0)}L limit, we recommend using compression cubes to maximize space without exceeding the external dimensions.
          </p>
          <Link href={`/calculator?airline=${airline.id}`}>
            <Button variant="outline" className="bg-white">
              Calculate Cubes for {airline.name}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
