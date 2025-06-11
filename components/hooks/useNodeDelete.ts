import { useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import flowStore from "@/components/Store/store";
import { Id } from "@/convex/_generated/dataModel";


export const useNodeDelete = (projectId: string) => {
  const deleteNodeMutation = useMutation(api.flows.node.deleteNode.deleteNode);
  const {deleteEdge} = flowStore();
  //const deleteEdgesMutation = useMutation(api.flows.edges.deleteEdgesByNode);
  const deleteNode = async (id: string) => {
    console.log("id", id);
  try {
    // Delete the node
    await deleteNodeMutation({ 
      nodeId: id as Id<"nodes">,         
    })

    // Delete associated edges
  //   await deleteEdgesMutation({ 
  //     nodeId: node.id,
  //     projectId 
  //   });

    toast.success("Node deleted successfully");
  } catch (error) {
    toast.error("Failed to delete node");
    console.error("Error deleting node:", error);
  }
}

  return { deleteNode };
};