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
  "asia-packing-guide": {
    title: "Asia Packing Guide: What to Bring",
    description: "A comprehensive packing guide for traveling to Asia, covering everything from humid climates and temple dress codes to tech essentials.",
    content: `
      <h2>How to pack for a trip to Asia?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">When packing for Asia, prioritize ultra-breathable, moisture-wicking clothing for humidity, slip-on shoes for temple visits, a modest outfit that covers shoulders and knees, and a robust universal power adapter.</p>
      </div>
      <p>Traveling across Asia often means navigating diverse climates, from the sweltering heat of Southeast Asia to the crisp mountain air in parts of East Asia. The key is lightweight versatility. Roll your clothes to save space and organize them by outfit or function using standard packing cubes.</p>
    `,
    faqs: [
      {
        question: "What should I wear to visit temples in Asia?",
        answer: "Most temples require modest dress. You must cover your shoulders and knees. Pack a lightweight scarf or sarong to drape over your shoulders, and wear loose linen pants or a long skirt. Slip-on shoes are essential as you'll need to remove them frequently."
      },
      {
        question: "Do I need a mosquito net?",
        answer: "Unless you are trekking in very remote jungles, most accommodations provide nets if necessary. Instead, focus on packing a high-quality DEET or Picaridin insect repellent."
      }
    ]
  },
  "europe-packing-guide": {
    title: "Europe Packing Guide: Essentials and Tips",
    description: "Learn how to pack for Europe like a pro. Tips on blending in, avoiding cobblestone catastrophes, and traveling light.",
    content: `
      <h2>What are the essentials for packing for Europe?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">Essential items for Europe include a comfortable pair of stylish walking shoes, a versatile capsule wardrobe in neutral colors, a secure cross-body bag for anti-theft, and a travel adapter for EU/UK outlets.</p>
      </div>
      <p>Europe is best explored with a carry-on. Trains have limited luggage space, and dragging heavy bags over cobblestones is a quick way to ruin your trip. Focus on a capsule wardrobe—items that easily mix and match—and use compression packing cubes to fit it all into a 40L backpack or small roller.</p>
    `,
    faqs: [
      {
        question: "What kind of shoes should I pack for Europe?",
        answer: "Comfort is king. Bring a stylish but highly supportive walking shoe or sneaker. Avoid high heels completely due to cobblestone streets. Bring a second, slightly dressier pair of flats or loafers for evenings."
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

export default async function DestinationPage({ params }: PageProps) {
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
        <div className="text-brand-orange font-semibold text-sm tracking-wider uppercase mb-3">Destination Guide</div>
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
        <p className="text-muted-foreground mb-6">Plan your exact luggage arrangement for this destination with our free tool.</p>
        <Link href="/simulator">
          <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8">
            Try the Visual Simulator
          </Button>
        </Link>
      </div>
    </article>
  );
}