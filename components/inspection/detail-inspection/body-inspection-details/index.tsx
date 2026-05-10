import ActionBody from "./action-body";
import CustomerCharge from "./customer-charge";
import GeneralInformation from "./general-information";
import SOWList from "./sow-list";

export default function BodyInspectionDetails() {
  return (
    <section className="px-4">
      <ActionBody />
      <GeneralInformation />
      <SOWList />
      <CustomerCharge />
    </section>
  );
}
