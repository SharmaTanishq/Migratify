import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

/**
 * addNode - Mutation to add a new node to the flow
 * @param {string} projectId - Unique identifier for the project
 * @param {any} data - Node data containing label and other properties
 * @param {string} nodeId - Unique identifier for the node
 * @param {object} measured - Node dimensions
 * @param {number} measured.height - Height of the node in pixels
 * @param {number} measured.width - Width of the node in pixels
 * @param {object} position - Node position coordinates
 * @param {number} position.x - X coordinate position
 * @param {number} position.y - Y coordinate position
 * @param {string} type - Type of node (e.g. 'vtexNode', 'fileUploadNode', etc)
 * @returns {Promise} - Returns promise that resolves when node is inserted
 */

export const addNode = mutation({
  args: {
    projectId: v.string(),
    data: v.any(),
    id: v.string(),
    measured: v.object({ height: v.number(), width: v.number() }),
    position: v.object({ x: v.number(), y: v.number() }),
    type: v.string() || v.any(),
  },
  handler: async (ctx, { projectId, data, id, measured, position, type }) => {
    await ctx.db.insert("nodes", {
      projectId,
      data,
      id,
      measured,
      position,
      type,
    });
  },
});

export const updateNodePosition = mutation({
  args: {
    nodeId: v.id("nodes"),
    position: v.object({
      x: v.number(),
      y: v.number(),
    }),
  },
  handler: async (ctx, { nodeId, position }) => {
    await ctx.db.patch(nodeId, { position });
  },
});

export const deleteNodes = mutation({
  args: {
    passedId: v.string(),
  },
  handler: async (ctx, args) => {
    // First find the document by its node id
    const node = await ctx.db
      .query("nodes")
      .filter((q) => q.eq(q.field("id"), args.passedId))
      .first();
    if (!node) {
      throw new Error("Node not found");
    }

    // Now we can delete using the document _id
    await ctx.db.delete(node._id);
  },
});

export const updateNodes = mutation({
  args: {
    nodes: v.array(
      v.object({
        _id: v.id("nodes"),
        data: v.any(),
        id: v.string(),
        measured: v.object({
          height: v.number(),
          width: v.number(),
        }),
        position: v.object({
          x: v.number(),
          y: v.number(),
        }),
        type: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Update each node in parallel
    await Promise.all(
      args.nodes.map(async (node) => {
        await ctx.db.patch(node._id, {
          data: node.data,
          id: node.id,
          measured: node.measured,
          position: node.position,
          type: node.type,
        });
      })
    );
  },
});

/**
 * getNodes - Query to fetch all nodes for a project
 * @param {string} projectId - Unique identifier for the project
 * @returns {Promise<Array>} - Returns promise that resolves to array of nodes
 */
export const getNodes = query({
  args: { projectId: v.string() },
  handler: async (ctx, { projectId }) => {
    return await ctx.db
      .query("nodes")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .collect();
  },
});
