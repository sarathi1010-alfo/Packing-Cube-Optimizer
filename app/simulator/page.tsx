import { Simulator } from "@/components/simulator";
import { Info } from "lucide-react";

export default function SimulatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-navy">Visual Packing Simulator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Drag and drop packing cubes into a digital suitcase perfectly scaled to your airline&#39;s carry-on limits.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-10 bg-brand-sand/30 p-4 rounded-xl border border-brand-beige flex items-start gap-3">
        <Info className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
        <p className="text-sm text-brand-navy">
          <strong>Beta Tool:</strong> This 2D simulator provides a visual approximation of fit based on length and width. Real-world packing flexibility (squishing) and depth variations are not perfectly represented. Use this as a strong visual guide!
        </p>
      </div>

      <Simulator />
    </div>
  );
}
