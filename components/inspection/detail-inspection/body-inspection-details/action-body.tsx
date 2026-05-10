import { useRouter } from "next/navigation";
import { Button } from "../../../ui/button";
import { ChevronLeft, Pencil } from "lucide-react";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";

export default function ActionBody() {
  const router = useRouter();
  const { inspection } = useDraftInspectionContext();

  return (
    <div className="flex justify-between pb-3">
      <Button
        variant="ghost"
        className="flex gap-2 justify-between w-fit text-sm"
        onClick={() => router.push("/inspection")}
      >
        <ChevronLeft className="text-primary size-4" />
        Back
      </Button>
      <Button
        variant="ghost"
        className="flex gap-2 justify-between w-fit text-sm"
        onClick={() => router.push(`/inspection/${inspection.id}/edit`)}
      >
        <Pencil className="text-primary size-4" />
        Modify
      </Button>
    </div>
  );
}
