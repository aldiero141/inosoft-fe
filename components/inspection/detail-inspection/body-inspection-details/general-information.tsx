import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import { XCircleIcon } from "lucide-react";

function DetailItem({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${className} flex flex-col`}>
      <Label className="text-muted-foreground text-sm">{title}</Label>
      <p className="text-md font-bold">{children}</p>
    </div>
  );
}

export default function GeneralInformation() {
  const { inspection } = useDraftInspectionContext();
  return (
    <section className="border border-muted rounded-md grid grid-cols-8 px-6 py-4">
      <div className="col-span-2">
        <DetailItem title="Request No.">
          <span>{inspection.code}</span>
        </DetailItem>
      </div>
      <div className="col-span-4 grid grid-cols-3 gap-8 border-r mr-4">
        <DetailItem title="Service Type">
          <span>{inspection.code}</span>
        </DetailItem>
        <DetailItem title="Location" className="col-span-2">
          <span>{inspection.code}</span>
        </DetailItem>
        <DetailItem title="Date Submitted">
          <span>{inspection.code}</span>
        </DetailItem>
        <DetailItem title="Estimation Completion Date">
          <span>{inspection.code}</span>
        </DetailItem>
        <DetailItem title="Related To">
          <span className="text-primary">{inspection.code}</span>
        </DetailItem>
        <div className="w-full col-span-3 pr-4 gap-4">
          <Label className="text-muted-foreground text-sm">
            Custom Field Header
          </Label>
          <Separator />

          <DetailItem title="D/C Code" className="col-span-3 mt-2">
            <span>{inspection.code}</span>
          </DetailItem>
        </div>
      </div>
      <div className="col-span-2 flex flex-col justify-between align-end">
        <div className="grid grid-cols-3 justify-center ">
          <DetailItem title="Charge To" className="col-span-2">
            <span>{inspection.customer}</span>
          </DetailItem>
          <DetailItem title="Status" className="">
            <div
              className={cn(
                "text-sm text-muted-foreground font-medium border rounded-full w-30 flex items-center justify-center h-6",
                inspection.status === "Draft"
                  ? "bg-muted"
                  : inspection.status === "New"
                    ? "bg-white"
                    : "bg-white",
              )}
            >
              {inspection.status}
            </div>
          </DetailItem>
        </div>

        <Button variant="outline" className="">
          <XCircleIcon className="text-destructive" />
          Terminate
        </Button>
      </div>
    </section>
  );
}
