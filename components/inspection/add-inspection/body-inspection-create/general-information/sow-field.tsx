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
import useSowOptions from "@/components/api/options/useSowOptions";

export default function SOWField() {
  const { form, setScope } = useDraftInspectionContext();
  const { data: sowOptions, isLoading: isLoadingSowOptions } = useSowOptions({
    enabled: true,
  });

  const onChangeSOW = (value: string) => {
    if (!value) return;
    const selectedSow = sowOptions?.find((option) => option.sow_name === value);
    const sowScope = selectedSow?.scope.map((scope) => scope.scope_name) || [];
    setScope(sowScope);
    form.setValue("scope", sowScope);
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
                  onChangeSOW(value || "");
                }}
              >
                <SelectTrigger className="capitalize h-8">
                  <SelectValue placeholder="Scope of Work" />
                </SelectTrigger>
                <SelectContent>
                  {sowOptions?.length === 0 || isLoadingSowOptions ? (
                    <SelectItem value="not-found">
                      <div className="capitalize">Not Found</div>
                    </SelectItem>
                  ) : (
                    sowOptions?.map((option) => (
                      <SelectItem key={option.id_sow} value={option.sow_name}>
                        <div className="capitalize">{option.sow_name}</div>
                      </SelectItem>
                    ))
                  )}
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
