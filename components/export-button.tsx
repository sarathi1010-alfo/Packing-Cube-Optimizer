'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  planId?: string;
  planTitle?: string;
}

export function ExportButton({}: ExportButtonProps) {
  const handleExport = () => {
    // In a full implementation, this might use jsPDF or open a print window
    // For now, we mock the action and trigger a print dialog.
    window.print();
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
