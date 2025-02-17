
import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "../_generated/server";
import { Id } from "../_generated/dataModel";



export const createWebhook = mutation({
  args: {
    projectId: v.string(),
    nodeId: v.string(),
    connectedSource:v.object({
      nodeId:v.string(),
      platform:v.string()
    }),
    events: v.array(v.object({
      event:v.string(),
      isActive:v.boolean()
    })),
  },
  handler: async (ctx, args) => {
    
    
    const webhook = await ctx.db.insert("webhooks", {
      projectId: args.projectId,
      nodeId: args.nodeId,
      connectedSource:args.connectedSource,
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
        events:v.array(v.object({
            event:v.string(),
            isActive:v.boolean()
        }))
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



export const processWebhookEvent = mutation({
  args: {
    nodeId: v.id("nodes"),    
    payload: v.any(),
  },
  handler: async (ctx, args) => {
    
    //const webhook = await ctx.db.get(args.webhookId)

    //const nodeId = webhook?.nodeId as Id<"nodes">
    // Store the webhook event
    await ctx.db.insert("webhookEvents", {
      nodeId: args.nodeId ,      
      payload: args.payload,
      processedAt: Date.now(),      
    });

    const getWebhookByNodeId = await ctx.db.query("webhooks").filter((q)=>q.eq(q.field("nodeId"),args.nodeId)).first()
    // Update last called timestamp
    await ctx.db.patch(getWebhookByNodeId?._id as Id<"webhooks">, {
      lastCalled: Date.now(),
    });

    return true;
  },
});