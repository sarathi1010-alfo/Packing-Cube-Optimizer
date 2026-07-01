import { getAirlines } from "@/lib/data";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function AirlinesPage() {
  const airlines = getAirlines();

  // Group airlines by region
  const regions = Array.from(new Set(airlines.map(a => a.region))).sort();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-navy">Airline Carry-On Rules</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Don&#39;t get caught at the gate. Check the exact carry-on and personal item dimensions for major global airlines to ensure your packing cubes fit perfectly. For more in-depth strategies, read our guide on <Link href="/blog/avoid-overweight-baggage-fees" className="text-brand-orange underline font-semibold">how to pack efficiently to avoid overweight baggage fees</Link>.
        </p>
      </div>

      <div className="space-y-16">
        {regions.map(region => (
          <section key={region}>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-b pb-2">
              <Plane className="h-5 w-5 text-brand-orange" /> {region} Airlines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {airlines.filter(a => a.region === region).map(airline => (
                <Link key={airline.id} href={`/airlines/${airline.id}`} className="block group">
                  <Card className="h-full transition-all duration-200 group-hover:shadow-md group-hover:border-brand-orange/50">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl group-hover:text-brand-orange transition-colors">{airline.name}</CardTitle>
                        {airline.carryOn.isIncluded ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle2 className="w-3 h-3 mr-1"/> Carry-on Free</Badge>
                        ) : (
                          <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50"><AlertTriangle className="w-3 h-3 mr-1"/> Fee applies</Badge>
                        )}
                      </div>
                      <CardDescription>Max Weight: {airline.carryOn.weightKg ? `${airline.carryOn.weightKg}kg` : "No strict limit"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="bg-brand-sand/30 p-3 rounded-lg border border-brand-beige">
                          <p className="font-medium text-brand-navy mb-1 text-xs uppercase tracking-wider">Carry-on</p>
                          <p className="text-lg font-semibold">{airline.carryOn.height} x {airline.carryOn.width} x {airline.carryOn.depth} cm</p>
                        </div>
                        <div className="flex justify-between items-center text-muted-foreground">
                          <span>Personal Item</span>
                          {airline.personalItem.height > 0 ? (
                            <span className="font-medium">{airline.personalItem.height}x{airline.personalItem.width}x{airline.personalItem.depth} cm</span>
                          ) : (
                            <span className="italic text-xs">Not specified / Zero</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
