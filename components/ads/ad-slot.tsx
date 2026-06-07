export function AdSlot({
  className,
  // format = "auto",
  // slot
}: {
  className?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  slot: string;
}) {
  return (
    <div className={`w-full overflow-hidden flex justify-center items-center my-4 ${className || ''}`}>
      <div className="bg-muted text-muted-foreground text-xs flex items-center justify-center min-h-[90px] w-full border border-dashed rounded-md">
        {/* Replace this div with actual AdSense code in production:
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-6393936268623951"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"></ins>
        */}
        [Advertisement Space]
      </div>
    </div>
  );
}
