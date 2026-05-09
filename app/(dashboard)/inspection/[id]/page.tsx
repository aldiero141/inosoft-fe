"use client";

import HeaderInspectionDetails from "@/components/inspection/detail-inspection/header-inspection-details";
import { DraftInspectionProvider } from "@/providers/inspection/draft-inspection-provider";
import { useParams } from "next/navigation";

export default function InspectionPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <DraftInspectionProvider idInspection={id}>
      <div className="flex flex-col mx-20 my-2 py-4 shadow rounded-md bg-white">
        <HeaderInspectionDetails />
      </div>
    </DraftInspectionProvider>
  );
}
