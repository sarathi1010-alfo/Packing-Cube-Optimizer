"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Cube } from "@/lib/data/schema";
import { X, RotateCw } from "lucide-react";
// import { useState } from "react";

interface CubeItemProps {
  id: string;
  cube: Cube;
  scale: number; // Pixels per cm
  onRemove: (id: string) => void;
  onRotate: (id: string) => void;
  isPlaced: boolean;
  rotated: boolean;
  x?: number;
  y?: number;
}

export function CubeItem({ id, cube, scale, onRemove, onRotate, isPlaced, rotated, x = 0, y = 0 }: CubeItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: { cubeId: cube.id, instanceId: id, rotated },
  });

  const style = {
    // Determine visual dimensions based on rotation
    width: rotated ? cube.dimensions.height * scale : cube.dimensions.width * scale,
    height: rotated ? cube.dimensions.width * scale : cube.dimensions.height * scale,
    transform: CSS.Translate.toString(transform),
    backgroundColor: cube.color,
    opacity: isDragging ? 0.6 : 1,
    left: isPlaced ? x : undefined,
    top: isPlaced ? y : undefined,
    position: isPlaced ? ("absolute" as const) : ("relative" as const),
    zIndex: isDragging ? 50 : 10,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group rounded-sm border-2 border-black/20 shadow-sm flex flex-col items-center justify-center text-center p-1 cursor-grab active:cursor-grabbing hover:border-black/40 transition-colors ${
        isPlaced ? "" : "mb-2"
      }`}
      {...listeners}
      {...attributes}
    >
      <p className="text-[10px] font-bold text-black/70 leading-tight pointer-events-none select-none overflow-hidden line-clamp-2">
        {cube.name}
      </p>

      {/* Controls visible on hover */}
      <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white rounded-full shadow-md border p-0.5 z-20 pointer-events-auto">
        <button
          onClick={(e) => { e.stopPropagation(); onRotate(id); }}
          className="p-1 hover:bg-brand-sand rounded-full text-brand-navy"
          title="Rotate"
        >
          <RotateCw className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(id); }}
          className="p-1 hover:bg-red-100 rounded-full text-red-600"
          title="Remove"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
