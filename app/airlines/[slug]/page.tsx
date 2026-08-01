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

  const carryOnInches = {
    height: (airline.carryOn.height / 2.54).toFixed(1),
    width: (airline.carryOn.width / 2.54).toFixed(1),
    depth: (airline.carryOn.depth / 2.54).toFixed(1),
  };

  const personalInches = airline.personalItem.height > 0 ? {
    height: (airline.personalItem.height / 2.54).toFixed(1),
    width: (airline.personalItem.width / 2.54).toFixed(1),
    depth: (airline.personalItem.depth / 2.54).toFixed(1),
  } : null;

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
            <h1 className="text-4xl font-bold text-brand-navy mb-2">{airline.name} Carry-On Baggage Guide: Size Limits & Fees for 2026</h1>
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

        <div className="prose prose-lg prose-slate max-w-none prose-headings:text-brand-navy prose-a:text-brand-orange hover:prose-a:text-brand-orange/80 mt-12">
          <h2>{airline.name} carry-on size limits (inches/cm)</h2>
          <p>
            When flying with {airline.name}, your main carry-on bag must not exceed <strong>{airline.carryOn.height} x {airline.carryOn.width} x {airline.carryOn.depth} cm</strong> ({carryOnInches.height} x {carryOnInches.width} x {carryOnInches.depth} inches) including handles and wheels.
            {airline.carryOn.weightKg ? ` The absolute maximum weight permitted is ${airline.carryOn.weightKg} kg (${(airline.carryOn.weightKg * 2.20462).toFixed(1)} lbs).` : ' There is no strict weight limit published, provided you can lift the bag into the overhead bin unassisted.'}
          </p>

          <h2>{airline.name} checked baggage fees and weight limits</h2>
          <p>
            {airline.carryOn.isIncluded ?
              `While your carry-on is included with your standard fare, checked baggage typically incurs an additional fee, especially on basic economy tickets.` :
              `Please note that a standard carry-on is NOT included for free with all fare classes on ${airline.name}. You may need to pay an additional fee.`}
            Checked bags on {airline.name} usually have a standard weight limit of 23 kg (50 lbs) for economy class. Bags exceeding this limit will be subject to expensive overweight baggage fees. We strongly recommend reading our guide on <Link href="/blog/avoid-overweight-baggage-fees" className="text-brand-orange underline font-semibold">how to pack efficiently to avoid overweight baggage fees</Link> before you head to the airport.
          </p>

          <h2>How to pack for {airline.name} carry-on restrictions using PackFit</h2>
          <p>
            With a maximum volume of {carryOnVol.toFixed(1)} liters, spatial optimization is critical. We recommend using a modular packing system. Start with one large compression packing cube for bulky items like jeans and sweaters, and place it at the bottom of the bag. Use standard cubes for lighter tops to prevent wrinkles.
            Before you pack, use the <Link href="/calculator" className="text-brand-orange underline font-semibold">PackFit visual simulator</Link> to map out your luggage and ensure it meets {airline.name}&apos;s strict guidelines.
          </p>

          <h2>Personal item guidelines for {airline.name}</h2>
          <p>
            {airline.personalItem.height > 0 ? (
              `In addition to your carry-on, you are allowed one personal item such as a laptop bag, purse, or small backpack. This item must fit under the seat in front of you and cannot exceed ${airline.personalItem.height} x ${airline.personalItem.width} x ${airline.personalItem.depth} cm (${personalInches?.height} x ${personalInches?.width} x ${personalInches?.depth} inches).`
            ) : (
              `In addition to your carry-on, you are allowed one personal item such as a laptop bag, purse, or small backpack. While ${airline.name} does not publish exact maximum dimensions for personal items, it must fit comfortably under the seat in front of you.`
            )}
            This is an excellent place to store heavy electronics to reduce the weight of your main carry-on.
          </p>
        </div>

        <div className="mt-8 bg-brand-sand/30 border-l-4 border-brand-orange p-6 rounded-r-xl">
          <h3 className="text-xl font-bold text-brand-navy mb-4 mt-0">Quick Reference Table</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-brand-beige">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-brand-navy">Bag Type</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-brand-navy">Size Limit (cm)</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-brand-navy">Weight Limit</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-brand-navy">Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-beige">
                <tr>
                  <td className="px-4 py-2 text-sm">Carry-On</td>
                  <td className="px-4 py-2 text-sm">{airline.carryOn.height}x{airline.carryOn.width}x{airline.carryOn.depth}</td>
                  <td className="px-4 py-2 text-sm">{airline.carryOn.weightKg ? `${airline.carryOn.weightKg} kg` : "No strict limit"}</td>
                  <td className="px-4 py-2 text-sm">{airline.carryOn.isIncluded ? "Included" : "Varies"}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm">Personal Item</td>
                  <td className="px-4 py-2 text-sm">{airline.personalItem.height > 0 ? `${airline.personalItem.height}x${airline.personalItem.width}x${airline.personalItem.depth}` : "Must fit under seat"}</td>
                  <td className="px-4 py-2 text-sm">No strict limit</td>
                  <td className="px-4 py-2 text-sm">Included</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
