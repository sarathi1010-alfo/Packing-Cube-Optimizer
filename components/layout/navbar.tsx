import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaneTakeoff, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <PlaneTakeoff className="h-6 w-6 text-brand-orange" />
          <span>CubeOptimizer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/calculator" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Calculator
          </Link>
          <Link href="/airlines" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Airlines
          </Link>
          <Link href="/templates" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Templates
          </Link>
          <Link href="/calculator">
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
              Start Packing
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/calculator" className="text-lg font-medium">
                  Calculator
                </Link>
                <Link href="/airlines" className="text-lg font-medium">
                  Airlines
                </Link>
                <Link href="/templates" className="text-lg font-medium">
                  Templates
                </Link>
                <Link href="/calculator" className="mt-4">
                  <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white w-full">
                    Start Packing
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
