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

export default function Location() {
  const { form } = useDraftInspectionContext();

  const LocationOptions = [
    { label: "Location 1", value: "location-1" },
    { label: "Location 2", value: "location-2" },
    { label: "Location 3", value: "location-3" },
  ];

  return (
    <Controller
      name="location"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel className="flex items-center gap-1" htmlFor="location">
            Location
            <span className="text-red-500">*</span>
          </FieldLabel>
          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
            }}
          >
            <SelectTrigger className="w-full capitalize">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {LocationOptions.map((option) => (
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
