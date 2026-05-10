import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table/data-table";
import { ChargesInterface } from "@/lib/types/inspection";
import { currencyFormatter } from "@/lib/utils";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, PlusIcon } from "lucide-react";
import { useState } from "react";

const columns: ColumnDef<ChargesInterface>[] = [
  {
    accessorKey: "order_number",
    header: () => <span>Order No</span>,
    cell: ({ row }) => {
      const order_number = row.original.order_number;
      return <div>{order_number || "-"}</div>;
    },
  },
  {
    accessorKey: "service_desc",
    header: () => <span>Service Description</span>,
    cell: ({ row }) => {
      const service_desc = row.original.service_desc;
      return <div>{service_desc || "-"}</div>;
    },
  },
  {
    accessorKey: "qty",
    header: () => <span>Qty</span>,
    cell: ({ row }) => {
      const qty = row.original.qty;
      return <div>{qty ? `${qty} PCS` : "-"}</div>;
    },
  },
  {
    accessorKey: "unit_price",
    header: () => <span>Unit Price</span>,
    cell: ({ row }) => {
      const unit_price = row.original.unit_price;
      return <div>{unit_price ? currencyFormatter(unit_price) : "-"}</div>;
    },
  },
  {
    accessorKey: "total",
    header: () => <span>Total</span>,
    cell: ({ row }) => {
      const total = row.original.unit_price * row.original.qty;
      return <div>{total ? currencyFormatter(total) : "-"}</div>;
    },
  },
];

export default function CustomerCharge() {
  const { inspection } = useDraftInspectionContext();

  const [showTable, setShowTable] = useState(true);

  const table = useReactTable({
    data: inspection?.charges || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="space-y-4 my-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Charges To Customer</h1>
        <div className="flex gap-2">
          <Button>
            <PlusIcon className="size-4" /> Add Charges
          </Button>
          <Button
            variant="ghost"
            className="size-9"
            onClick={() => setShowTable(!showTable)}
          >
            {showTable ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronUp className="size-4" />
            )}
          </Button>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          showTable ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <DataTable table={table} columns={columns} hideFooter />
      </div>
    </section>
  );
}
