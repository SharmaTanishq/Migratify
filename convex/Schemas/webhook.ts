import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

 const WebhookEventSubscription = 
     defineTable({
    name: v.string(),
    description: v.string(),
    type: v.string(),
    url: v.string(),
    headers: v.array(v.object({
      name: v.string(),
      value: v.string(),
    })),
    body: v.string(),
    method: v.string(),
    bodyType: v.string(),
    bodyFormat: v.string(),
   
  })

  export default WebhookEventSubscription;
