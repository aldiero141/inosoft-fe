import BodyInspectionDetails from "./body-inspection-details";
import HeaderInspectionDetails from "./header-inspection-details";

export default function DetailInspection() {
  return (
    <>
      <HeaderInspectionDetails />
      <div className="flex flex-col mx-20 my-2 py-4 shadow rounded-md bg-white">
        <BodyInspectionDetails />
      </div>
    </>
  );
}
