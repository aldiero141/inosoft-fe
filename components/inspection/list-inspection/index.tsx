import HeaderInspection from "./header-inspection";
import TabInspection from "./tab-inspection";
import TableInspection from "./table-inspection";

export default function ListInspection() {
  return (
    <>
      <HeaderInspection />
      <div className="flex flex-col mx-20 my-2 py-4 shadow rounded-md bg-white ">
        <TabInspection />
        <TableInspection />
      </div>
    </>
  );
}
