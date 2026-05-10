"use client";

import DetailInspection from "@/components/inspection/detail-inspection";
import { DraftInspectionProvider } from "@/providers/inspection/draft-inspection-provider";
import { useParams } from "next/navigation";

export default function InspectionPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <DraftInspectionProvider idInspection={id}>
      <DetailInspection />
    </DraftInspectionProvider>
  );
}
