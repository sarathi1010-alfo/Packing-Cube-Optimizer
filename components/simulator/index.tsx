"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { Cube } from "@/lib/data/schema";
import { getAirlines, getCubes } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SuitcaseCanvas } from "./SuitcaseCanvas";
import { CubeItem } from "./CubeItem";
import { Box, RefreshCcw } from "lucide-react";

interface PlacedCube {
  instanceId: string;
  cube: Cube;
  x: number;
  y: number;
  rotated: boolean;
}

const SCALE = 7; // 1 cm = 7 pixels. E.g. 55cm height = 385px.

export function Simulator() {
  const airlines = getAirlines();
  const allCubes = getCubes();

  const [selectedAirlineId, setSelectedAirlineId] = useState(airlines[0].id);
  const [placedCubes, setPlacedCubes] = useState<PlacedCube[]>([]);

  // We use instance IDs because users can place multiple of the same cube
  const generateInstanceId = () => `cube-${Math.random().toString(36).substr(2, 9)}`;

  const selectedAirline = airlines.find((a) => a.id === selectedAirlineId) || airlines[0];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Require 5px movement before dragging starts
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;

    if (!over || over.id !== "suitcase-canvas") {
      return; // Dropped outside canvas
    }

    // Determine if it's a new cube from the sidebar or moving an existing one
    const isNew = !placedCubes.some(c => c.instanceId === active.id);

    if (isNew) {
      // It's a new cube
      const cubeId = active.data.current?.cubeId;
      const cube = allCubes.find(c => c.id === cubeId);
      if (!cube) return;

      // Calculate initial drop position relative to canvas (rough approximation)
      // For a real app, you'd use getBoundingClientRect on the canvas.
      // This is a simplified positioning.
      const initialX = Math.max(0, 50); // Hardcoded offset for simplicity in this demo
      const initialY = Math.max(0, 50);

      setPlacedCubes(prev => [...prev, {
        instanceId: active.id as string,
        cube,
        x: initialX,
        y: initialY,
        rotated: false
      }]);
    } else {
      // Moving an existing cube
      setPlacedCubes(prev => prev.map(c => {
        if (c.instanceId === active.id) {
          // Calculate new position
          let newX = c.x + delta.x;
          let newY = c.y + delta.y;

          // Snap to 10px grid roughly
          newX = Math.round(newX / 10) * 10;
          newY = Math.round(newY / 10) * 10;

          // Simple boundary check (doesn't account for cube width perfectly in this demo version)
          newX = Math.max(0, newX);
          newY = Math.max(0, newY);

          return { ...c, x: newX, y: newY };
        }
        return c;
      }));
    }
  };

  const handleRemove = (instanceId: string) => {
    setPlacedCubes(prev => prev.filter(c => c.instanceId !== instanceId));
  };

  const handleRotate = (instanceId: string) => {
    setPlacedCubes(prev => prev.map(c =>
      c.instanceId === instanceId ? { ...c, rotated: !c.rotated } : c
    ));
  };

  const clearCanvas = () => setPlacedCubes([]);

  // Calculate used volume
  const totalLimitVol = (selectedAirline.carryOn.height * selectedAirline.carryOn.width * selectedAirline.carryOn.depth) / 1000;
  const usedVol = placedCubes.reduce((acc, c) => acc + c.cube.volumeLiters, 0);
  const volPercentage = Math.min(100, Math.round((usedVol / totalLimitVol) * 100));

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* Left Sidebar - Available Cubes */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-brand-beige">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Box className="w-5 h-5 text-brand-orange" /> Available Cubes
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[500px] overflow-y-auto space-y-4 pr-2">
              <p className="text-xs text-muted-foreground mb-4">Drag cubes onto the suitcase.</p>
              {allCubes.map(cube => (
                <div key={cube.id} className="relative">
                  {/* Create a fresh draggble instance for the sidebar */}
                  <CubeItem
                    id={generateInstanceId()}
                    cube={cube}
                    scale={SCALE * 0.6} // Scaled down for sidebar
                    onRemove={() => {}}
                    onRotate={() => {}}
                    isPlaced={false}
                    rotated={false}
                  />
                  <div className="text-center mt-1">
                    <p className="text-xs font-medium text-brand-navy">{cube.name}</p>
                    <p className="text-[10px] text-muted-foreground">{cube.volumeLiters}L</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Canvas Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-brand-beige">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm font-semibold whitespace-nowrap">Target Airline:</span>
              <Select value={selectedAirlineId} onValueChange={(val: string | null) => setSelectedAirlineId(val || airlines[0].id)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select airline" />
                </SelectTrigger>
                <SelectContent>
                  {airlines.map(a => (
                    <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-sm">
                <span className="text-muted-foreground">Volume Used: </span>
                <span className={`font-bold ${volPercentage > 100 ? 'text-red-600' : 'text-brand-navy'}`}>
                  {usedVol.toFixed(1)}L / {totalLimitVol.toFixed(1)}L ({volPercentage}%)
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={clearCanvas} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <RefreshCcw className="w-4 h-4 mr-2" /> Clear
              </Button>
            </div>
          </div>

          <SuitcaseCanvas airline={selectedAirline} scale={SCALE}>
            {placedCubes.map(c => (
              <CubeItem
                key={c.instanceId}
                id={c.instanceId}
                cube={c.cube}
                scale={SCALE}
                x={c.x}
                y={c.y}
                rotated={c.rotated}
                isPlaced={true}
                onRemove={handleRemove}
                onRotate={handleRotate}
              />
            ))}
          </SuitcaseCanvas>

          {volPercentage > 90 && volPercentage <= 100 && (
            <div className="bg-amber-50 text-amber-800 p-4 rounded-lg border border-amber-200 text-sm">
              <strong>Smart Tip:</strong> You&#39;re nearing maximum capacity. Consider swapping standard cubes for compression cubes to save space.
            </div>
          )}
          {volPercentage > 100 && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg border border-red-200 text-sm">
              <strong>Warning:</strong> You have exceeded the estimated volume limit for this airline&#39;s cabin bag.
            </div>
          )}
        </div>
      </div>
    </DndContext>
  );
}
