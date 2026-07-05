import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";


interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PAGES = {
  "backpacking-europe": {
    title: "Backpacking Europe Packing Guide",
    description: "The ultimate packing guide for backpacking across Europe, featuring lightweight essentials, capsule wardrobes, and packing cube optimization strategies.",
    content: `
      <h2>How to pack for backpacking in Europe?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">To pack for backpacking in Europe, prioritize a lightweight 40L travel backpack, use compression packing cubes for space efficiency, build a capsule wardrobe with versatile, quick-dry fabrics, and rely on our tool to simulate your pack layout.</p>
      </div>
      <p>Backpacking Europe requires a strategic approach to packing to avoid dragging a heavy suitcase across cobblestone streets. Opt for a carry-on size backpack to save on budget airline fees and maximize mobility. Pack layerable clothing, comfortable walking shoes, and use packing cubes to compartmentalize your gear.</p>
    `,
    faqs: [
      {
        question: "What size backpack is best for Europe?",
        answer: "A 40L to 45L travel backpack is generally considered the best size. It fits most airline carry-on limits and is manageable to carry for extended periods."
      },
      {
        question: "Do I need packing cubes for backpacking?",
        answer: "Yes, packing cubes are essential for backpacking. They keep your backpack organized, compress clothing to save space, and make finding specific items much easier without unpacking everything."
      }
    ]
  },
  "beach-vacation": {
    title: "Beach Vacation Packing Guide",
    description: "Everything you need to pack for a perfect beach vacation, from swimwear and sun protection to evening resort wear.",
    content: `
      <h2>What should you pack for a beach vacation?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">For a beach vacation, pack multiple swimsuits, lightweight cover-ups, reef-safe sunscreen, a packable sun hat, polarized sunglasses, and breathable evening wear, organized using medium standard packing cubes.</p>
      </div>
      <p>Packing for the beach is all about lightweight fabrics and sun protection. Roll your beachwear and use standard packing cubes. Don't forget a dedicated wet bag or water-resistant cube for damp swimsuits on your journey home.</p>
    `,
    faqs: [
      {
        question: "How many swimsuits should I pack?",
        answer: "For a typical week-long beach vacation, packing 2 to 3 swimsuits is ideal so you always have a dry one to wear."
      }
    ]
  },
  "business-trip": {
    title: "Business Trip Packing Guide",
    description: "Streamline your business travel packing with tips on keeping suits wrinkle-free, organizing tech accessories, and traveling carry-on only.",
    content: `
      <h2>How to pack efficiently for a business trip?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">Efficient business trip packing involves using a garment folder for dress shirts, a tube cube for ties and belts, a dedicated tech organizer for chargers, and prioritizing a carry-on to skip the baggage carousel.</p>
      </div>
      <p>Business travel demands efficiency. Utilize structured packing cubes to keep professional attire wrinkle-free. Always pack your essential tech and documents in an easily accessible personal item.</p>
    `,
    faqs: [
      {
        question: "How do I pack a suit without wrinkling it?",
        answer: "Use a dedicated garment folder or the 'roll and fold' method. Place the suit jacket in a dry-cleaning bag before folding to reduce friction and wrinkles."
      }
    ]
  },
  "winter-ski-trip": {
    title: "Winter Ski Trip Packing Guide",
    description: "Master the art of packing bulky winter gear and ski clothing without paying oversized baggage fees.",
    content: `
      <h2>How to pack bulky gear for a winter ski trip?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">To pack for a ski trip, use large compression cubes for bulky base layers and sweaters, rent heavy gear at the destination if possible, and wear your bulkiest winter coat on the plane.</p>
      </div>
      <p>Winter trips are notoriously difficult to pack for due to the sheer volume of the clothing. Compression packing cubes are absolutely mandatory here to squeeze the air out of fleeces and base layers.</p>
    `,
    faqs: [
      {
        question: "Should I rent or bring my own ski gear?",
        answer: "If you ski infrequently, renting skis and boots at the resort saves massive baggage fees and hassle. Always bring your own well-fitting base layers and goggles."
      }
    ]
  },
  "camping-hiking": {
    title: "Camping & Hiking Packing Guide",
    description: "Essential packing strategies for camping and hiking trips, focusing on ultralight gear and weatherproof clothing.",
    content: `
      <h2>What are the packing essentials for camping and hiking?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">For camping and hiking, prioritize moisture-wicking layers, a reliable waterproof shell, sturdy footwear, a first-aid kit, and use ultralight dry sacks or weather-resistant cubes for organization.</p>
      </div>
      <p>When heading into the outdoors, every ounce matters. Focus on synthetic or merino wool layers that dry quickly and resist odors.</p>
    `,
    faqs: [
      {
        question: "How do I organize my hiking backpack?",
        answer: "Place heavy items like food and water close to your back and centered. Use colored packing cubes or dry bags to separate camp clothes, trail clothes, and sleeping gear."
      }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const page = PAGES[resolvedParams.slug as keyof typeof PAGES];

  if (!page) {
    return { title: "Page Not Found" };
  }

  return {
    title: `${page.title} | PackFit`,
    description: page.description,
  };
}

export default async function TripTypePage({ params }: PageProps) {
  const resolvedParams = await params;
  const page = PAGES[resolvedParams.slug as keyof typeof PAGES];

  if (!page) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Page not found</h1>
        <Link href="/">
          <Button variant="outline">Return Home</Button>
        </Link>
      </div>
    );
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <article className="container max-w-3xl py-12 px-4 mx-auto">
      <JsonLd data={faqSchema} />
      {/* Last Published: 2025-01-24 */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-orange mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        <div className="text-brand-orange font-semibold text-sm tracking-wider uppercase mb-3">Trip Type Guide</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy leading-tight mb-4">
          {page.title}
        </h1>
      </div>

      <div
        className="prose prose-lg prose-slate max-w-none prose-headings:text-brand-navy prose-a:text-brand-orange hover:prose-a:text-brand-orange/80"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />

      <div className="mt-12">
         <h2 className="text-2xl font-bold text-brand-navy mb-6">Frequently Asked Questions</h2>
         <div className="space-y-6">
            {page.faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
            ))}
         </div>
      </div>

      <div className="mt-16 bg-brand-sand/30 border border-brand-beige rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-brand-navy mb-3">Optimize your spatial planning</h3>
        <p className="text-muted-foreground mb-6">Plan your exact luggage arrangement for this trip type with our free tool.</p>
        <Link href="/simulator">
          <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8">
            Try the Visual Simulator
          </Button>
        </Link>
      </div>
    </article>
  );
}
