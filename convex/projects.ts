import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createProject = mutation({
  args: {
    projectName: v.string(),
    projectDescription: v.string(),
    ecommercePlatform: v.string(),
    integration: v.array(v.object({ label: v.string() })),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();    
    
    const response = await ctx.db.insert("projects", {
      userId: identity?.tokenIdentifier!,
      projectName: args.projectName,
      projectDescription: args.projectDescription,
      ecommercePlatform:args.ecommercePlatform,
      integration: 
        args.integration
      ,
    });

    return {
      projectId: response,
      userId: identity?.tokenIdentifier,
    };
  },
});

export const listProjects = query({
    args:{},
    handler:async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();
        const data =  await ctx.db
        .query("projects")
        .filter((q) => q.eq(q.field("userId"), identity?.tokenIdentifier))        
        .collect();

        return data ;
    }
})

export const getProjectById = query({ 
    args:{projectId:v.id("projects")},
    handler:async(ctx,args)=>{
        return ctx.db
        .query("projects")
        .filter((q) => q.eq(q.field("_id"), args.projectId))
        .collect();
    }
})

export const deleteProject = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    // 1. Confirm project exists and belongs to user
    const project = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("_id"), args.projectId))
      .first();
    if (!project) {
      throw new Error("Project not found");
    }
    if (project.userId !== identity.tokenIdentifier) {
      throw new Error("Unauthorized");
    }

    // 2. Delete all flows
    const flows = await ctx.db
      .query("flows")
      .filter((q) => q.eq(q.field("projectId"), args.projectId))
      .collect();
    for (const flow of flows) {
      await ctx.db.delete(flow._id);
    }

    // 3. Delete all nodes and collect their IDs
    const nodes = await ctx.db
      .query("nodes")
      .filter((q) => q.eq(q.field("projectId"), args.projectId))
      .collect();
    const nodeIds = nodes.map((node) => node._id);
    for (const node of nodes) {
      await ctx.db.delete(node._id);
    }

    // 4. Delete all nodeConfigurations and webhookEvents for each node
    for (const nodeId of nodeIds) {
      // nodeConfigurations
      const nodeConfigs = await ctx.db
        .query("nodeConfigurations")
        .filter((q) => q.eq(q.field("nodeId"), nodeId))
        .collect();
      for (const config of nodeConfigs) {
        await ctx.db.delete(config._id);
      }
      // webhookEvents
      const webhookEvents = await ctx.db
        .query("webhookEvents")
        .filter((q) => q.eq(q.field("nodeId"), nodeId))
        .collect();
      for (const event of webhookEvents) {
        await ctx.db.delete(event._id);
      }
    }

    // 5. Delete all edges
    const edges = await ctx.db
      .query("edges")
      .filter((q) => q.eq(q.field("projectId"), args.projectId))
      .collect();
    for (const edge of edges) {
      await ctx.db.delete(edge._id);
    }

    // 6. Delete all webhooks
    const webhooks = await ctx.db
      .query("webhooks")
      .filter((q) => q.eq(q.field("projectId"), args.projectId))
      .collect();
    for (const webhook of webhooks) {
      await ctx.db.delete(webhook._id);
    }

    // 7. Delete all dataMappings
    const dataMappings = await ctx.db
      .query("dataMappings")
      .filter((q) => q.eq(q.field("projectId"), args.projectId))
      .collect();
    for (const mapping of dataMappings) {
      await ctx.db.delete(mapping._id);
    }

    // 8. Delete all variables
    const variables = await ctx.db
      .query("variables")
      .filter((q) => q.eq(q.field("projectId"), args.projectId))
      .collect();
    for (const variable of variables) {
      await ctx.db.delete(variable._id);
    }

    // 9. Delete the project itself
    await ctx.db.delete(args.projectId);

    return { success: true };
  },
});
