"use client";

import { DraftInspectionProvider } from "@/providers/inspection/draft-inspection-provider";
import { useParams } from "next/navigation";
import HeaderInspectionDetails from "@/components/inspection/detail-inspection/header-inspection-details";
import BodyInspectionDetails from "@/components/inspection/detail-inspection/body-inspection-details";

export default function InspectionPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <DraftInspectionProvider idInspection={id}>
      <HeaderInspectionDetails />
      <div className="flex flex-col mx-20 my-2 py-4 shadow rounded-md bg-white">
        <BodyInspectionDetails />
      </div>
    </DraftInspectionProvider>
  );
}
