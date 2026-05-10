import ScopesIncluded from "./scopes-included";
import ServiceType from "./service-type";
import SOWField from "./sow-field";
import Location from "./location";
import ECDField from "./ecd-field";
import RelatedTo from "./related-to";
import DCCode from "./dc-code";
import ChargeCustomer from "./charge-customer";
import Status from "./status";
import CustomerName from "./customer-name";

export default function GeneralInformation() {
  return (
    <div className="flex gap-2 px-4">
      <div className="w-2/3 grid grid-cols-3 gap-x-4 gap-y-6 p-4 border-r">
        <ServiceType />
        <SOWField />
        <ScopesIncluded />
        <Location />
        <ECDField />
        <RelatedTo />
        <div className="col-span-3 flex flex-col gap-4 mt-6">
          <h1 className="text-md font-bold text-muted-foreground border-b">
            Custom Field Header
          </h1>
          <DCCode />
        </div>
      </div>
      <div className="w-1/3 p-5">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 w-full h-fit">
          <ChargeCustomer />
          <Status />
          <CustomerName />
        </div>
      </div>
    </div>
  );
}
