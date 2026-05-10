import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function ECDField() {
  const { form } = useDraftInspectionContext();

  return (
    <Controller
      name="ecd"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel className="flex items-center gap-1" htmlFor="ecd">
            Estimated Completion Date
            <span className="text-red-500">*</span>
          </FieldLabel>
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  className="justify-start text-left font-normal h-8 w-full"
                  variant="outline"
                />
              }
            >
              <CalendarIcon />
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </PopoverTrigger>
            <PopoverPopup align="start" className="w-auto p-0">
              <Calendar
                captionLayout="dropdown"
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
              />
            </PopoverPopup>
          </Popover>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
