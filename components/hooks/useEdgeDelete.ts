import { useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import flowStore  from "@/components/Store/store";
import { Id } from "@/convex/_generated/dataModel";

export const useEdgeDelete = (projectId: string) => {
  const deleteEdgeMutation = useMutation(api.flows.edge.onEdgeDelete.deleteEdge);
  
  const store = flowStore();

  

  const deleteEdge = useCallback(async (id: any) => {
    try {
      // Delete the node
      await deleteEdgeMutation({ 
        edgeId: id as Id<'edges'>,         
      }).then(()=>{
        store.deleteEdge(id)
      });


      toast.success("Edge deleted successfully");
    } catch (error) {
      toast.error("Failed to delete edge");
      console.error("Error deleting edge:", error);
    }
  }, [deleteEdgeMutation, projectId]);

  return { deleteEdge };
};