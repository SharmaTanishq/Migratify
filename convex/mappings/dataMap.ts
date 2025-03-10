import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const saveDataMappings = mutation({
  args: {
    nodeId: v.string(),
    projectId: v.string(),
    mappings: v.object({
      global: v.array(v.object({
        fieldId: v.string(),
        value: v.string(),
        enabled: v.boolean(),
        type: v.string(),
        isActive: v.boolean(),
      })),
      events: v.array(v.object({
        eventName: v.string(),
        fields: v.array(v.object({
          fieldId: v.string(),
          value: v.string(),
          enabled: v.boolean(),
          type: v.string(),
          isActive: v.boolean(),
        }))
      }))
    })
  },
  handler: async (ctx, args) => {
    const { nodeId, projectId, mappings } = args;
    const timestamp = Date.now();

    // Check if mapping already exists for this node
    const existingMapping = await ctx.db
      .query("dataMappings")
      .withIndex("by_nodeId", (q) => q.eq("nodeId", nodeId))
      .first();

    if (existingMapping) {
      // Update existing mapping
      return await ctx.db.patch(existingMapping._id, {
        mappings,
        updatedAt: timestamp
      });
    } else {
      // Create new mapping
      return await ctx.db.insert("dataMappings", {
        nodeId,
        projectId,
        mappings,
        createdAt: timestamp,
        updatedAt: timestamp
      });
    }
  }
});

export const getDataMappings = query({
  args: { nodeId: v.string() },
  handler: async (ctx, args) => {
    const mapping = await ctx.db
      .query("dataMappings")
      .withIndex("by_nodeId", (q) => q.eq("nodeId", args.nodeId))
      .first();

    if (!mapping) {
      return null;
    }

    return mapping;
  }
});

export const getProjectMappings = query({
  args: { projectId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("dataMappings")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .collect();
  }
}); 