"use client";

import { InspectionProvider } from "@/providers/inspection/inspection-provider";
import { useParams } from "next/navigation";

export default function InspectionPage() {
  const params = useParams();
  return (
    <InspectionProvider>
      <div className="flex flex-col mx-20 my-2 py-4 shadow rounded-md bg-white">
        <h1>{params.id}</h1>
      </div>
    </InspectionProvider>
  );
}
