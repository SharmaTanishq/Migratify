import { v } from "convex/values";
import { mutation,query } from "../_generated/server";


export const addEdge = mutation({
  args: {
    projectId: v.string(),
    source:v.string(),
      sourceHandle:v.string(),
      target:v.string(),
      targetHandle:v.string(),
    
  },
  handler: async (ctx, { projectId, source, sourceHandle, target, targetHandle }) => {
    const edgeId = await ctx.db.insert('edges', { projectId, source, sourceHandle, target, targetHandle });
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