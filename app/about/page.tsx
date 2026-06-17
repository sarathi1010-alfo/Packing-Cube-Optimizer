import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about PackFit, why it exists, and how it helps you travel smarter by optimizing your luggage space.",
};

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-16 px-4 mx-auto space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy">About PackFit</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          We built PackFit because we were tired of the pre-travel anxiety of wondering &quot;Will it all fit?&quot; and &quot;Am I going to pay overweight fees?&quot;
        </p>
      </section>

      {/* The Problem */}
      <section className="bg-brand-sand/30 rounded-3xl p-8 md:p-12 border border-brand-beige">
        <h2 className="text-3xl font-bold text-brand-navy mb-6">The Problem</h2>
        <div className="space-y-4 text-lg text-slate-700">
          <p>
            Travel has become increasingly expensive, and budget airlines have made a science out of extracting ancillary fees through strict baggage policies. A perfectly good trip can be ruined at the gate when you&apos;re forced to gate-check a bag for $75 because it&apos;s half an inch too wide.
          </p>
          <p>
            At the same time, the &quot;just shove it in&quot; method of packing leads to wrinkled clothes, disorganized hotel rooms, and the inevitable realization that you forgot clean socks but packed three unnecessary sweaters.
          </p>
        </div>
      </section>

      {/* Our Solution */}
      <section>
        <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Our Solution</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-brand-olive">Visual Packing</h3>
            <p className="text-slate-700 leading-relaxed">
              We believe in seeing is believing. Instead of guessing, our 2D spatial simulator lets you visualize exactly how different sized packing cubes fit into standard airline carry-on dimensions. It turns packing from a guessing game into a solvable puzzle.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-brand-orange">Habit Forming</h3>
            <p className="text-slate-700 leading-relaxed">
              Good packing is a habit. By using our templates and scoring system, you build muscle memory for exactly what you need for a weekend trip vs a two-week international vacation. Over time, you pack faster, smarter, and lighter.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="border-t border-brand-beige pt-16">
        <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Our Principles</h2>
        <ul className="grid md:grid-cols-3 gap-6">
          <li className="bg-white p-6 rounded-2xl shadow-sm border border-brand-beige">
            <CheckCircle2 className="h-8 w-8 text-brand-olive mb-4" />
            <h4 className="font-bold text-lg mb-2">Privacy First</h4>
            <p className="text-muted-foreground text-sm">Everything runs locally in your browser. We don&apos;t store your packing lists or track your specific trips on external servers.</p>
          </li>
          <li className="bg-white p-6 rounded-2xl shadow-sm border border-brand-beige">
            <CheckCircle2 className="h-8 w-8 text-brand-orange mb-4" />
            <h4 className="font-bold text-lg mb-2">Offline Capable</h4>
            <p className="text-muted-foreground text-sm">Travelers don&apos;t always have internet. Once loaded, our core tools work completely offline as a Progressive Web App.</p>
          </li>
          <li className="bg-white p-6 rounded-2xl shadow-sm border border-brand-beige">
            <CheckCircle2 className="h-8 w-8 text-brand-navy mb-4" />
            <h4 className="font-bold text-lg mb-2">Always Free</h4>
            <p className="text-muted-foreground text-sm">The core calculator and visualizer will always be free to use, supported by unobtrusive, relevant ads and related tools.</p>
          </li>
        </ul>
      </section>

      {/* Ecosystem */}
      <section className="text-center bg-slate-50 p-8 rounded-3xl border border-slate-200">
        <p className="text-muted-foreground mb-6">
          PackFit is proudly built and maintained as part of the <a href="https://alfo.online" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">alfo.online</a> suite of web utilities.
        </p>
        <Link href="/calculator" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-brand-orange text-white hover:bg-brand-orange/90 h-10 px-6 py-2">
          Start Packing
        </Link>
      </section>
    </div>
  );
}
