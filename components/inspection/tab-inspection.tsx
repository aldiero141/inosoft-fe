import {
  TabActive,
  useInspectionContext,
} from "@/providers/inspection/inspection-provider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { File, SearchIcon } from "lucide-react";

const tabs = [
  {
    label: "Open",
    value: TabActive.Open,
  },
  {
    label: "For Review",
    value: TabActive.ForReview,
  },
  {
    label: "Completed",
    value: TabActive.Completed,
  },
  {
    label: "Pending Journal",
    value: TabActive.PendingJournal,
  },
];

export default function TabInspection() {
  const { tabActive, setTabActive } = useInspectionContext();

  return (
    <div className="z-50 flex items-center justify-between gap-4 border-b px-6 ">
      <Tabs
        defaultValue={tabActive}
        onValueChange={(value) => setTabActive(value as TabActive)}
        value={tabActive}
      >
        <TabsList variant="line">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none!"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex gap-2 -mt-4">
        <Button variant={"outline"} className="px-2.5">
          <SearchIcon className="text-primary font-bold" />
        </Button>
        <Button variant={"outline"}>
          <File className="text-primary font-bold" />
          Export
        </Button>
      </div>
    </div>
  );
}
