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
} from "../../ui/input-group";
import { useInspectionContext } from "@/providers/inspection/inspection-provider";

export default function SearchInspection() {
  const { setSearch } = useInspectionContext();
  return (
    <div>
      <Popover>
        <PopoverTrigger className="border rounded-md size-9 flex items-center justify-center hover:bg-muted/50">
          <SearchIcon className="text-primary font-bold size-4" />
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
