import { v } from "convex/values";
import { mutation } from "../../_generated/server";
import { Id } from "../../_generated/dataModel";

export const deleteNode = mutation({
    args:{        
        nodeId:v.id('nodes')
    },
    handler:async(ctx, {nodeId}:{nodeId:Id<'nodes'>})=>{
        await ctx.db.delete(nodeId);
        return {
            success:true,
            message:"Node deleted successfully"
        }
    }
})