import { useTRPC } from "@/trpc/client";
import useMeetingsFilters from "../../hooks/use-meetings-filters";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CommandSelect from "@/components/command-select";
import GeneratedAvatar from "@/components/generated-avatar";

export default function AgentIdFilter() {
  const trpc = useTRPC();
  const [filters, setFilters] = useMeetingsFilters();
  const [agentSearch, setAgentSearch] = useState("");
  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  return (
    <CommandSelect
      placeholder="Filter by agent"
      className="h-9"
      options={(data?.item ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              seed={agent.name}
              variant="botttsNeutral"
              className="size-4"
            />
            {agent.name}
          </div>
        ),
      }))}
      onSelect={(value) => setFilters({ agentId: value })}
      onSearch={setAgentSearch}
      value={filters.agentId || ""}
    />
  );
}
