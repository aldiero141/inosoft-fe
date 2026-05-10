import { FieldError, FieldLabel } from "@/components/ui/field";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import { Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

export default function ChargeCustomer() {
  const { form } = useDraftInspectionContext();
  return (
    <Controller
      name="charge_customer"
      control={form.control}
      render={({ field, fieldState }) => (
        <div className="w-fit flex flex-col gap-2">
          <FieldLabel
            className="flex items-center gap-1"
            htmlFor="charge_customer"
          >
            Charge Customer
            <span className="text-red-500">*</span>
          </FieldLabel>
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            className="max-w-lg max-h-lg"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </div>
      )}
    />
  );
}
