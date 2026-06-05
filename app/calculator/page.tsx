"use client";

import { useState } from "react";
import { getCubes } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Box, ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";

export default function CalculatorPage() {
  const [days, setDays] = useState<number[]>([7]);
  const [climate, setClimate] = useState("mixed");
  const [travelStyle, setTravelStyle] = useState("standard");
  const [calculatedCubes, setCalculatedCubes] = useState<Record<string, number> | null>(null);

  const cubes = getCubes();

  const calculateCubes = () => {
    // Simple mock heuristic for calculator logic
    const result: Record<string, number> = {};
    const tripDays = days[0];

    // Base needs
    result["small-standard"] = 1; // Always need one for underwear/socks
    result["clear-toiletry"] = 1;

    if (climate === "cold") {
      result["large-compression"] = Math.ceil(tripDays / 5);
      result["medium-compression"] = 1;
    } else if (climate === "hot") {
      result["medium-standard"] = Math.ceil(tripDays / 4);
      result["small-compression"] = 1; // for swimwear
    } else {
      result["medium-compression"] = Math.ceil(tripDays / 5);
      result["small-standard"] = (result["small-standard"] || 0) + 1;
    }

    if (travelStyle === "business" || travelStyle === "tech") {
      result["tube-cube"] = 1; // Cables
    }

    if (tripDays > 5 && travelStyle !== "minimalist") {
       result["shoe-bag"] = 1;
    }

    setCalculatedCubes(result);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-navy">Packing Cube Calculator</h1>
        <p className="text-xl text-muted-foreground">
          Tell us about your trip and we&#39;ll calculate exactly how many and what size cubes you need.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-brand-beige shadow-sm h-fit">
          <CardHeader className="bg-brand-sand/10 border-b">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-brand-orange" /> Trip Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="text-base">Trip Duration</Label>
                <span className="font-semibold text-brand-orange">{days[0]} Days</span>
              </div>
              <Slider
                value={days}
                onValueChange={(val: number | readonly number[]) => setDays(val as number[])}
                max={30}
                min={1}
                step={1}
                className="py-4"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base">Climate</Label>
              <Select value={climate} onValueChange={(val: string | null) => setClimate(val || "mixed")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select climate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hot">Hot / Tropical</SelectItem>
                  <SelectItem value="mixed">Mixed / Mild</SelectItem>
                  <SelectItem value="cold">Cold / Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base">Travel Style</Label>
              <Select value={travelStyle} onValueChange={(val: string | null) => setTravelStyle(val || "standard")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimalist">Minimalist / One-bag</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="business">Business / Formal</SelectItem>
                  <SelectItem value="tech">Digital Nomad / Tech Heavy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateCubes} className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white" size="lg">
              Calculate My Setup
            </Button>
          </CardContent>
        </Card>

        <div>
          {calculatedCubes ? (
            <Card className="border-brand-beige shadow-sm border-2 border-brand-olive/50 bg-brand-olive/5 h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-brand-navy">Your Perfect Setup</CardTitle>
                <CardDescription>Based on {days[0]} days in a {climate} climate.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(calculatedCubes).map(([cubeId, count]) => {
                  const cube = cubes.find(c => c.id === cubeId);
                  if (!cube) return null;
                  return (
                    <div key={cubeId} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-brand-beige">
                       <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-black/5" style={{ backgroundColor: cube.color }}>
                        <span className="font-bold text-black/60">{count}x</span>
                      </div>
                      <div>
                        <p className="font-semibold text-brand-navy">{cube.name}</p>
                        <p className="text-xs text-muted-foreground">{cube.volumeLiters}L • {cube.type}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="pt-6 mt-6 border-t border-brand-olive/20">
                  <Link href="/simulator">
                    <Button variant="outline" className="w-full bg-white border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
                      Test in Simulator <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-brand-beige shadow-sm border-dashed h-full flex flex-col items-center justify-center p-12 text-center text-muted-foreground bg-brand-sand/10">
              <Box className="h-16 w-16 text-brand-navy/20 mb-4" />
              <p className="text-lg font-medium text-brand-navy">Waiting for details</p>
              <p className="text-sm">Enter your trip details and click calculate to see your personalized packing cube setup.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
