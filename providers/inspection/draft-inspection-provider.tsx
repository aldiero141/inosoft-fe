"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { InspectionInterface } from "@/lib/types/inspection";
import useInspectionByID from "@/components/api/inspections/useInspectionByID";

interface DraftInspectionContextData {
  inspection: InspectionInterface;
  isLoadingInspection: boolean;
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
  idInspection: string;
}

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

  const value = useMemo(
    () => ({
      inspection: (inspection || {}) as unknown as InspectionInterface,
      isLoadingInspection,
    }),
    [inspection, isLoadingInspection],
  );

  return (
    <DraftInspectionContext.Provider value={value}>
      {children}
    </DraftInspectionContext.Provider>
  );
};

export { DraftInspectionProvider, useDraftInspectionContext };
