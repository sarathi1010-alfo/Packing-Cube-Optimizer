"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { Cube } from "@/lib/data/schema";
import { getAirlines, getCubes } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SuitcaseCanvas } from "./SuitcaseCanvas";
import { CubeItem } from "./CubeItem";
import { Box, RefreshCcw } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { ExportButton } from "@/components/export-button";

interface PlacedCube {
  instanceId: string;
  cube: Cube;
  x: number;
  y: number;
  rotated: boolean;
}

const SCALE = 7; // 1 cm = 7 pixels. E.g. 55cm height = 385px.

export interface Container {
  id: string;
  name: string;
  width: number;
  height: number;
  depth: number;
  limitLabel: string;
  items: PlacedCube[];
}

function DroppableTab({ id, children }: { id: string; children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: `tab-${id}`,
  });

  return (
    <TabsTrigger
      ref={setNodeRef}
      value={id}
      className={`transition-colors ${isOver ? "bg-brand-orange/20" : ""}`}
    >
      {children}
    </TabsTrigger>
  );
}

export function Simulator() {
  const airlines = getAirlines();
  const allCubes = getCubes();

  const [selectedAirlineId, setSelectedAirlineId] = useState(airlines[0].id);

  const selectedAirline = airlines.find((a) => a.id === selectedAirlineId) || airlines[0];

  const [containers, setContainers] = useState<Container[]>([
    { id: 'carry-on', name: 'Carry-On', width: selectedAirline.carryOn.width, height: selectedAirline.carryOn.height, depth: selectedAirline.carryOn.depth, limitLabel: 'Carry-On Limit', items: [] },
    { id: 'personal', name: 'Personal Item', width: selectedAirline.personalItem.width, height: selectedAirline.personalItem.height, depth: selectedAirline.personalItem.depth, limitLabel: 'Personal Item Limit', items: [] },
    { id: 'checked', name: 'Checked Bag', width: 50, height: 70, depth: 30, limitLabel: 'Standard Checked Bag', items: [] },
  ]);
  const [activeContainerId, setActiveContainerId] = useState('carry-on');

  // We use instance IDs because users can place multiple of the same cube
  const generateInstanceId = () => `cube-${Math.random().toString(36).substr(2, 9)}`;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Require 5px movement before dragging starts
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;

    if (!over) {
      return; // Dropped nowhere
    }

    // Check if dropped on a tab
    if (typeof over.id === "string" && over.id.startsWith("tab-")) {
      const targetContainerId = over.id.replace("tab-", "");
      if (targetContainerId === activeContainerId) return;

      setContainers(prev => {
        let draggedItem: PlacedCube | undefined;

        // Find and remove from source container
        const newContainers = prev.map(container => {
          if (container.id === activeContainerId) {
            draggedItem = container.items.find(c => c.instanceId === active.id);
            return {
              ...container,
              items: container.items.filter(c => c.instanceId !== active.id)
            };
          }
          return container;
        });

        // If not found in active container (e.g. from sidebar), it's a new item.
        // We'll create it.
        if (!draggedItem) {
          const cubeId = active.data.current?.cubeId;
          const cube = allCubes.find(c => c.id === cubeId);
          if (cube) {
            draggedItem = {
              instanceId: active.id as string,
              cube,
              x: 0,
              y: 0,
              rotated: false
            };
          }
        }

        // Add to target container
        if (draggedItem) {
          return newContainers.map(container => {
            if (container.id === targetContainerId) {
              return {
                ...container,
                // Reset position to top-left when moving between bags
                items: [...container.items, { ...draggedItem!, x: 50, y: 50 }]
              };
            }
            return container;
          });
        }
        return prev;
      });
      return;
    }

    if (over.id !== "suitcase-canvas") {
      return;
    }

    const activeContainer = containers.find(c => c.id === activeContainerId);
    if (!activeContainer) return;

    // Determine if it's a new cube from the sidebar or moving an existing one
    const isNew = !activeContainer.items.some(c => c.instanceId === active.id);

    if (isNew) {
      // It's a new cube
      const cubeId = active.data.current?.cubeId;
      const cube = allCubes.find(c => c.id === cubeId);
      if (!cube) return;

      const initialX = Math.max(0, 50);
      const initialY = Math.max(0, 50);

      setContainers(prev => prev.map(container =>
        container.id === activeContainerId
          ? { ...container, items: [...container.items, {
              instanceId: active.id as string,
              cube,
              x: initialX,
              y: initialY,
              rotated: false
            }] }
          : container
      ));
    } else {
      // Moving an existing cube within the same container
      setContainers(prev => prev.map(container => {
        if (container.id === activeContainerId) {
          return {
            ...container,
            items: container.items.map(c => {
              if (c.instanceId === active.id) {
                let newX = c.x + delta.x;
                let newY = c.y + delta.y;

                newX = Math.round(newX / 10) * 10;
                newY = Math.round(newY / 10) * 10;

                newX = Math.max(0, newX);
                newY = Math.max(0, newY);

                return { ...c, x: newX, y: newY };
              }
              return c;
            })
          };
        }
        return container;
      }));
    }
  };

  const handleRemove = (instanceId: string) => {
    setContainers(prev => prev.map(container => ({
      ...container,
      items: container.items.filter(c => c.instanceId !== instanceId)
    })));
  };

  const handleRotate = (instanceId: string) => {
    setContainers(prev => prev.map(container => ({
      ...container,
      items: container.items.map(c =>
        c.instanceId === instanceId ? { ...c, rotated: !c.rotated } : c
      )
    })));
  };

  const clearCanvas = () => {
    setContainers(prev => prev.map(container =>
      container.id === activeContainerId ? { ...container, items: [] } : container
    ));
  };

  const handleAirlineChange = (val: string | null) => {
    const newAirlineId = val || airlines[0].id;
    setSelectedAirlineId(newAirlineId);
    const newAirline = airlines.find((a) => a.id === newAirlineId) || airlines[0];

    // Update container dimensions for the new airline
    setContainers(prev => prev.map(container => {
      if (container.id === 'carry-on') {
        return { ...container, width: newAirline.carryOn.width, height: newAirline.carryOn.height, depth: newAirline.carryOn.depth };
      }
      if (container.id === 'personal') {
        return { ...container, width: newAirline.personalItem.width, height: newAirline.personalItem.height, depth: newAirline.personalItem.depth };
      }
      return container;
    }));
  };

  const activeContainer = containers.find(c => c.id === activeContainerId);
  const activeItems = activeContainer?.items || [];

  // Calculate used volume
  const totalLimitVol = activeContainer ? (activeContainer.height * activeContainer.width * activeContainer.depth) / 1000 : 0;
  const usedVol = activeItems.reduce((acc, c) => acc + c.cube.volumeLiters, 0);
  const volPercentage = totalLimitVol > 0 ? Math.round((usedVol / totalLimitVol) * 100) : 0;

  const handleExport = () => {
    if (!activeContainer) return;

    const win = window.open("", "_blank");
    if (!win) return;

    const mapWidthPx = activeContainer.width * SCALE;
    const mapHeightPx = activeContainer.height * SCALE;

    const itemsHtml = activeItems.map(c => {
      const w = c.rotated ? c.cube.dimensions.height * SCALE : c.cube.dimensions.width * SCALE;
      const h = c.rotated ? c.cube.dimensions.width * SCALE : c.cube.dimensions.height * SCALE;
      return `<div style="
        position: absolute;
        left: ${c.x}px;
        top: ${c.y}px;
        width: ${w}px;
        height: ${h}px;
        background-color: ${c.cube.color};
        border: 2px solid rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 10px;
        font-weight: bold;
        color: rgba(0,0,0,0.7);
        padding: 4px;
        box-sizing: border-box;
      ">${c.cube.name}</div>`;
    }).join("");

    const checklistHtml = activeItems.map(c =>
      `<li>${c.cube.name} (${c.cube.dimensions.width}x${c.cube.dimensions.height}x${c.cube.dimensions.depth} cm)</li>`
    ).join("");

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Packing Guide - ${activeContainer.name}</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #111827; }
          h1 { margin-bottom: 8px; }
          .subtitle { color: #4B5563; margin-bottom: 32px; }
          .map-container {
            position: relative;
            width: ${mapWidthPx}px;
            height: ${mapHeightPx}px;
            border: 4px solid #1e3a8a;
            border-radius: 12px;
            margin-bottom: 32px;
            background-color: #f3f4f6;
          }
          .summary {
            background-color: #f9fafb;
            padding: 16px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            margin-bottom: 32px;
          }
          ul { list-style-type: none; padding: 0; }
          li { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>Packing Plan: ${activeContainer.name}</h1>
        <div class="subtitle">${activeContainer.width}x${activeContainer.height}x${activeContainer.depth} cm • ${selectedAirline.name}</div>

        <div class="map-container">
          ${itemsHtml}
        </div>

        <div class="summary">
          <strong>Summary:</strong> ${activeItems.length} items • ${usedVol.toFixed(1)}L / ${totalLimitVol.toFixed(1)}L used
        </div>

        <h2>Checklist</h2>
        <ul>
          ${checklistHtml}
        </ul>

        <button onclick="window.print()" style="margin-top: 32px; padding: 8px 16px; cursor: pointer;">Print Guide</button>
      </body>
      </html>
    `;

    win.document.write(html);
    win.document.close();
  };

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
              <Select value={selectedAirlineId} onValueChange={handleAirlineChange}>
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
                  {usedVol.toFixed(1)}L / {totalLimitVol.toFixed(1)}L ({Math.min(100, volPercentage)}%)
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={clearCanvas} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <RefreshCcw className="w-4 h-4 mr-2" /> Clear
              </Button>
              <ExportButton onExport={handleExport} />
            </div>
          </div>

          <Tabs value={activeContainerId} onValueChange={setActiveContainerId} className="w-full">
            <TabsList className="mb-4">
              {containers.map(container => (
                <DroppableTab key={container.id} id={container.id}>
                  {container.name}
                </DroppableTab>
              ))}
            </TabsList>
          </Tabs>

          <SuitcaseCanvas airline={selectedAirline} container={activeContainer || containers[0]} scale={SCALE}>
            {activeItems.map(c => (
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
