import { mutation, query } from '../_generated/server';
import { v } from 'convex/values';

export const addNode = mutation({
  args: {
    projectId: v.string(),
    data:v.any(),
    nodeId:v.string(),
    measured:v.object({height:v.number(),width:v.number()}),
    position:v.object({x:v.number(),y:v.number()}),
    type:v.string(),
  },
  handler: async (ctx, { projectId, data, nodeId, measured, position, type }) => {
    await ctx.db.insert('nodes', { projectId, data, nodeId, measured, position, type });
  }
})

export const saveNodes = mutation({
  args: {
    projectId: v.string(),
    nodes: v.array(v.any()),
    edges: v.array(v.any())
  },
  handler: async (ctx, { projectId, nodes, edges }) => {
    // Save or update the flow data for the project
    const existingFlow = await ctx.db
      .query('flows')
      .withIndex('by_project', (q) => q.eq('projectId', projectId))
      .first();

    if (existingFlow) {
      await ctx.db.patch(existingFlow._id, { nodes, edges });
    } else {
      await ctx.db.insert('flows', {
        projectId,
        nodes,
        edges,
      });
    }
  },
});

export const getNodes = query({
  args: { projectId: v.string() },
  handler: async (ctx, { projectId }) => {
    return await ctx.db
      .query('nodes')
      .withIndex('by_project', (q) => q.eq('projectId', projectId))
      .collect();
  },
}); 