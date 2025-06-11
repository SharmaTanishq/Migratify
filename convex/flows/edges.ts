import { v } from "convex/values";
import { mutation,query } from "../_generated/server";


export const addEdge = mutation({
  args: {
    projectId: v.string(),
    source:v.string(),
    type:v.string(),
    data:v.optional(v.record(v.string(),v.any())),
    sourceHandle:v.string(),
    target:v.string(),
    targetHandle:v.string(),
    
  },
  handler: async (ctx, { projectId, source, type, sourceHandle, target, targetHandle,data }) => {
    const edgeId = await ctx.db.insert('edges', { projectId, source, type, sourceHandle, target, targetHandle,data });
    return {
      success:true,
      edgeId: edgeId
    }
  }
});

export const getEdges = query({
    args:{projectId:v.string()},
    handler:async(ctx,args)=>{
        return await ctx.db.query('edges').withIndex('by_project',(q)=>q.eq('projectId',args.projectId)).collect();
    }
})