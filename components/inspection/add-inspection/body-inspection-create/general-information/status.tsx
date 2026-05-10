import { Field, FieldLabel } from "@/components/ui/field";

export default function Status() {
  return (
    <Field>
      <FieldLabel>Status</FieldLabel>
      <div className="text-sm text-muted-foreground font-medium border rounded-full w-30 flex items-center justify-center h-6 bg-muted">
        Draft
      </div>
    </Field>
  );
}
