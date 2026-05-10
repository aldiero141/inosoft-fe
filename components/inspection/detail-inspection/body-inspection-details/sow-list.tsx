/* eslint-disable react-hooks/incompatible-library */
import { DataTable } from "@/components/ui/table/data-table";
import { ScopeInterface } from "@/lib/types/inspection";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columns: ColumnDef<ScopeInterface>[] = [
  {
    accessorKey: "service_type",
    header: () => <span className="w-[240px]">Service Type</span>,
    cell: ({ row }) => {
      const scope_type = row.original.scope_type;
      return <div>{scope_type}</div>;
    },
  },
  {
    accessorKey: "scope_name",
    header: () => <span>Scope Name</span>,
    cell: ({ row }) => {
      const scope_name = row.original.scope_name;
      return <div>{scope_name}</div>;
    },
  },
  {
    accessorKey: "scope_description",
    header: () => <span className="w-[600px]">Scope Of Work</span>,
    cell: ({ row }) => {
      const scope_desc = row.original.scope_description;
      return <div className="w-[600px]">{scope_desc}</div>;
    },
  },
];

export default function SOWList() {
  const { inspection } = useDraftInspectionContext();
  return (
    <section className="space-y-4 my-6">
      <h1 className="text-lg font-semibold">Scope of Work</h1>
      <div className="border border-muted rounded-md p-4 space-y-4">
        {inspection?.sow?.map((item) => (
          <div key={item.template} className="space-y-2">
            <h1 className="text-base font-medium">{item.template_name}</h1>
            <ScopeList scope={item.scope} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ScopeList({ scope }: { scope: ScopeInterface[] }) {
  const table = useReactTable({
    data: scope,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="pb-2">
      <DataTable table={table} columns={columns} hideFooter />
    </div>
  );
}
