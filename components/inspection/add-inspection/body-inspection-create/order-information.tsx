import { useFieldArray, Controller } from "react-hook-form";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import {
  Trash2,
  Plus,
  Minus,
  ChevronDown,
  Logs,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import useItemsOptions from "@/components/api/options/useItemsOptions";
import { FieldError } from "@/components/ui/field";

export default function OrderInformation() {
  const {
    form,
    setSelectedItemForIndex,
    setSelectedLotForIndex,
    getAllocationOptions,
    getLotOptions,
    getOwnerOptions,
  } = useDraftInspectionContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "order",
  });

  const { data: itemsOptions, isLoading } = useItemsOptions({
    enabled: true,
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);

  const handleSelectItem = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const onItemChange = (value: string, index: number) => {
    if (!value) return;
    const selectedItem = itemsOptions?.find((item) => item.id_item === value);
    if (selectedItem) {
      setSelectedItemForIndex(index, selectedItem);
      form.setValue(`order.${index}.lot`, "");
      form.setValue(`order.${index}.allocation`, "");
      form.setValue(`order.${index}.owner`, "");
      form.setValue(
        `order.${index}.available_qty`,
        selectedItem.available_qty || 0,
      );
    }
  };

  const onLotChange = (value: string, index: number) => {
    if (!value) return;
    setSelectedLotForIndex(index, value);
  };

  const handleDeleteSelected = () => {
    const sortedIndices = [...selectedItems].sort((a, b) => b - a);
    sortedIndices.forEach((index) => remove(index));
    setSelectedItems([]);
    if (fields.length - selectedItems.length === 0) {
      append({
        item_name: "",
        lot: "",
        allocation: "",
        owner: "",
        condition: "",
        qty: 1,
        available_qty: 0,
        required_qty: 0,
        inspection: false,
      });
    }
  };

  const handleAddItem = () => {
    append({
      item_name: "",
      lot: "",
      allocation: "",
      owner: "",
      condition: "",
      qty: 1,
      available_qty: 0,
      required_qty: 0,
      inspection: false,
    });
  };

  return (
    <div className="flex flex-col mx-8 my-6">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-md font-bold text-muted-foreground">
          Order Information
        </h2>
        <div className="flex gap-4">
          <Button
            type="button"
            variant="ghost"
            className="text-red-500 hover:text-red-600 disabled:opacity-50"
            disabled={selectedItems.length === 0}
            onClick={handleDeleteSelected}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="text-teal-500 hover:text-teal-600 font-semibold"
            onClick={handleAddItem}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        {/* Table Header */}
        <div className="bg-primary text-white flex px-4 py-2 text-sm font-semibold">
          <div className="w-[4%]"></div>
          <div className="w-[66%]">Item Description</div>
          <div className="w-[30%]">Qty</div>
        </div>

        {/* List of items */}
        <div className="bg-white flex flex-col divide-y">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 flex flex-col gap-4">
              {/* Top Row */}
              <div className="flex items-start gap-4">
                <div className="flex justify-center pr-2 pt-2">
                  <Checkbox
                    className="size-6 rounded-md border-gray-400 text-green-400 focus:ring-green-400"
                    checked={selectedItems.includes(index)}
                    onCheckedChange={() => handleSelectItem(index)}
                  />
                </div>
                <div className="flex-1 flex gap-4">
                  {/* Item Name */}
                  <Controller
                    control={form.control}
                    name={`order.${index}.item_name`}
                    render={({ field, fieldState }) => (
                      <div className="w-[68%] flex flex-col gap-1">
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            onItemChange(value || "", index);
                          }}
                          items={itemsOptions?.map((option) => ({
                            value: option.id_item,
                            label: option.item_desc,
                          }))}
                        >
                          <SelectTrigger className="w-full bg-white h-10">
                            <SelectValue placeholder="Select an item" />
                          </SelectTrigger>
                          <SelectContent>
                            {itemsOptions?.length === 0 || isLoading ? (
                              <SelectItem value="not-found">
                                <div className="capitalize">Not Found</div>
                              </SelectItem>
                            ) : (
                              itemsOptions?.map((option) => (
                                <SelectItem
                                  key={option.id_item}
                                  value={option.id_item}
                                  className="capitalize"
                                >
                                  {option.item_desc}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    )}
                  />

                  {/* Qty + Expand */}
                  <div className="flex flex-1 gap-2">
                    <Controller
                      control={form.control}
                      name={`order.${index}.qty`}
                      render={({ field, fieldState }) => (
                        <div className="flex-1 flex flex-col gap-1">
                          <Input
                            {...field}
                            placeholder="Enter Qty"
                            className="w-full h-10"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </div>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-10 h-10 p-0 text-teal-500 border-teal-100 bg-teal-50/30 hover:bg-teal-50"
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? (
                        <ChevronDown className="size-5" />
                      ) : (
                        <ChevronRight className="size-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sub Row */}
              <div
                className={`flex gap-4 items-start pl-14 transition-all duration-300 ease-in-out ${
                  showMore
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="flex-none opacity-50 mt-2 mr-2">
                  <Logs />
                </div>
                <div className="flex-1 grid grid-cols-7 gap-3">
                  {/* Lot */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium">
                      Lot Selection
                    </label>
                    <Controller
                      control={form.control}
                      name={`order.${index}.lot`}
                      render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                              onLotChange(value || "", index);
                            }}
                          >
                            <SelectTrigger className="w-full h-10">
                              <SelectValue placeholder="Select lot" />
                            </SelectTrigger>
                            <SelectContent>
                              {getLotOptions(index).length === 0 ? (
                                <SelectItem value="not-found" disabled>
                                  No lots available
                                </SelectItem>
                              ) : (
                                getLotOptions(index).map((opt) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Allocation */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium">
                      Allocation
                    </label>
                    <Controller
                      control={form.control}
                      name={`order.${index}.allocation`}
                      render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full h-10">
                              <SelectValue placeholder="Select allocation" />
                            </SelectTrigger>
                            <SelectContent>
                              {getAllocationOptions(index).length === 0 ? (
                                <SelectItem value="not-found" disabled>
                                  No allocations available
                                </SelectItem>
                              ) : (
                                getAllocationOptions(index).map((opt) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Owner */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium">
                      Owner
                    </label>
                    <Controller
                      control={form.control}
                      name={`order.${index}.owner`}
                      render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full h-10">
                              <SelectValue placeholder="Select owner" />
                            </SelectTrigger>
                            <SelectContent>
                              {getOwnerOptions(index).length === 0 ? (
                                <SelectItem value="not-found" disabled>
                                  No owners available
                                </SelectItem>
                              ) : (
                                getOwnerOptions(index).map((opt) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Condition */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium">
                      Condition
                    </label>
                    <Controller
                      control={form.control}
                      name={`order.${index}.condition`}
                      render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full h-10">
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Good">Good</SelectItem>
                              <SelectItem value="Repair">Repair</SelectItem>
                              <SelectItem value="Scrap">Scrap</SelectItem>
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Avail. Qty */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium">
                      Avail. Qty
                    </label>
                    <Controller
                      control={form.control}
                      name={`order.${index}.available_qty`}
                      render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                          <Input
                            {...field}
                            readOnly
                            className="h-10 bg-gray-50 text-gray-500"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Required Qty */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium">
                      Qty Required
                    </label>
                    <Controller
                      control={form.control}
                      name={`order.${index}.required_qty`}
                      render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                          <Input
                            {...field}
                            placeholder="Enter Qty"
                            className="h-10 bg-gray-50"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Inspection Required */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium">
                      Inspection Required
                    </label>
                    <Controller
                      control={form.control}
                      name={`order.${index}.inspection`}
                      render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 h-10">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="rounded-xs border-gray-400 text-green-400 focus:ring-green-400"
                            />
                            <div className="flex-1 bg-gray-50 border rounded-md h-full" />
                          </div>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-10 h-10 p-0 text-gray-400 hover:text-red-500"
                    onClick={() => {
                      if (fields.length > 1) {
                        remove(index);
                      }
                    }}
                  >
                    <Minus className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    className="w-10 h-10 p-0 bg-teal-500 hover:bg-teal-600 text-white"
                    onClick={handleAddItem}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
