import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useGetNodes = (projectId: string) => {
    
  if (!projectId) return { nodes: [] };
  const nodes = useQuery(
    api.flows.nodes.getNodes,
    projectId ? { projectId } : "skip"  // Skip query if no projectId
  );

  return {
    nodes: nodes ?? [],  // Provide default empty array
    isLoading: nodes === undefined && projectId !== undefined,
    error: nodes === undefined && projectId !== undefined ? new Error("Failed to fetch nodes") : null
  };
};
