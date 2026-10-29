import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, LayoutTemplate, ArrowRight, CheckCircle2, Luggage, Layers, Sparkles, Scale } from "lucide-react";
import { RelatedTools } from "@/components/widgets/related-tools";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PackFit",
    url: "https://packfit.alfo.online/",
    description: "Free packing cube optimizer and luggage space calculator. Maximize your carry-on capacity, fit more clothes, and pack smarter for every journey.",
    applicationCategory: "TravelApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does a packing cube optimizer help me fit more in my luggage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A packing cube optimizer calculates the exact volume and dimensions of your suitcase or backpack and matches them with modular compression packing cubes. By organizing clothing by density and rolling garments into structured cubes, it eliminates wasted space and prevents overpacking.",
        },
      },
      {
        "@type": "Question",
        name: "Are packing cubes allowed in carry-on baggage on all airlines?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, packing cubes are standard fabric organizers accepted by all major airlines including Ryanair, EasyJet, Delta, and United. They fit inside standard carry-on bags and personal items without violating airline baggage policies.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between compression packing cubes and standard cubes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standard packing cubes organize items into compartments, whereas compression packing cubes feature a secondary perimeter zipper that compresses bulky items like sweaters and jackets by up to 40% in volume.",
        },
      },
      {
        "@type": "Question",
        name: "How do I choose the right size packing cubes for a carry-on suitcase?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For a standard 22x14x9 inch carry-on bag (35-45L capacity), an optimal set typically includes one medium cube for tops, one medium cube for bottoms, and two small cubes for underwear and electronics accessories.",
        },
      },
      {
        "@type": "Question",
        name: "Does using packing cubes increase my bag weight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ultralight ripstop nylon packing cubes weigh less than 2 to 3 ounces each. The negligible weight is heavily outweighed by the efficiency and space savings they provide.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Optimize Luggage Space with Packing Cubes",
    description: "Step-by-step guide to calculating bag capacity, arranging compression cubes, and maximizing carry-on space.",
    step: [
      {
        "@type": "HowToStep",
        name: "Select Luggage Dimensions",
        text: "Choose your suitcase type, carry-on specs, or enter custom dimensions in centimeters or inches.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Input Clothing & Gear",
        text: "Add your trip duration, climate, and clothing essentials to calculate required packing capacity.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Simulate Cube Layout",
        text: "Use visual drag-and-drop or algorithmic fitting to arrange cubes and eliminate empty voids.",
        position: 3,
      },
      {
        "@type": "HowToStep",
        name: "Pack & Weigh",
        text: "Follow the optimized packing sequence and verify total weight against airline limits before departure.",
        position: 4,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://packfit.alfo.online/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Packing Calculator",
        item: "https://packfit.alfo.online/calculator",
      },
    ],
  },
];

const faqs = [
  {
    q: "How does a packing cube optimizer help me fit more in my luggage?",
    a: "A packing cube optimizer calculates the exact volume and dimensions of your suitcase or backpack and matches them with modular compression packing cubes. By organizing clothing by density and rolling garments into structured cubes, it eliminates wasted space and prevents overpacking.",
  },
  {
    q: "Are packing cubes allowed in carry-on baggage on all airlines?",
    a: "Yes, packing cubes are standard fabric organizers accepted by all major airlines including Ryanair, EasyJet, Delta, and United. They fit inside standard carry-on bags and personal items without violating airline baggage policies.",
  },
  {
    q: "What is the difference between compression packing cubes and standard cubes?",
    a: "Standard packing cubes organize items into compartments, whereas compression packing cubes feature a secondary perimeter zipper that compresses bulky items like sweaters and jackets by up to 40% in volume.",
  },
  {
    q: "How do I choose the right size packing cubes for a carry-on suitcase?",
    a: "For a standard 22x14x9 inch carry-on bag (35-45L capacity), an optimal set typically includes one medium cube for tops, one medium cube for bottoms, and two small cubes for underwear and electronics accessories.",
  },
  {
    q: "Does using packing cubes increase my bag weight?",
    a: "Ultralight ripstop nylon packing cubes weigh less than 2 to 3 ounces each. The negligible weight is heavily outweighed by the efficiency and space savings they provide.",
  },
];

const steps = [
  {
    step: "01",
    title: "Select Luggage Dimensions",
    description: "Choose your suitcase type, carry-on specs, or enter custom dimensions in centimeters or inches.",
    icon: Luggage,
  },
  {
    step: "02",
    title: "Input Clothing & Gear",
    description: "Add your trip duration, climate, and clothing essentials to calculate required packing capacity.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Simulate Cube Layout",
    description: "Use visual drag-and-drop or algorithmic fitting to arrange cubes and eliminate empty voids.",
    icon: Sparkles,
  },
  {
    step: "04",
    title: "Pack & Weigh",
    description: "Follow the optimized packing sequence and verify total weight against airline limits before departure.",
    icon: Scale,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-sand/50 to-background pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-brand-olive/30 bg-brand-olive/10 px-3 py-1 text-sm font-medium text-brand-olive mb-4">
            <span className="flex h-2 w-2 rounded-full bg-brand-olive mr-2"></span>
            Smart Packing Assistant & Space Planner
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-navy max-w-4xl mx-auto leading-tight">
            Packing Cube Optimizer & Luggage Space Calculator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            PackFit is the free packing cube optimizer that transforms cluttered suitcases into organized, space-efficient travel systems. Calculate exact luggage volume, simulate modular cube arrangements, and fit up to 40% more clothing in your carry-on while staying strictly within airline size and weight limits.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="h-14 min-h-[44px] px-8 text-lg bg-brand-navy hover:bg-brand-navy/90 text-white rounded-full w-full sm:w-auto shadow-xl">
                Open My Workspace <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/templates" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-14 min-h-[44px] px-8 text-lg rounded-full w-full sm:w-auto border-brand-beige hover:bg-brand-sand/50">
                Explore Scenarios
              </Button>
            </Link>
          </div>
          <div className="pt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-olive" /> No signup required</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-olive" /> 100% Free to use</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-olive" /> Visual Drag & Drop</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background border-t border-brand-beige">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">How It Works: 4-Step Packing System</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow our proven sequential optimization process to organize every cube and travel without stress.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="p-6 rounded-xl border border-brand-beige bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-2.5 py-1 bg-brand-orange/10 text-brand-orange rounded-full">
                        Step {item.step}
                      </span>
                      <Icon className="w-6 h-6 text-brand-navy" />
                    </div>
                    <h3 className="font-bold text-lg text-brand-navy mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-brand-sand/10 border-t border-brand-beige">
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
                <Link href="/dashboard" className="text-brand-orange font-medium flex items-center hover:underline min-h-[44px]">
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
                <Link href="/templates" className="text-brand-olive font-medium flex items-center hover:underline min-h-[44px]">
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
                <Link href="/dashboard" className="text-brand-orange font-medium flex items-center hover:underline min-h-[44px]">
                  Start Packing <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-background border-t border-brand-beige">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-base">Expert answers to common packing cube and carry-on optimization questions.</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6 rounded-xl border border-brand-beige bg-white shadow-sm space-y-2">
                <h3 className="text-lg font-bold text-brand-navy">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedTools />
    </div>
  );
}
