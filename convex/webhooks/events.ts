import { v } from "convex/values"
import {query} from "../_generated/server"

export const getWebhookEvents = query({
    args:{
        nodeId:v.id("nodes")
    },
    handler:async(ctx,args)=>{
        if(args.nodeId === null || undefined) return null;
        return ctx.db.query("webhookEvents")
            .filter((q) => q.eq(q.field("nodeId"), args.nodeId))
            .order("desc")
            .first();        
    }
})