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

enum ServiceTypeEnum {
  INSPECTION = "inspection",
  REPAIR = "repair",
  MAINTENANCE = "maintenance",
}

export default function ServiceType() {
  const { form } = useDraftInspectionContext();

  const ServiceTypeOptions = [
    { label: "Inspection", value: ServiceTypeEnum.INSPECTION },
    { label: "Repair", value: ServiceTypeEnum.REPAIR },
    { label: "Maintenance", value: ServiceTypeEnum.MAINTENANCE },
  ];

  return (
    <Controller
      name="service_type"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel
            className="flex items-center gap-1"
            htmlFor="service_type"
          >
            Service Type
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
              {ServiceTypeOptions.map((option) => (
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
