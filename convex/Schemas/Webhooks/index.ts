import { defineTable } from "convex/server";
import { v } from "convex/values";

const webhooks = defineTable({
    projectId: v.string(),
    nodeId: v.string(),
    connectedSource:v.object({
      nodeId:v.string(),
      platform:v.string()
    }),
  
    secret: v.string(),
    url: v.string(),
    events: v.array(v.object({
        event:v.string(),
        isActive:v.boolean()
    })),
    isActive: v.boolean(),
    lastCalled: v.optional(v.number()), // Unix timestamp
  }).index('by_node',['nodeId','connectedSource'])

  export {webhooks};