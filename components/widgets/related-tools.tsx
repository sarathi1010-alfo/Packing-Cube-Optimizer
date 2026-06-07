import { ArrowRight } from "lucide-react";

export function RelatedTools() {
  const tools = [
    {
      name: "Resume Forge",
      description: "Create professional resumes formatted perfectly for ATS systems.",
      url: "https://resumeforge.alfo.online",
      tag: "Career"
    },
    {
      name: "QR Generator",
      description: "Instantly generate custom QR codes for menus, wifi, and links.",
      url: "https://qrgenerator.alfo.online",
      tag: "Utility"
    },
    {
      name: "Palette Flow",
      description: "Extract, generate, and explore beautiful color palettes.",
      url: "https://paletteflow.alfo.online",
      tag: "Design"
    },
    {
      name: "PDF Utility",
      description: "Merge, compress, and edit PDF files entirely in your browser.",
      url: "https://pdfutility.app",
      tag: "Productivity"
    }
  ];

  return (
    <section className="py-12 border-t bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">You might also need:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-all hover:border-primary/50"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full uppercase tracking-wider">
                  {tool.tag}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {tool.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
