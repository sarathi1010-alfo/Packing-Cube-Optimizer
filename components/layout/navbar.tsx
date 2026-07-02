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
          <div className="group relative">
            <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              Related Tools ▾
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 rounded-md border bg-popover text-popover-foreground shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="p-2 flex flex-col gap-1">
                <a href="https://resumeforge.alfo.online" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm">Resume Forge</a>
                <a href="https://qrgenerator.alfo.online" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm">QR Generator</a>
                <a href="https://paletteflow.alfo.online" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm">Palette Flow</a>
                <a href="https://pdfutility.app" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm">PDF Utility</a>
                <a href="https://lunacycle.alfo.online" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm">Luna Cycle</a>
              </div>
            </div>
          </div>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            About
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
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              }
            />
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/blog" className="text-lg font-medium">
                  Blog
                </Link>
                <Link href="/about" className="text-lg font-medium">
                  About
                </Link>
                <div className="pt-4 border-t">
                  <span className="text-sm font-semibold text-muted-foreground mb-2 block">Related Tools</span>
                  <div className="flex flex-col gap-2">
                    <a href="https://resumeforge.alfo.online" target="_blank" rel="noopener noreferrer" className="text-muted-foreground">Resume Forge</a>
                    <a href="https://qrgenerator.alfo.online" target="_blank" rel="noopener noreferrer" className="text-muted-foreground">QR Generator</a>
                    <a href="https://paletteflow.alfo.online" target="_blank" rel="noopener noreferrer" className="text-muted-foreground">Palette Flow</a>
                    <a href="https://pdfutility.app" target="_blank" rel="noopener noreferrer" className="text-muted-foreground">PDF Utility</a>
                  </div>
                </div>
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
      <div className="w-full bg-brand-sand/50 text-center py-1 text-[10px] text-muted-foreground border-b uppercase tracking-widest">
        Powered by <a href="https://alfo.online" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">alfo.online</a>
      </div>
    </header>
  );
}
