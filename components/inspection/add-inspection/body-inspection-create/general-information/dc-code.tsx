import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import { Controller } from "react-hook-form";

export default function DCCode() {
  const { form } = useDraftInspectionContext();
  return (
    <Controller
      name="dc_code"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-[300px]">
          <FieldLabel className="flex items-center gap-1" htmlFor="dc_code">
            DC Code
          </FieldLabel>
          <Input
            id="dc_code"
            type="text"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            placeholder="DC Code"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
