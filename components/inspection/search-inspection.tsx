import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { useInspectionContext } from "@/providers/inspection/inspection-provider";

export default function SearchInspection() {
  const { setSearch } = useInspectionContext();
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className="px-2.5">
            <SearchIcon className="text-primary font-bold" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <InputGroup className="max-w-xs">
            <InputGroupInput
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </PopoverContent>
      </Popover>
    </div>
  );
}
