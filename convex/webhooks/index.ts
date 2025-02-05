
import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "../_generated/server";
import { Id } from "../_generated/dataModel";



export const createWebhook = mutation({
  args: {
    projectId: v.string(),
    nodeId: v.string(),
    events: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    
    
    const webhook = await ctx.db.insert("webhooks", {
      projectId: args.projectId,
      nodeId: args.nodeId,
      secret:args.nodeId,
      url: `${process.env.CONVEX_URL}/webhook/${args.nodeId}`,
      events: args.events,
      isActive: true,
    });

    return {
      id: webhook,
      secret:args.nodeId,
      url: `${process.env.NEXT_PUBLIC_CONVEX_URL}/webhook/${args.nodeId}`,
    };
  },
});

export const updateWebhookEvents = mutation({
    args:{
        webhookId:v.id("webhooks"),
        events:v.array(v.string())
    },
    handler:async(ctx,args)=>{
        await ctx.db.patch(args.webhookId,{
            events:args.events
        })
    }
})

export const validateWebhook = internalQuery({
  args: { secret: v.string() },
  handler: async (ctx, args) => {
    const webhook = await ctx.db
      .query("webhooks")
      .filter((q) => q.eq(q.field("secret"), args.secret))
      .first();

    if (!webhook || !webhook.isActive) {
      throw new Error("Invalid or inactive webhook");
    }

    return webhook;
  },
});

export const getWebhookUrl = query({
  args: {
    nodeId: v.id("nodes"),
  },
  handler: async (ctx, args) => {
    return ctx.db.query("webhooks").filter((q) => q.eq(q.field("nodeId"), args.nodeId)).first();
  },
});

export const processWebhookEvent = internalMutation({
  args: {
    webhookId: v.id("webhooks"),
    payload: v.any(),
  },
  handler: async (ctx, args) => {
    // Store the webhook event
    await ctx.db.insert("webhookEvents", {
      webhookId: args.webhookId,
      payload: args.payload,
      processedAt: Date.now(),
    });

    // Update last called timestamp
    await ctx.db.patch(args.webhookId, {
      lastCalled: Date.now(),
    });

    return true;
  },
});