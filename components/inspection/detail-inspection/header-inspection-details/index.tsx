import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { Skeleton } from "@/components/ui/skeleton";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import ActionButton from "./action-button";

export default function HeaderInspectionDetails() {
  const { inspection, isLoadingInspection } = useDraftInspectionContext();

  return (
    <header className="w-full flex justify-between gap-2 px-20 pt-6 pb-5 items-end">
      {isLoadingInspection ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-[400px]" />
          <Skeleton className="h-8 w-[700px]" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Inspection Details</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Quality & HSE</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/inspection">Inspection</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/inspection">
                    Inspection Record
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-primary">
                    {inspection.code}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ActionButton />
        </>
      )}
    </header>
  );
}
