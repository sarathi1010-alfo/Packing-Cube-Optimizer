import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Box, LayoutTemplate, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-sand/50 to-background pt-20 pb-24 px-4">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-sm font-medium text-brand-orange mb-4">
            <span className="flex h-2 w-2 rounded-full bg-brand-orange mr-2"></span>
            Stop guessing if it fits
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-brand-navy max-w-4xl mx-auto leading-tight">
            Pack smarter, fit more, travel lighter.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The interactive visual packing planner that helps you optimize luggage space using packing cubes, outfit planning, and airline-specific simulations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/calculator">
              <Button size="lg" className="h-14 px-8 text-lg bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full w-full sm:w-auto">
                Build My Perfect Packing Setup <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/airlines">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto border-brand-beige">
                Check Airline Rules
              </Button>
            </Link>
          </div>
          <div className="pt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-olive" /> No signup required</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-olive" /> 100% Free to use</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-olive" /> Visual Drag & Drop</div>
          </div>
        </div>
      </section>

      {/* Interactive Preview / Value Prop Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">Visual packing that actually makes sense.</h2>
              <p className="text-lg text-muted-foreground">
                Stop making lists and hoping everything fits. Our visual simulator lets you drag and drop proportionally sized packing cubes into a digital carry-on matched to your airline&#39;s exact dimensions.
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex gap-3 items-start">
                  <div className="mt-1 bg-brand-olive/20 p-2 rounded-full text-brand-olive"><Box className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-semibold text-brand-navy">Cube Sizing & Selection</h3>
                    <p className="text-muted-foreground">Find out exactly which combination of small, medium, and compression cubes work for your trip.</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="mt-1 bg-brand-orange/20 p-2 rounded-full text-brand-orange"><Plane className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-semibold text-brand-navy">Airline Compliance</h3>
                    <p className="text-muted-foreground">We check your setup against 20+ airline bag policies instantly.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-brand-sand/30 rounded-3xl p-8 border border-brand-beige shadow-lg relative h-[400px] flex items-center justify-center">
              {/* Placeholder for Simulator Preview */}
              <div className="text-center space-y-4">
                <Box className="h-16 w-16 text-brand-navy/20 mx-auto" />
                <p className="text-brand-navy font-medium text-lg">Interactive Simulator Coming Here</p>
                <Link href="/simulator">
                  <Button variant="outline" className="bg-white/50 backdrop-blur-sm">
                    Try the Beta Simulator
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-brand-sand/10 border-t border-brand-beige">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">Everything you need to pack perfectly</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Tools designed to solve spatial optimization so you never pay overweight baggage fees again.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-md transition-shadow border-brand-beige">
              <CardHeader>
                <div className="mb-4 bg-brand-navy/10 w-12 h-12 rounded-lg flex items-center justify-center text-brand-navy">
                  <Box className="h-6 w-6" />
                </div>
                <CardTitle>Cube Calculator</CardTitle>
                <CardDescription>Enter your trip details and we&#39;ll calculate exactly how many and what size cubes you need.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/calculator" className="text-brand-orange font-medium flex items-center hover:underline">
                  Try Calculator <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-brand-beige">
              <CardHeader>
                <div className="mb-4 bg-brand-olive/10 w-12 h-12 rounded-lg flex items-center justify-center text-brand-olive">
                  <Plane className="h-6 w-6" />
                </div>
                <CardTitle>Airline Checker</CardTitle>
                <CardDescription>Compare your suitcase and cube configuration against strict budget airline limits (Ryanair, EasyJet, etc).</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/airlines" className="text-brand-olive font-medium flex items-center hover:underline">
                  View Airlines <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-brand-beige">
              <CardHeader>
                <div className="mb-4 bg-brand-orange/10 w-12 h-12 rounded-lg flex items-center justify-center text-brand-orange">
                  <LayoutTemplate className="h-6 w-6" />
                </div>
                <CardTitle>Packing Templates</CardTitle>
                <CardDescription>Steal our proven packing layouts for 2-week Europe trips, winter getaways, and digital nomad setups.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/templates" className="text-brand-orange font-medium flex items-center hover:underline">
                  Browse Templates <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
