import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import { Controller } from "react-hook-form";

export default function Note() {
  const { form } = useDraftInspectionContext();
  return (
    <Controller
      name="note"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="px-8 py-4">
          <FieldLabel className="flex items-center gap-1" htmlFor="note">
            Note to Yard
            <span className="text-red-500">*</span>
          </FieldLabel>
          <Textarea
            id="note"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            placeholder="Enter Note"
            className="min-h-[100px]"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
