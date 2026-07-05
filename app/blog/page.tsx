import { Metadata } from "next";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Packing Guides & Blog | Packing Cube Optimizer",
  description: "Learn how to pack smarter, travel lighter, and fit more in your carry-on with our expert packing guides.",
};

const POSTS = [
  {
    slug: "avoid-overweight-baggage-fees",
    title: "How to pack efficiently to avoid overweight baggage fees",
    excerpt: "Stop paying the 'hidden travel tax'. Learn 8 expert strategies to pack efficiently, distribute weight strategically, and use spatial optimization to beat the baggage scale every time.",
    date: "2025-01-24",
    category: "Guides"
  },
  {
    slug: "how-to-pack-7-day-trip-carry-on",
    title: "How to pack for a 7-day trip in a carry-on",
    excerpt: "Learn the exact packing cube configuration and folding techniques to fit a full week of clothes into a standard budget airline carry-on without paying extra baggage fees.",
    date: "2025-01-15",
    category: "Guides"
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
