"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { InspectionInterface } from "@/lib/types/inspection";
import useInspectionList from "@/components/api/inspections/useInspectionList";
import { useDebounce } from "@uidotdev/usehooks";

interface InspectionContextData {
  listInspection: InspectionInterface[];
  isLoadingListInspection: boolean;
  selectedInspection: InspectionInterface[];
  setSelectedInspection: Dispatch<SetStateAction<InspectionInterface[]>>;
  tabActive: TabActive;
  setTabActive: Dispatch<SetStateAction<TabActive>>;
  setSearch: Dispatch<SetStateAction<string>>;
}

export enum TabActive {
  Open = "open",
  ForReview = "for_review",
  Completed = "completed",
  PendingJournal = "pending_journal",
}

const InspectionContext = createContext<InspectionContextData | undefined>(
  undefined,
);

function useInspectionContext(): InspectionContextData {
  const context = useContext(InspectionContext);
  if (!context) {
    throw new Error(
      "useInspectionContext must be used within a InspectionProvider",
    );
  }
  return context;
}

const InspectionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedInspection, setSelectedInspection] = useState<
    InspectionInterface[]
  >([]);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [tabActive, setTabActive] = useState<TabActive>(TabActive.Open);
  const { data: listInspection, isLoading: isLoadingListInspection } =
    useInspectionList({
      enabled: true,
      params: {
        status: tabActive,
        search: debouncedSearch,
      },
    });

  const value = useMemo(
    () => ({
      listInspection: listInspection || [],
      isLoadingListInspection,
      selectedInspection,
      setSelectedInspection,
      tabActive,
      setTabActive,
      setSearch,
    }),
    [
      listInspection,
      isLoadingListInspection,
      selectedInspection,
      setSelectedInspection,
      tabActive,
      setTabActive,
      setSearch,
    ],
  );

  return (
    <InspectionContext.Provider value={value}>
      {children}
    </InspectionContext.Provider>
  );
};

export { InspectionProvider, useInspectionContext };
