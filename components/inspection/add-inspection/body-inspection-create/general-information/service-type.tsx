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
import useServiceTypeOptions from "@/components/api/options/useServiceTypeOptions";
import { ServiceTypeInterface } from "@/lib/dummy/responseServiceType";

export default function ServiceType() {
  const { form } = useDraftInspectionContext();
  const { data: serviceTypeOptions, isLoading: isLoadingServiceTypeOptions } =
    useServiceTypeOptions({ enabled: true });

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
              {serviceTypeOptions?.length === 0 ||
              isLoadingServiceTypeOptions ? (
                <SelectItem value="not-found">
                  <div className="capitalize">Not Found</div>
                </SelectItem>
              ) : (
                serviceTypeOptions?.map((option: ServiceTypeInterface) => (
                  <SelectItem
                    key={option.id_service_type}
                    value={option.service_type_name}
                  >
                    <div className="capitalize">{option.service_type_name}</div>
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
