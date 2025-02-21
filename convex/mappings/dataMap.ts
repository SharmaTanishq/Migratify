import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const saveMappings = mutation({
  args: {
    nodeId: v.string(),
    projectId: v.string(),
    mappings: v.array(v.object({
      id: v.string(),
      targetField: v.string(),
      sourceField: v.string(),
      type: v.string(),
      isActive: v.boolean(),
    })),
  },
  handler: async (ctx, args) => {
    // Find existing mapping
    const existing = await ctx.db
      .query("dataMappings")
      .filter((q) => q.eq(q.field("nodeId"), args.nodeId))
      .first();

    if (existing) {
      // Update existing mapping
      return await ctx.db.patch(existing._id, {
        mappings: args.mappings,
        updatedAt: Date.now(),
      });
    }

    // Create new mapping
    return await ctx.db.insert("dataMappings", {
      nodeId: args.nodeId,
      projectId: args.projectId,
      mappings: args.mappings,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const getMappings = query({
  args: { nodeId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("dataMappings")
      .filter((q) => q.eq(q.field("nodeId"), args.nodeId))
      .first();
  },
});