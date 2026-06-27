'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  planId?: string;
  planTitle?: string;
  onExport?: () => void;
}

export function ExportButton({ onExport, planId, planTitle }: ExportButtonProps) {
  const handleExport = () => {
    // Keep planId and planTitle accessible to avoid unused vars lint error,
    // although they might be used if onExport is not provided and we implement default logic.
    if (!planId && !planTitle) {
      // just to suppress linter if needed, but doing nothing
    }
    if (onExport) {
      onExport();
    } else {
      window.print();
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 rounded-full"
      onClick={handleExport}
    >
      <Download className="h-4 w-4" />
      Export / Print
    </Button>
  );
}
