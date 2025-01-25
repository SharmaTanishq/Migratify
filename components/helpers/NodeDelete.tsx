import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";

export const NodeDelete = async (node: any, projectId: string) => {
  try {
    // Delete the node from your database
    const deleteNode = useMutation(api.flows.node.deleteNode.deleteNode);
    await deleteNode({ 
      nodeId: node.id,      
    });

    // Delete associated edges
    // const deleteEdges = await api.flows.edges.deleteEdgesByNode.useMutation();
    // await deleteEdges({ 
    //   nodeId: node.id,
    //   projectId: projectId 
    // });

    toast.success("Node deleted successfully");
  } catch (error) {
    toast.error("Failed to delete node");
    console.error("Error deleting node:", error);
  }
};