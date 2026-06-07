import Link from "next/link";
import { PlaneTakeoff } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-brand-sand/30 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <PlaneTakeoff className="h-6 w-6 text-brand-orange" />
            <span>CubeOptimizer</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Pack smarter, fit more, travel lighter. The ultimate visual packing planner.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Tools</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/calculator" className="hover:text-primary transition-colors">Packing Calculator</Link></li>
            <li><Link href="/carry-on-checker" className="hover:text-primary transition-colors">Carry-On Checker</Link></li>
            <li><Link href="/simulator" className="hover:text-primary transition-colors">Visual Simulator</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/airlines" className="hover:text-primary transition-colors">Airline Baggage Rules</Link></li>
            <li><Link href="/templates" className="hover:text-primary transition-colors">Packing Templates</Link></li>
            <li><Link href="/guides" className="hover:text-primary transition-colors">Travel Guides</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Legal & Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Packing Cube Optimizer. All rights reserved.</p>
      </div>
    </footer>
  );
}
