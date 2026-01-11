import { Input } from "@/components/ui/input";
import useAgentSFilters from "../../hooks/use-agents-filters";
import { SearchIcon } from "lucide-react";

export default function AgentsSearchFilter() {
  const [filters, setFilters] = useAgentSFilters();
  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 bg-white w-[200px] pl-7"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon className="size-4 text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2" />
    </div>
  );
}
