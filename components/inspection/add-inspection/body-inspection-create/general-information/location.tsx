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
import useLocationOptions from "@/components/api/options/useLocationOptions";

export default function Location() {
  const { form } = useDraftInspectionContext();
  const { data: locationOptions, isLoading: isLoadingLocationOptions } =
    useLocationOptions({ enabled: true });

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
              {locationOptions?.length === 0 || isLoadingLocationOptions ? (
                <SelectItem value="not-found">
                  <div className="capitalize">Not Found</div>
                </SelectItem>
              ) : (
                locationOptions?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="capitalize">{option.value}</div>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
