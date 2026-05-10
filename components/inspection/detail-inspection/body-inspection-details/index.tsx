import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import ActionBody from "./action-body";
import CustomerCharge from "./customer-charge";
import GeneralInformation from "./general-information";
import ItemList from "./item-list";
import SOWList from "./sow-list";
import { Skeleton } from "@/components/ui/skeleton";

export default function BodyInspectionDetails() {
  const { isLoadingInspection } = useDraftInspectionContext();

  return (
    <section className="px-4">
      {!isLoadingInspection ? (
        <>
          <ActionBody />
          <GeneralInformation />
          <SOWList />
          <ItemList />
          <CustomerCharge />
        </>
      ) : (
        <Skeleton className="w-full h-[800px]" />
      )}
    </section>
  );
}
