import { v } from "convex/values";
import { mutation } from "../../_generated/server";

export const deleteEdge = mutation({
    args:{
        edgeId:v.id('edges')
    },
    handler:async(ctx,args)=>{
        await ctx.db.delete(args.edgeId)
        return {
            success:true,
            message:"Edge deleted successfully"
        }
    }
})