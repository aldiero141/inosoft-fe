import { Field, FieldLabel } from "@/components/ui/field";

export default function Status() {
  return (
    <Field>
      <FieldLabel>Status</FieldLabel>
      <div className="h-8 w-fit text-sm text-muted-foreground font-medium border rounded-full px-4 flex items-center justify-center bg-muted">
        Draft
      </div>
    </Field>
  );
}
