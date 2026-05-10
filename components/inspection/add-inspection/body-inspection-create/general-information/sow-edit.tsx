import { Button } from "@/components/ui/button";
import { Pencil, PlusIcon } from "lucide-react";

export default function SowEdit() {
  return (
    <div className="flex items-end justify-end w-full">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="bg-muted/50 size-9"
          type="button"
        >
          <Pencil className="text-primary size-4" />
        </Button>
        <span>or</span>
        <Button variant="default" size="sm" type="button">
          <PlusIcon className="text-WHITE size-4" />
          Create new SOW
        </Button>
      </div>
    </div>
  );
}
