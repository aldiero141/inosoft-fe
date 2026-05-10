import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import SowEdit from "./sow-edit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

enum SOWFieldOptions {
  ENGINE = "engine",
  HULL = "hull",
  AFT = "aft",
}

export default function SOWField() {
  const { form, setScope } = useDraftInspectionContext();

  const SOWOptions = [
    { label: "Engine", value: SOWFieldOptions.ENGINE },
    { label: "Hull", value: SOWFieldOptions.HULL },
    { label: "Aft", value: SOWFieldOptions.AFT },
  ];

  const onChangeServiceType = () => {
    setScope(["Steering Wheele", "Brake System", "Suspension System"]);
  };

  return (
    <div className="w-full col-span-2">
      <Controller
        name="sow"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="flex items-center gap-1" htmlFor="sow">
              Scope of Work
              <span className="text-red-500">*</span>
            </FieldLabel>
            <div className="flex justify-between gap-7">
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  onChangeServiceType();
                }}
              >
                <SelectTrigger className="capitalize h-8">
                  <SelectValue placeholder="Scope of Work" />
                </SelectTrigger>
                <SelectContent>
                  {SOWOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="capitalize">{option.label}</div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <SowEdit />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}
