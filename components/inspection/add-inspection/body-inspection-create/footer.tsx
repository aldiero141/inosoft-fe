"use client";

import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const { form } = useDraftInspectionContext();

  const onHandleSubmit = (type: string) => {
    form.handleSubmit((data) => {
      console.log(data);
      console.log(type);
    })();
  };

  return (
    <div className="flex items-center justify-end gap-4 mt-8 w-full p-4 bg-muted/30">
      <Button
        variant="outline"
        size="lg"
        type="button"
        onClick={() => {
          form.reset();
        }}
      >
        Cancel
      </Button>
      <Button size="lg" type="button" onClick={() => onHandleSubmit("draft")}>
        Save Draft
      </Button>
      <Button size="lg" type="button" onClick={() => onHandleSubmit("submit")}>
        Submit
      </Button>
    </div>
  );
}
