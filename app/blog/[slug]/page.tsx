import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// In a real app, this would come from a CMS or markdown files.
const POSTS = {
  "avoid-overweight-baggage-fees": {
    title: "How to pack efficiently to avoid overweight baggage fees",
    description: "Learn how to pack efficiently to avoid overweight baggage fees, including tips on weighing luggage, rolling vs. folding, weight distribution, and spatial optimization.",
    date: new Date().toISOString().split('T')[0],
    content: `
      <h2>How to pack efficiently to avoid overweight baggage fees?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">To pack efficiently and avoid fees: weigh your luggage beforehand, use packing cubes for organization, distribute weight evenly, wear your heaviest items on the plane, and use a packing optimizer tool to plan your spatial arrangement.</p>
      </div>

      <p>Overweight baggage fees are the hidden tax of modern travel. Airlines are becoming increasingly strict, with fees often exceeding $100 per bag if you are even a few pounds over the limit. Fortunately, by adopting a strategic approach to packing, you can avoid these fees entirely while still bringing everything you need.</p>

      <h3>1. Know the Rules Before You Pack</h3>
      <p>The first step to avoiding overweight baggage fees is knowing exactly what your airline allows. Different airlines have different weight limits for both carry-on and checked luggage. Don't assume that because your bag was fine on Delta, it will pass on a budget carrier. Check the airline's website or use a reliable <a href="/airlines" class="text-brand-orange underline font-semibold">Airline Rules Database</a>.</p>

      <h3>2. Weigh Your Luggage at Home</h3>
      <p>Never arrive at the airport guessing the weight of your bag. Invest in a small, portable luggage scale. Weigh your bag once it's fully packed. If you're close to the limit, reconsider some items. Remember, you might buy souvenirs, so leave a little buffer if possible.</p>

      <h3>3. Master the Art of Packing: Rolling vs. Folding</h3>
      <p>How you pack can significantly impact how much you can fit and how the weight is distributed. <strong>Rolling your clothes</strong> (especially softer fabrics like t-shirts and underwear) is generally considered the best way to save space and reduce wrinkles. Folding is better for stiffer items like jeans or structured jackets. Experiment to find what works best for your wardrobe.</p>

      <h3>4. Strategic Weight Distribution</h3>
      <p>The way you distribute weight inside your suitcase matters. Place the heaviest items (like shoes, toiletries bags, and heavy jackets) at the bottom of the suitcase (near the wheels). This keeps the bag stable and easier to roll. Lighter items should go towards the top.</p>

      <h3>5. Use Packing Cubes for Organization and Compression</h3>
      <p>Packing cubes are a traveler's best friend. They help organize your belongings, making it easier to find things without unpacking your entire bag. Compression cubes are particularly useful for bulky items like sweaters, as they squeeze out excess air and save valuable space. When you use packing cubes, you naturally start to think more critically about what you're bringing, which can help reduce overall weight.</p>

      <h3>6. Wear Your Heaviest Items</h3>
      <p>If you're traveling to a cold climate and bringing a heavy winter coat, bulky boots, or thick sweaters, wear them on the plane instead of packing them. This instantly removes a significant amount of weight and bulk from your luggage. You can always take off layers once you're on the plane.</p>

      <h3>7. Utilize Technology: The PackFit Optimizer</h3>
      <p>Spatial planning is key to efficient packing. Instead of relying on trial and error, use a visual tool like <a href="/" class="text-brand-orange underline font-semibold">PackFit</a> to map out your luggage. By planning your spatial arrangement beforehand in your <a href="/dashboard" class="text-brand-orange underline font-semibold">Workspace Dashboard</a>, you can ensure everything fits perfectly without overstuffing, which often leads to overweight bags.</p>

      <h3>8. Create an Essential Items Checklist</h3>
      <p>Overpacking usually happens because of \"what if\" scenarios. Counteract this by creating a strict checklist of essential items and sticking to it. If it's not on the list, it doesn't go in the bag. A structured workflow, like the ones provided in a comprehensive packing system, helps reinforce this habit.</p>

      <p>By implementing these strategies, you can take control of your packing process, eliminate the stress of weighing-in at the airport, and ensure you never pay an overweight baggage fee again.</p>
    `
  },
  "how-to-pack-7-day-trip-carry-on": {
    title: "How to pack for a 7-day trip in a carry-on",
    description: "Learn the exact packing cube configuration and folding techniques to fit a full week of clothes into a standard budget airline carry-on without paying extra baggage fees.",
    date: new Date().toISOString().split('T')[0], // Updated last modified date
    content: `
      <p>Traveling with just a carry-on for a 7-day trip is the ultimate travel flex. It means no waiting at the baggage carousel, no lost luggage, and <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">avoiding those dreaded $60+ checked bag fees</a>. The secret? Packing cubes and spatial optimization.</p>

      <h2>1. The 5-4-3-2-1 Rule</h2>
      <p>Before you even touch your suitcase, curate your wardrobe using the classic 5-4-3-2-1 packing method:</p>
      <ul>
        <li><strong>5</strong> pairs of socks & underwear</li>
        <li><strong>4</strong> tops (mix of t-shirts and a nicer shirt)</li>
        <li><strong>3</strong> bottoms (jeans, shorts, dress pants)</li>
        <li><strong>2</strong> pairs of shoes (one worn, one packed)</li>
        <li><strong>1</strong> jacket or sweater</li>
      </ul>

      <h2>2. Choose Your Packing Cubes</h2>
      <p>For a standard 40L carry-on, you want to use the \"Tetris Approach\". We recommend:</p>
      <ul>
        <li><strong>1 Large Compression Cube:</strong> For bulky items like jeans and sweaters.</li>
        <li><strong>2 Medium Standard Cubes:</strong> One for tops, one for bottoms.</li>
        <li><strong>1 Small Tube Cube:</strong> For socks, underwear, and swimsuits.</li>
      </ul>
      <p>Don't guess if this combination will fit. Use our <a href="/calculator" class="text-brand-orange underline font-semibold">Packing Cube Calculator</a> to simulate your exact luggage dimensions.</p>

      <h2>3. Rolling vs. Folding</h2>
      <p>Inside your cubes, <strong>always roll your softer clothes</strong> (t-shirts, cotton dresses, activewear). This prevents wrinkles and maximizes density. For stiffer items like jeans or blazers, fold them flat at the bottom of the compression cube before adding the rolled items on top.</p>

      <h2>4. Airline Specific Dimensions</h2>
      <p>A \"carry-on\" for Delta is not the same as a \"carry-on\" for Ryanair. Budget European airlines have notoriously strict sizers. Always double check your bag's actual measurements (including wheels and handles) against our <a href="/airlines" class="text-brand-orange underline font-semibold">Airline Rules Database</a>. For more in-depth strategies, read our guide on <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">how to pack efficiently to avoid overweight baggage fees</a>.</p>
    `
  }
};

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = POSTS[resolvedParams.slug as keyof typeof POSTS];

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Packing Cube Optimizer`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = POSTS[resolvedParams.slug as keyof typeof POSTS];

  if (!post) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Link href="/blog">
          <Button variant="outline">Return to Blog</Button>
        </Link>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "PackFit"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PackFit",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/favicon.ico`
      }
    }
  };

  return (
    <article className="container max-w-3xl py-12 px-4 mx-auto">
      <JsonLd data={articleSchema} />
      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-orange mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
        </Link>
        <div className="text-brand-orange font-semibold text-sm tracking-wider uppercase mb-3">Guide</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy leading-tight mb-4">
          {post.title}
        </h1>
        <div className="text-muted-foreground text-sm">
          Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div
        className="prose prose-lg prose-slate max-w-none prose-headings:text-brand-navy prose-a:text-brand-orange hover:prose-a:text-brand-orange/80"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-16 bg-brand-sand/30 border border-brand-beige rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-brand-navy mb-3">Ready to pack?</h3>
        <p className="text-muted-foreground mb-6">See exactly how your clothes will fit in your bag before you even pull your suitcase out of the closet.</p>
        <Link href="/simulator">
          <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8">
            Try the Visual Simulator
          </Button>
        </Link>
      </div>
    </article>
  );
}
