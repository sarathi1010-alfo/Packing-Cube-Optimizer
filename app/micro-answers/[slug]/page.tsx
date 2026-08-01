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
      <p>Imagine your suitcase as a giant, empty room. Without furniture, everything ends up in a pile on the floor. Packing cubes are the 'furniture' for your suitcase. They allow you to compartmentalize your belongings by category (e.g., underwear in one cube, t-shirts in another), making it easy to find what you need without unpacking everything. They utilize zippers to keep clothing compressed and secure.</p>

      <h2>Real-World Example in Travel</h2>
      <p>Consider a multi-city European trip. Instead of exploding your suitcase across a small hostel room floor every morning to find a clean shirt, you simply pull out your designated "Tops" packing cube. Your bag remains organized for the entire trip, and repacking takes seconds rather than minutes.</p>

      <h2>Why are packing cubes important?</h2>
      <p>Packing cubes solve the three biggest problems of travel packing: disorganization, wasted volume, and wrinkled clothing. By confining clothes to a smaller footprint, they force you to curate your wardrobe and prevent the chaotic shifting that causes deep creases during transit.</p>

      <h2>Packing Cubes vs Plastic Bags</h2>
      <div class="overflow-x-auto my-6">
        <table class="min-w-full divide-y divide-brand-beige border border-brand-beige rounded-lg">
          <thead class="bg-brand-sand/50">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-semibold text-brand-navy">Feature</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-brand-navy">Packing Cubes</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-brand-navy">Ziploc/Plastic Bags</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-brand-beige">
            <tr>
              <td class="px-4 py-3 text-sm font-medium">Breathability</td>
              <td class="px-4 py-3 text-sm">High (mesh panels prevent odors)</td>
              <td class="px-4 py-3 text-sm">Zero (traps moisture)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-sm font-medium">Durability</td>
              <td class="px-4 py-3 text-sm">Lasts for years (ripstop nylon)</td>
              <td class="px-4 py-3 text-sm">Tears easily, single-use</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-sm font-medium">Compression</td>
              <td class="px-4 py-3 text-sm">Maintains flat, stackable shape</td>
              <td class="px-4 py-3 text-sm">Creates unstackable 'pillows'</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-brand-sand/30 border border-brand-beige rounded-lg p-6 my-8">
        <h3 class="text-lg font-bold text-brand-navy mb-4 mt-0">Core Principles of Packing Cubes</h3>
        <ul class="space-y-2 mb-0">
          <li><strong>Categorization:</strong> Group items logically (e.g., all bottoms in one cube).</li>
          <li><strong>Density:</strong> Roll clothes tightly before placing them in the cube to maximize space.</li>
          <li><strong>Tetris Packing:</strong> Place the largest, heaviest cubes at the bottom of the suitcase near the wheels.</li>
          <li><strong>The Dirty Cube:</strong> Always reserve one empty cube (or wet bag) for dirty laundry.</li>
        </ul>
      </div>

      <p>Ready to try them? Use our <a href="/" class="text-brand-orange underline font-semibold">homepage simulator</a> to see how they fit in your specific bag, and read our <a href="/blog/ultimate-guide-to-packing-cubes" class="text-brand-orange underline font-semibold">Ultimate Guide to Packing Cubes</a> for more details.</p>
    `
  },
  "best-way-to-pack-clothes": {
    title: "What is the best way to pack clothes?",
    description: "Discover the most efficient way to pack clothes to save space and minimize wrinkles.",
    snippet: "The best way to pack clothes is a combination of rolling and using packing cubes. Rolling removes air pockets between layers, while packing cubes maintain that compression and keep your suitcase organized throughout your journey.",
    content: `
      <h2>How Does the Roll and Cube Method Work?</h2>
      <p>While folding is fine for home storage, <strong>rolling</strong> is the undisputed champion for travel. When you fold clothes, you naturally trap air between the layers. When you roll tightly, you squeeze that air out. However, rolls can come undone. By placing these tight rolls into a structured packing cube, you stabilize the items, ensuring they don't unroll or shift when your bag is handled by airport staff.</p>

      <h2>Real-World Example in Travel</h2>
      <p>Imagine packing for a winter trip. A bulky fleece sweater takes up half a carry-on if folded. By tightly rolling the fleece and placing it into a specialized compression packing cube, you can zip away excess air, reducing its footprint by up to 40% and making room for an extra pair of shoes.</p>

      <h2>Why is Packing Efficiency Important?</h2>
      <p>Efficient packing is directly tied to saving money and reducing stress. Airlines are increasingly strict about carry-on dimensions and weight. By packing efficiently, you can avoid forced gate-check fees and the physical strain of dragging oversized, unbalanced luggage through cobblestone streets.</p>

      <h2>Rolling vs. Traditional Folding</h2>
      <div class="overflow-x-auto my-6">
        <table class="min-w-full divide-y divide-brand-beige border border-brand-beige rounded-lg">
          <thead class="bg-brand-sand/50">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-semibold text-brand-navy">Feature</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-brand-navy">Rolling Method</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-brand-navy">Traditional Folding</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-brand-beige">
            <tr>
              <td class="px-4 py-3 text-sm font-medium">Space Efficiency</td>
              <td class="px-4 py-3 text-sm">High (removes air gaps)</td>
              <td class="px-4 py-3 text-sm">Low (traps air)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-sm font-medium">Wrinkle Prevention</td>
              <td class="px-4 py-3 text-sm">Good (prevents hard creases)</td>
              <td class="px-4 py-3 text-sm">Poor (causes deep fold lines)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-sm font-medium">Visibility</td>
              <td class="px-4 py-3 text-sm">Excellent (can see all items at once)</td>
              <td class="px-4 py-3 text-sm">Poor (requires digging through stacks)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-brand-sand/30 border border-brand-beige rounded-lg p-6 my-8">
        <h3 class="text-lg font-bold text-brand-navy mb-4 mt-0">Core Principles of Efficient Packing</h3>
        <ul class="space-y-2 mb-0">
          <li><strong>Roll Soft Fabrics:</strong> T-shirts, underwear, and cotton dresses should always be rolled tightly.</li>
          <li><strong>Fold Structured Garments:</strong> Blazers, stiff jeans, and collared shirts should be folded flat at the base of the suitcase.</li>
          <li><strong>Fill the Gaps:</strong> Stuff socks and small items inside shoes to utilize dead space.</li>
          <li><strong>Heavy Items Low:</strong> Pack shoes and heavy toiletry bags at the bottom (near the wheels) for balance.</li>
        </ul>
      </div>

      <p>Learn more in our <a href="/blog/packing-cubes-vs-rolling-clothes" class="text-brand-orange underline font-semibold">detailed comparison guide</a> and plan your layout using the <a href="/" class="text-brand-orange underline font-semibold">PackFit visualizer</a>.</p>
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
