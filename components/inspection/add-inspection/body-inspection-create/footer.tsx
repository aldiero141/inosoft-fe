"use client";

import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useCreateInspection from "@/components/api/inspections/useCreateInspection";
import { toast } from "sonner";

export default function Footer() {
  const { form } = useDraftInspectionContext();
  const router = useRouter();
  const { mutateAsync: createInspectionFn } = useCreateInspection();

  const onHandleSubmit = (type: string) => {
    form.handleSubmit((data) => {
      createInspectionFn(
        { body: data },
        {
          onSuccess: () => {
            toast.success("Create inspection success");
            router.push(`/inspection/67f9540009889f14370093441`);
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    })();
  };

  return (
    <div className="flex items-center justify-end gap-4 w-full p-4 bg-muted/30">
      <Button
        variant="ghost"
        size="lg"
        type="button"
        onClick={() => {
          form.reset();
        }}
      >
        Cancel
      </Button>
      <Button
        size="lg"
        type="button"
        variant="outline"
        onClick={() => onHandleSubmit("draft")}
      >
        Save Draft
      </Button>
      <Button size="lg" type="button" onClick={() => onHandleSubmit("submit")}>
        Submit
      </Button>
    </div>
  );
}
