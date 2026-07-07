import { Metadata } from "next";
import Link from "next/link";
import { PlaneTakeoff, Box, Map } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Packing Cube Optimizer",
  description: "Learn about Packing Cube Optimizer, why it exists, and how it helps you travel smarter.",
  other: {
    "last-modified": "2026-07-07"
  }
};

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12 px-4 mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">About Packing Cube Optimizer</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We build tools to make the most stressful part of travel—packing—visual, mathematical, and easy.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Why we built this</h2>
          <p className="text-muted-foreground mb-4">
            Travelers constantly struggle with a simple spatial problem: <em>&quot;Will all this fit in my carry-on?&quot;</em>
            Instead of guessing, over-packing, or dealing with stressful <Link href="/blog/avoid-overweight-baggage-fees" className="text-primary hover:underline">overweight baggage fees</Link>, we realized the solution
            was right in front of us—packing cubes. Learn more in our latest guide on <Link href="/blog/avoid-overweight-baggage-fees" className="text-primary hover:underline font-semibold">how to pack efficiently to avoid overweight baggage fees</Link>.
          </p>
          <p className="text-muted-foreground">
            Packing cubes turn abstract clothing piles into standardized blocks. By creating a visual, drag-and-drop
            simulator, we can mathematically prove whether your gear fits into your airline&apos;s specific baggage dimensions.
          </p>
        </div>
        <div className="bg-brand-sand/30 rounded-2xl p-8 border">
          <h3 className="text-xl font-semibold mb-4">Core Principles</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <Box className="w-6 h-6 text-brand-orange shrink-0" />
              <div>
                <strong className="block text-foreground">Visual First</strong>
                <span className="text-sm text-muted-foreground">Stop guessing. See exactly how your cubes arrange inside the bag.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <PlaneTakeoff className="w-6 h-6 text-brand-orange shrink-0" />
              <div>
                <strong className="block text-foreground">Airline Specific</strong>
                <span className="text-sm text-muted-foreground">Built-in baggage dimensions for major global airlines to prevent surprise fees.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <Map className="w-6 h-6 text-brand-orange shrink-0" />
              <div>
                <strong className="block text-foreground">Trip Context</strong>
                <span className="text-sm text-muted-foreground">Packing guides tailored to destination, climate, and duration.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-card border rounded-2xl p-8 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Part of the Alfo Ecosystem</h2>
        <p className="text-muted-foreground mb-6">
          Packing Cube Optimizer is proudly built and maintained as part of the <a href="https://alfo.online" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">alfo.online</a> suite of web utilities.
          Our mission is to build clean, fast, and highly specialized tools that solve specific everyday problems.
        </p>
        <Link href="/calculator" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-brand-orange text-white hover:bg-brand-orange/90 h-10 px-6 py-2">
          Try the Simulator
        </Link>
      </div>
    </div>
  );
}
