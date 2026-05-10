import { Label } from "@/components/ui/label";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";

export default function ScopesIncluded() {
  const { scope } = useDraftInspectionContext();

  return (
    <div className="col-span-3 flex flex-col items-start gap-2 py-2">
      <Label className="flex items-center gap-1" htmlFor="sow">
        Scopes Included
        <span className="text-red-500">*</span>
      </Label>
      <div className="flex items-center justify-start gap-4  border rounded-md border-muted w-full min-h-[64px] p-2">
        {scope.length > 0 &&
          scope.map((sc) => (
            <div
              key={sc}
              className="flex items-center gap-4 px-4 py-2 text-sm rounded-md bg-muted/50 text-muted-foreground capitalize"
            >
              {sc}
            </div>
          ))}
      </div>
    </div>
  );
}
