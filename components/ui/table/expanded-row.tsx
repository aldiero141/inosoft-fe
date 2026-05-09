import { Row } from "@tanstack/react-table";

// Expanded row content
export default function ExpandedRowContent<TData, TRow extends Row<TData>>({
  row,
}: {
  row: TRow;
}) {
  const details = row.original.details;

  if (!details) return null;

  return (
    <div className="bg-muted/30 p-4 border-t">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Description
          </p>
          <p className="text-sm">{details.description}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Payment Method
          </p>
          <p className="text-sm">{details.paymentMethod}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Transaction ID
          </p>
          <p className="text-sm font-mono">{details.transactionId}</p>
        </div>
      </div>
    </div>
  );
}
