"use client";

import { useDroppable } from "@dnd-kit/core";
import { Airline } from "@/lib/data/schema";

interface SuitcaseCanvasProps {
  airline: Airline;
  scale: number; // Pixels per cm
  children: React.ReactNode;
}

export function SuitcaseCanvas({ airline, scale, children }: SuitcaseCanvasProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "suitcase-canvas",
  });

  // Calculate pixel dimensions of the suitcase based on airline limits
  const widthPx = airline.carryOn.width * scale;
  const heightPx = airline.carryOn.height * scale;

  return (
    <div className="flex flex-col items-center justify-center bg-brand-sand/10 rounded-2xl p-8 border border-brand-beige">
      <div className="mb-4 text-center">
        <h3 className="font-semibold text-brand-navy">{airline.name} Cabin Bag</h3>
        <p className="text-sm text-muted-foreground">
          {airline.carryOn.height} x {airline.carryOn.width} cm limit
        </p>
      </div>

      {/* The actual drop zone */}
      <div
        ref={setNodeRef}
        style={{ width: widthPx, height: heightPx }}
        className={`relative rounded-3xl border-4 transition-colors shadow-inner overflow-hidden
          ${isOver ? "border-brand-orange bg-brand-orange/5" : "border-brand-navy/30 bg-white"}
        `}
      >
        {/* Visual grid pattern for snapping appearance */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: `${10 * scale}px ${10 * scale}px` // 10cm grid
          }}
        />

        {/* Rendered placed cubes */}
        {children}
      </div>

      <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
         <div className="flex items-center gap-1"><span className="w-3 h-3 bg-white border inline-block"></span> Empty Space</div>
         <div className="flex items-center gap-1"><span className="w-3 h-3 bg-brand-orange border inline-block"></span> Cubes</div>
      </div>
    </div>
  );
}
