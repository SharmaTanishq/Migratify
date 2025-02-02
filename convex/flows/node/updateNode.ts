import { v } from "convex/values";
import { mutation } from "../../_generated/server";
import { Id } from "../../_generated/dataModel";
import { NodePosition } from "../../Types/node";



export const updateNodePosition = mutation({
    args:{
        nodeId:v.id('nodes'),
        position:v.object({
            x:v.number(),
            y:v.number()
        })
    },
    handler:async(ctx, {nodeId,position}:{nodeId:Id<'nodes'>,position:NodePosition})=>{
        await ctx.db.patch(nodeId,{
            position
        })
        return {
            success:true,
            message:"Node position updated successfully"
        }
    }       
})