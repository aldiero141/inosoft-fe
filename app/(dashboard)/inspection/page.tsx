"use client";

import ListInspection from "@/components/inspection/list-inspection";
import { InspectionProvider } from "@/providers/inspection/inspection-provider";

export default function InspectionPage() {
  return (
    <InspectionProvider>
      <ListInspection />
    </InspectionProvider>
  );
}
