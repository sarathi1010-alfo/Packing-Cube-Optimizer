"use client";

import { useState } from "react";
import Link from "next/link";
import { getAirlines } from "@/lib/data";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export default function CarryOnCheckerPage() {
  const airlines = getAirlines().sort((a, b) => a.name.localeCompare(b.name));

  const [height, setHeight] = useState<number | "">("");
  const [width, setWidth] = useState<number | "">("");
  const [depth, setDepth] = useState<number | "">("");
  const [selectedAirlineId, setSelectedAirlineId] = useState<string>("");

  const selectedAirline = airlines.find(a => a.id === selectedAirlineId);

  const checkFit = () => {
    if (!selectedAirline || !height || !width || !depth) return null;

    // Standardize input sort order so orientation doesn't fail a bag that fits
    const bagDims = [Number(height), Number(width), Number(depth)].sort((a, b) => b - a);
    const limitDims = [
      selectedAirline.carryOn.height,
      selectedAirline.carryOn.width,
      selectedAirline.carryOn.depth
    ].sort((a, b) => b - a);

    const fits = bagDims[0] <= limitDims[0] &&
                 bagDims[1] <= limitDims[1] &&
                 bagDims[2] <= limitDims[2];

    const bagVol = (bagDims[0] * bagDims[1] * bagDims[2]) / 1000;
    const limitVol = (limitDims[0] * limitDims[1] * limitDims[2]) / 1000;

    return { fits, bagVol, limitVol, limitDims };
  };

  const result = checkFit();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-navy">Carry-On Compatibility Checker</h1>
        <p className="text-xl text-muted-foreground">
          Compare your suitcase dimensions directly against airline limits to avoid gate-check fees. Learn how to <Link href="/blog/avoid-overweight-baggage-fees" className="text-brand-orange underline font-semibold">pack efficiently to avoid overweight baggage fees</Link> completely.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-brand-beige shadow-sm h-fit">
          <CardHeader className="bg-brand-sand/10 border-b">
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-brand-olive" /> Check Your Bag
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Select Airline</Label>
              <Select value={selectedAirlineId} onValueChange={(val: string | null) => setSelectedAirlineId(val || "")}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an airline..." />
                </SelectTrigger>
                <SelectContent>
                  {airlines.map(airline => (
                    <SelectItem key={airline.id} value={airline.id}>{airline.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 pt-4 border-t border-dashed">
              <Label className="text-base font-semibold">Your Suitcase Dimensions (cm)</Label>
              <p className="text-xs text-muted-foreground mb-2">Include wheels and handles in your measurements.</p>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-xs">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="e.g. 55"
                    value={height}
                    onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width" className="text-xs">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="e.g. 35"
                    value={width}
                    onChange={(e) => setWidth(e.target.value ? Number(e.target.value) : "")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="depth" className="text-xs">Depth</Label>
                  <Input
                    id="depth"
                    type="number"
                    placeholder="e.g. 23"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value ? Number(e.target.value) : "")}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          {result ? (
            <Card className={`border-2 shadow-sm h-full ${result.fits ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
              <CardHeader className="text-center pb-2">
                {result.fits ? (
                  <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                ) : (
                  <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                )}
                <CardTitle className={`text-3xl ${result.fits ? 'text-green-800' : 'text-red-800'}`}>
                  {result.fits ? "It fits!" : "It's too big."}
                </CardTitle>
                <CardDescription className={result.fits ? 'text-green-700' : 'text-red-700'}>
                  {result.fits
                    ? `Your bag is compliant with ${selectedAirline?.name} carry-on rules.`
                    : `Your bag exceeds ${selectedAirline?.name}'s maximum dimensions.`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="bg-white/60 p-4 rounded-xl border border-black/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Airline Limit:</span>
                    <span className="font-semibold">{result.limitDims[0]} x {result.limitDims[1]} x {result.limitDims[2]} cm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Your Bag:</span>
                    <span className={`font-semibold ${!result.fits ? 'text-red-600' : ''}`}>
                      {[height, width, depth].sort((a, b) => Number(b) - Number(a)).join(" x ")} cm
                    </span>
                  </div>
                </div>

                <div className="bg-white/60 p-4 rounded-xl border border-black/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Airline Max Volume:</span>
                    <span className="font-semibold">{result.limitVol.toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Your Bag Volume:</span>
                    <span className="font-semibold">{result.bagVol.toFixed(1)}L</span>
                  </div>
                </div>

                {!selectedAirline?.carryOn.isIncluded && (
                  <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-100/50 p-3 rounded-lg">
                    <AlertTriangle className="h-5 w-5 shrink-0" />
                    <p>Note: {selectedAirline?.name} charges a fee for carry-on bags. Only a smaller personal item is free.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-brand-beige shadow-sm border-dashed h-full flex flex-col items-center justify-center p-12 text-center text-muted-foreground bg-brand-sand/10">
              <Plane className="h-16 w-16 text-brand-navy/20 mb-4" />
              <p className="text-lg font-medium text-brand-navy">Awaiting input</p>
              <p className="text-sm">Select an airline and enter your suitcase dimensions to see if it qualifies as a carry-on.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
