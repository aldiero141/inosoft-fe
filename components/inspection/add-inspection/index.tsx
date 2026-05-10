import HeaderInspectionCreate from "./header-inspection-create";
import BodyInspectionCreate from "./body-inspection-create";

export default function AddInspection() {
  return (
    <>
      <HeaderInspectionCreate />
      <form id="form-inspection">
        <BodyInspectionCreate />
      </form>
    </>
  );
}
