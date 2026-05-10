"use client";

import AddInspection from "@/components/inspection/add-inspection";
import { DraftInspectionProvider } from "@/providers/inspection/draft-inspection-provider";

export default function AddInspectionPage() {
  return (
    <DraftInspectionProvider>
      <AddInspection />
    </DraftInspectionProvider>
  );
}
