import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import { Controller } from "react-hook-form";

export default function CustomerName() {
  const { form } = useDraftInspectionContext();
  return (
    <Controller
      name="customer_name"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="col-span-2">
          <FieldLabel
            className="flex items-center gap-1"
            htmlFor="customer_name"
          >
            Customer Name
            <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            id="customer_name"
            type="text"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            placeholder="Customer Name"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
