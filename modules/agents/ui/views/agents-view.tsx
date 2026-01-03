"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function AgentsView() {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.agents.getMany.queryOptions()
  );

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

  return <div className="p-4">{JSON.stringify(data, null, 2)}</div>;
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
