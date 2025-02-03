import { useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import flowStore from "@/components/Store/store";


export const useNodeDelete = (projectId: string) => {
  const deleteNodeMutation = useMutation(api.flows.node.deleteNode.deleteNode);
  const {deleteEdge} = flowStore();
  //const deleteEdgesMutation = useMutation(api.flows.edges.deleteEdgesByNode);

  const deleteNode = useCallback(async (id: any) => {
    try {
      // Delete the node
      await deleteNodeMutation({ 
        nodeId: id,         
      }).then(()=>{
        deleteEdge(id);
      });

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
  }, [deleteNodeMutation, projectId]);

  return { deleteNode };
};