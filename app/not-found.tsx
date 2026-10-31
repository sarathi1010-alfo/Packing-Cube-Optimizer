import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 min-h-[60vh]">
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <h2 className="text-2xl font-semibold">Luggage Space Not Found</h2>
      <p className="text-muted-foreground max-w-md">
        The packing guide or bag volume calculator you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <Button size="lg">
          Return to Optimizer
        </Button>
      </Link>
    </div>
  );
}
