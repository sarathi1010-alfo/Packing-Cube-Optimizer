import { Metadata } from "next";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Packing Guides & Blog | Packing Cube Optimizer", // Published: 2026-07-13
  description: "Learn how to pack smarter, travel lighter, and fit more in your carry-on with our expert packing guides.",
};

const POSTS = [
  {
    slug: "avoid-overweight-baggage-fees",
    title: "How to pack efficiently to avoid overweight baggage fees",
    excerpt: "Stop paying the hidden travel tax. Learn expert strategies to pack efficiently, optimize your luggage space, and stay under the weight limit every time.",
    date: "2026-07-16",
    category: "Guides"
  },
  {
    slug: "how-to-pack-7-day-trip-carry-on",
    title: "How to pack for a 7-day trip in a carry-on",
    excerpt: "Learn the exact packing cube configuration and folding techniques to fit a full week of clothes into a standard budget airline carry-on without paying extra baggage fees.",
    date: "2026-07-14",
    category: "Guides"
  },
  {
    slug: "ultimate-guide-to-packing-cubes",
    title: "The Ultimate Guide to Packing Cubes in 2026",
    excerpt: "Everything you need to know about packing cubes. From compression vs. standard to the best materials and configurations for every suitcase size.",
    date: "2026-07-14",
    category: "Pillar"
  },
  {
    slug: "packing-cubes-vs-rolling-clothes",
    title: "Packing Cubes vs Rolling Clothes: Which is Better?",
    excerpt: "We compare the two most popular space-saving techniques. Discover which method actually saves more space and keeps your clothes wrinkle-free.",
    date: "2026-07-11",
    category: "Comparison"
  },
  {
    slug: "packing-cubes-vs-folding",
    title: "Packing Cubes vs Folding: The Efficiency Showdown",
    excerpt: "Is it worth the extra step? We analyze the efficiency of packing cubes versus traditional folding to help you decide for your next trip.",
    date: "2026-07-11",
    category: "Comparison"
  }
];

export default function BlogIndexPage() {
  return (
    <div className="container max-w-4xl py-12 px-4 mx-auto">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-navy">Packing Guides & Tips</h1>
        <p className="text-xl text-muted-foreground">Expert strategies to optimize your luggage space.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="hover:shadow-md transition-all h-full border-brand-beige group cursor-pointer">
              <CardHeader>
                <div className="text-sm font-semibold text-brand-orange mb-2 uppercase tracking-wider">{post.category} • {new Date(post.date).toLocaleDateString()}</div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base line-clamp-3 mb-6">
                  {post.excerpt}
                </CardDescription>
                <span className="text-sm font-medium text-brand-navy flex items-center group-hover:underline">
                  Read article <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
