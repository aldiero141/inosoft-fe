"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { InspectionInterface } from "@/lib/types/inspection";
import useInspectionByID from "@/components/api/inspections/useInspectionByID";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";

interface DraftInspectionContextData {
  inspection: InspectionInterface;
  isLoadingInspection: boolean;
  form: UseFormReturn<ServiceFormValues>;
  scope: string[];
  setScope: Dispatch<SetStateAction<string[]>>;
}

const DraftInspectionContext = createContext<
  DraftInspectionContextData | undefined
>(undefined);

function useDraftInspectionContext(): DraftInspectionContextData {
  const context = useContext(DraftInspectionContext);
  if (!context) {
    throw new Error(
      "useDraftInspectionContext must be used within a DraftInspectionProvider",
    );
  }
  return context;
}

interface DraftInspectionProviderProps {
  children: ReactNode;
  idInspection?: string;
}

export const orderItemSchema = z.object({
  item_name: z.string().min(1),
  lot: z.string().min(1),
  allocation: z.string().min(1),
  owner: z.string().min(1),
  condition: z.string().min(1),
  qty: z.coerce.number().min(1),
  available_qty: z.coerce.number().min(0),
  required_qty: z.coerce.number().min(0),
  inspection: z.boolean(),
});

export const serviceFormSchema = z
  .object({
    service_type: z.string().min(1),
    sow: z.string().min(1),
    scope: z.array(z.string()).min(1),
    location: z.string().min(1),
    ecd: z.coerce.date(),
    relate_to: z.string().min(1),
    charge_customer: z.boolean(),
    customer_name: z.string().optional(),
    dc_code: z.string().optional(),
    order: z.array(orderItemSchema).min(1),
    note: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.charge_customer) {
        return !!data.customer_name?.trim();
      }

      return true;
    },
    {
      path: ["customer_name"],
      message: "Customer name is required",
    },
  );

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;

const DraftInspectionProvider = ({
  children,
  idInspection,
}: DraftInspectionProviderProps) => {
  const { data: inspection, isLoading: isLoadingInspection } =
    useInspectionByID({
      params: {
        id: idInspection || "",
      },
      enabled: !!idInspection,
    });

  const form = useForm<ServiceFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(serviceFormSchema as any),
    mode: "onBlur",
    defaultValues: {
      service_type: "",
      sow: "",
      scope: [],
      location: "",
      ecd: new Date(),
      relate_to: "",
      charge_customer: false,
      customer_name: "",
      dc_code: "",
      order: [
        {
          item_name: "",
          lot: "",
          allocation: "",
          owner: "",
          condition: "",
          qty: 1,
          available_qty: 0,
          required_qty: 0,
          inspection: false,
        },
      ],
      note: "",
    },
  });

  const [scope, setScope] = useState<string[]>([]);

  const value = useMemo(
    () => ({
      inspection: (inspection || {}) as unknown as InspectionInterface,
      isLoadingInspection,
      form,
      scope,
      setScope,
    }),
    [inspection, isLoadingInspection, form, scope, setScope],
  );

  return (
    <DraftInspectionContext.Provider value={value}>
      {children}
    </DraftInspectionContext.Provider>
  );
};

export { DraftInspectionProvider, useDraftInspectionContext };
