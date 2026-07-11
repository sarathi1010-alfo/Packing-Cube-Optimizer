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

const ANSWERS = {
  "what-are-packing-cubes": {
    title: "What are packing cubes?",
    description: "A quick guide explaining what packing cubes are and how they help organize your travel luggage.",
    snippet: "Packing cubes are small fabric containers used to organize and compress clothing inside a suitcase or backpack. They act like 'drawers' for your luggage, keeping categories of items separate and preventing shifting during transit.",
    content: `
      <h2>How do packing cubes work?</h2>
      <p>Imagine your suitcase as a giant, empty room. Without furniture, everything ends up in a pile on the floor. Packing cubes are the 'furniture' for your suitcase. They allow you to compartmentalize your belongings by category (e.g., underwear in one, t-shirts in another), making it easy to find what you need without unpacking everything.</p>

      <h2>Top 3 Benefits of Packing Cubes</h2>
      <ul>
        <li><strong>Organization:</strong> No more digging through a messy bag to find a single pair of socks.</li>
        <li><strong>Space Saving:</strong> Compression versions can reduce clothing volume by up to 40%.</li>
        <li><strong>Wrinkle Prevention:</strong> By keeping clothes stationary, they reduce the friction that causes deep creases.</li>
      </ul>

      <p>Ready to try them? Use our <a href="/" class="text-brand-orange underline font-semibold">homepage simulator</a> to see how they fit in your specific bag.</p>
    `
  },
  "best-way-to-pack-clothes": {
    title: "What is the best way to pack clothes?",
    description: "Discover the most efficient way to pack clothes to save space and minimize wrinkles.",
    snippet: "The best way to pack clothes is a combination of rolling and using packing cubes. Rolling removes air pockets between layers, while packing cubes maintain that compression and keep your suitcase organized throughout your journey.",
    content: `
      <h2>Rolling vs. Folding: Which wins?</h2>
      <p>While folding is fine for home storage, <strong>rolling</strong> is the undisputed champion for travel. Tight rolls are more space-efficient and less prone to wrinkles than traditional flat folds. When combined with packing cubes, this method allows for the highest density of packing possible.</p>

      <h3>Why this works:</h3>
      <p>When you fold clothes, you naturally trap air between the layers. When you roll tightly, you squeeze that air out. Placing these rolls into a packing cube further stabilizes the items, ensuring they don't unroll or shift when your bag is handled by airport staff.</p>

      <p>Learn more in our <a href="/blog/packing-cubes-vs-rolling-clothes" class="text-brand-orange underline font-semibold">detailed comparison guide</a>.</p>
    `
  }
};

export function generateStaticParams() {
  return Object.keys(ANSWERS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const answer = ANSWERS[resolvedParams.slug as keyof typeof ANSWERS];

  if (!answer) {
    return { title: "Answer Not Found" };
  }

  return {
    title: `${answer.title} | PackFit Quick Answers`,
    description: answer.description,
  };
}

export default async function MicroAnswerPage({ params }: PageProps) {
  const resolvedParams = await params;
  const answer = ANSWERS[resolvedParams.slug as keyof typeof ANSWERS];

  if (!answer) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Answer not found</h1>
        <Link href="/micro-answers">
          <Button variant="outline">Back to All Answers</Button>
        </Link>
      </div>
    );
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": answer.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer.snippet
      }
    }]
  };

  return (
    <article className="container max-w-2xl py-12 px-4 mx-auto">
      <JsonLd data={faqSchema} />
      <div className="mb-8">
        <Link href="/micro-answers" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-orange mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> All Quick Answers
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-navy leading-tight mb-6">
          {answer.title}
        </h1>

        <div className="bg-brand-sand/40 border-l-4 border-brand-orange p-6 rounded-r-xl mb-8">
          <p className="text-lg font-medium text-brand-navy leading-relaxed m-0 italic">
            &ldquo;{answer.snippet}&rdquo;
          </p>
        </div>
      </div>

      <div
        className="prose prose-slate max-w-none prose-headings:text-brand-navy prose-a:text-brand-orange hover:prose-a:text-brand-orange/80"
        dangerouslySetInnerHTML={{ __html: answer.content }}
      />

      <div className="mt-12 pt-8 border-t border-brand-beige">
        <p className="text-sm text-muted-foreground italic">Last modified: July 11, 2026</p>
      </div>
    </article>
  );
}
