import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RelatedTo() {
  const { form } = useDraftInspectionContext();

  const relatedOptions = [
    { label: "Related to 1", value: "related-1" },
    { label: "Related to 2", value: "related-2" },
    { label: "Related to 3", value: "related-3" },
  ];

  return (
    <Controller
      name="relate_to"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel className="flex items-center gap-1" htmlFor="relate_to">
            Related To
            <span className="text-red-500">*</span>
          </FieldLabel>
          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
            }}
          >
            <SelectTrigger className="w-full capitalize">
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              {relatedOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="capitalize">{option.label}</div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
