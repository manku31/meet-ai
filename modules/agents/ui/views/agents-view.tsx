"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import EmptyState from "@/components/empty-state";
import useAgentSFilters from "../../hooks/use-agents-filters";
import DataPagination from "../components/data-pagination";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";

export default function AgentsView() {
  const [filters, setFilters] = useAgentSFilters();
  const trpc = useTRPC();
  const { data, isLoading, isError } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );
  const router = useRouter();

  if (isLoading) {
    return (
      <LoadingState
        title="Loading Agents"
        description="This may take a few seconds"
      />
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Error loading agents"
        description="Please try again later."
      />
    );
  }

  return (
    <div className="flec-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={data?.item || []}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data?.totalPages || 1}
        onPageChange={(page) => setFilters({ page })}
      />
      {data?.item.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call"
        />
      )}
    </div>
  );
}

export const AgentViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a few seconds"
    />
  );
};

export const AgentViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Something went wrong."
    />
  );
};
