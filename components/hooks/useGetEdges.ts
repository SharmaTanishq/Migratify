import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useGetEdges = (projectId: string) => {
    
  if (!projectId) return { edges: [] };
  const edges = useQuery(
    api.flows.edges.getEdges,
    projectId ? { projectId } : "skip"  // Skip query if no projectId
  );

  return {
    edges: edges ?? [],  // Provide default empty array
    isLoading: edges === undefined && projectId !== undefined,
    error: edges === undefined && projectId !== undefined ? new Error("Failed to fetch edges") : null
  };
};
