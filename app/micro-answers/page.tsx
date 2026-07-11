import { Metadata } from "next";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Packing Questions & Micro-Answers | PackFit",
  description: "Quick, expert answers to your most common travel packing questions. Optimized for featured snippets and voice search.",
};

const ANSWERS = [
  {
    slug: "what-are-packing-cubes",
    title: "What are packing cubes?",
    excerpt: "The fundamental tool for organized travel. Learn exactly what they are and why you need them.",
    category: "Basics"
  },
  {
    slug: "best-way-to-pack-clothes",
    title: "What is the best way to pack clothes?",
    excerpt: "Comparing rolling, folding, and bundling to find the ultimate space-saving technique.",
    category: "Techniques"
  }
];

export default function MicroAnswersIndexPage() {
  return (
    <div className="container max-w-4xl py-12 px-4 mx-auto">
      <div className="text-center space-y-4 mb-16">
        <div className="flex justify-center mb-4">
          <div className="bg-brand-orange/10 p-3 rounded-full">
            <HelpCircle className="w-8 h-8 text-brand-orange" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-navy">Quick Packing Answers</h1>
        <p className="text-xl text-muted-foreground">Direct answers to your most common travel questions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ANSWERS.map((answer) => (
          <Link key={answer.slug} href={`/micro-answers/${answer.slug}`}>
            <Card className="hover:shadow-md transition-all h-full border-brand-beige group cursor-pointer">
              <CardHeader>
                <div className="text-xs font-semibold text-brand-orange mb-2 uppercase tracking-wider">{answer.category}</div>
                <CardTitle className="group-hover:text-primary transition-colors text-xl">{answer.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm line-clamp-2">
                  {answer.excerpt}
                </CardDescription>
                <span className="text-sm font-medium text-brand-navy flex items-center mt-4 group-hover:underline">
                  Read answer <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
