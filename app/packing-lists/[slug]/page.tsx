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
  "weekend-getaway": {
    title: "Weekend Getaway Packing List",
    description: "The ultimate minimalist packing list for a quick weekend getaway. Fit everything into a personal item and skip the overhead bin.",
    content: `
      <h2>How to pack for a quick weekend getaway?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">Pack for a weekend getaway by using a single personal item-sized bag, packing just two versatile outfits, using one small packing cube for clothing and a clear TSA-approved bag for toiletries.</p>
      </div>
      <p>A weekend trip shouldn't require a large suitcase. The goal is to travel 'Personal Item Only' to breeze through the airport. Stick to a strict limit: the clothes on your back, one extra outfit, sleepwear, and basic toiletries.</p>
    `,
    faqs: [
      {
        question: "Can I pack for a weekend in just a backpack?",
        answer: "Absolutely. A standard 25L to 30L backpack is plenty of space for 2-3 days if you roll your clothes and use a small packing cube to organize them."
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

export default async function PackingListPage({ params }: PageProps) {
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
        <div className="text-brand-orange font-semibold text-sm tracking-wider uppercase mb-3">Packing List</div>
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
        <p className="text-muted-foreground mb-6">Plan your exact luggage arrangement for this trip with our free tool.</p>
        <Link href="/simulator">
          <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8">
            Try the Visual Simulator
          </Button>
        </Link>
      </div>
    </article>
  );
}