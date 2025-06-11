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
    configurations:v.optional(v.record(v.string(),v.union(v.boolean(),v.string(),v.number(),v.array(v.string())))),

    measured: v.object({ height: v.number(), width: v.number() }),
    position: v.object({ x: v.number(), y: v.number() }),

    type: v.string() || v.any(),
  },
  handler: async (ctx, { projectId, data, measured, position, type, configurations }) => {
    const response = await ctx.db.insert("nodes", {
      projectId,
      data,
      id: null,
      measured,
      position,
      type,
      configurations: configurations || {},
    });
    await ctx.db.patch(response, { id: response });
    return response;
  },
});

//This needs to be removed
/**
 * saveNodes - Mutation to save/update flow data including nodes and edges
 * @param {string} projectId - Unique identifier for the project
 * @param {Array} nodes - Array of node objects in the flow
 * @param {Array} edges - Array of edge objects connecting the nodes
 * @returns {Promise} - Returns promise that resolves when flow is saved
 */

export const saveNodes = mutation({
  args: {
    projectId: v.string(),
    nodes: v.array(v.any()),
    edges: v.array(v.any()),
  },
  handler: async (ctx, { projectId, nodes, edges }) => {
    // Save or update the flow data for the project
    const existingFlow = await ctx.db
      .query("flows")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .first();

    if (existingFlow) {
      await ctx.db.patch(existingFlow._id, { nodes, edges });
    } else {
      await ctx.db.insert("flows", {
        projectId,
        nodes,
        edges,
      });
    }
  },
});

export const handleSettings = mutation({
  args:{
    nodeId:v.id("nodes"),
    configurations:v.record(v.string(),v.union(v.boolean(),v.string(),v.number(),v.array(v.string()))),
  },
  handler:async(ctx,args)=>{
    await ctx.db.patch(args.nodeId, { configurations: args.configurations });
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
