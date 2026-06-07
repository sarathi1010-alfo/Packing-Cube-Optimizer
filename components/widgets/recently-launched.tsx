import { Sparkles } from "lucide-react";

export function RecentlyLaunched() {
  const newTools = [
    { name: "Luna Cycle", url: "https://lunacycle.alfo.online" },
    { name: "Font Fusion", url: "https://fontfusion.alfo.online" },
    { name: "Packing Cube Optimizer", url: "https://packingcubeoptimizer.com" },
  ];

  return (
    <div className="w-full bg-brand-sand border-b border-t border-brand-sand/50 overflow-hidden py-2">
      <div className="container mx-auto px-4 flex items-center justify-center gap-4 text-sm whitespace-nowrap overflow-x-auto no-scrollbar">
        <span className="font-bold flex items-center gap-1 text-brand-orange">
          <Sparkles className="w-4 h-4" />
          🆕 Just Launched:
        </span>
        <div className="flex items-center gap-6 text-muted-foreground">
          {newTools.map((tool, index) => (
            <div key={tool.name} className="flex items-center gap-6">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary hover:underline font-medium transition-colors"
              >
                {tool.name}
              </a>
              {index < newTools.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
