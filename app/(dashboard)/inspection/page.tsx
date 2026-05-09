"use client";

import HeaderInspection from "@/components/inspection/list-inspection/header-inspection";
import TabInspection from "@/components/inspection/list-inspection/tab-inspection";
import TableInspection from "@/components/inspection/list-inspection/table-inspection";
import { InspectionProvider } from "@/providers/inspection/inspection-provider";

export default function InspectionPage() {
  return (
    <InspectionProvider>
      <HeaderInspection />

      <div className="flex flex-col mx-20 my-2 py-4 shadow rounded-md bg-white ">
        <TabInspection />
        <TableInspection />
      </div>
    </InspectionProvider>
  );
}
