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
import useRelationOptions from "@/components/api/options/useRelationOptions";

export default function RelatedTo() {
  const { form } = useDraftInspectionContext();
  const { data: relatedOptions, isLoading: isLoadingRelatedOptions } =
    useRelationOptions({ enabled: true });
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
              {relatedOptions?.length === 0 || isLoadingRelatedOptions ? (
                <SelectItem value="not-found">
                  <div className="capitalize">Not Found</div>
                </SelectItem>
              ) : (
                relatedOptions?.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    <div className="capitalize">{option.id}</div>
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
