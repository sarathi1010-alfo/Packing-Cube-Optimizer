import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, LayoutTemplate, ArrowRight, CheckCircle2 } from "lucide-react";
import { RelatedTools } from "@/components/widgets/related-tools";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-sand/50 to-background pt-20 pb-24 px-4">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-brand-olive/30 bg-brand-olive/10 px-3 py-1 text-sm font-medium text-brand-olive mb-4">
            <span className="flex h-2 w-2 rounded-full bg-brand-olive mr-2"></span>
            Your personal system for packing consistency
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-brand-navy max-w-4xl mx-auto leading-tight">
            Never forget essentials again.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            PackFit is your habit-forming workflow companion. Travel lighter, smarter, and with complete peace of mind using scenario-based packing and smart local heuristics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-8 text-lg bg-brand-navy hover:bg-brand-navy/90 text-white rounded-full w-full sm:w-auto shadow-xl">
                Open My Workspace <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto border-brand-beige hover:bg-brand-sand/50">
                Explore Scenarios
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


      {/* Features Grid */}
      <section className="py-24 bg-brand-sand/10 border-t border-brand-beige">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">Everything you need to pack perfectly</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Tools designed to solve spatial optimization so you never pay overweight baggage fees again.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-md transition-shadow border-brand-beige bg-white">
              <CardHeader>
                <div className="mb-4 bg-brand-navy/10 w-12 h-12 rounded-lg flex items-center justify-center text-brand-navy">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <CardTitle>Smart Scoring</CardTitle>
                <CardDescription>Gamify your packing with our travel efficiency score and get rule-based AI coaching on how to pack better.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard" className="text-brand-orange font-medium flex items-center hover:underline">
                  View Dashboard <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-brand-beige bg-white">
              <CardHeader>
                <div className="mb-4 bg-brand-olive/10 w-12 h-12 rounded-lg flex items-center justify-center text-brand-olive">
                  <LayoutTemplate className="h-6 w-6" />
                </div>
                <CardTitle>Scenario Templates</CardTitle>
                <CardDescription>Start instantly with high-ROI templates designed for weekend trips, backpacking, or digital nomad setups.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/templates" className="text-brand-olive font-medium flex items-center hover:underline">
                  Browse Scenarios <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-brand-beige bg-white">
              <CardHeader>
                <div className="mb-4 bg-brand-orange/10 w-12 h-12 rounded-lg flex items-center justify-center text-brand-orange">
                  <Box className="h-6 w-6" />
                </div>
                <CardTitle>Offline & Persistent</CardTitle>
                <CardDescription>PackFit works everywhere. Your plans, progress, and streaks are saved locally and are always accessible.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard" className="text-brand-orange font-medium flex items-center hover:underline">
                  Start Packing <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-brand-navy mb-6">Master the Art of Packing</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Learn the expert strategies used by professional travelers to maximize space and minimize stress.
          </p>
          <Link href="/blog/avoid-overweight-baggage-fees">
            <Button variant="outline" size="lg" className="border-brand-orange text-brand-orange hover:bg-brand-orange/10 rounded-full">
              Read: How to Avoid Overweight Baggage Fees <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <RelatedTools />
    </div>
  );
}
