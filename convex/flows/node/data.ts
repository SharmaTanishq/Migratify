
import { mutation } from "../../_generated/server";
import { Id } from "../../_generated/dataModel";
import { v } from "convex/values";


export const saveNodeConfigurations = mutation({
    args:{
        nodeId:v.id('nodes'),
        configurations:v.any()
    },
    handler:async(ctx, {nodeId,configurations}:{nodeId:Id<'nodes'>,configurations:any})=>{

        const existingConfig = await ctx.db
          .query("nodeConfigurations")
          .withIndex("by_node", (q) => q.eq("nodeId", nodeId))
          .first();

        
        
        if (existingConfig) {
          await ctx.db.patch(existingConfig._id, {
            configurations
          });
          return {
            success: true,
            message: "Node configurations updated successfully"
          };
        }
        await ctx.db.insert('nodeConfigurations',{
            nodeId,
            configurations
        })
        return {
            success:true,
            message:"Node configurations saved successfully"
        }
    }
})