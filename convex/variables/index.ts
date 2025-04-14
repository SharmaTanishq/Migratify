import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const getVariables = query({
  args: {
    projectId: v.string(),
  },
  handler: async (ctx, args) => {
    const variables = await ctx.db.query("variables").filter(q => q.eq(q.field("projectId"), args.projectId)).collect();
    return variables;
  },
});

export const createVariable = mutation({
  args: {
    projectId: v.string(),
    name: v.string(),
    value: v.string(),
    type: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("variables", {
      projectId: args.projectId,
      name: args.name,
      value: args.value,
      type: args.type || "string",
      isActive: args.isActive || true,
    });
  },
});

export const updateVariable = mutation({
  args: {
    id: v.id("variables"),
    name: v.string(),
    value: v.string(),
    type: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      value: args.value,
      type: args.type || "string",
      isActive: args.isActive || true,
    });
  },
});

export const deleteVariable = mutation({
  args: {
    id: v.id("variables"),
  },    
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
