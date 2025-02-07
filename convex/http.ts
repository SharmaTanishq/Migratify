

import { Hono } from "hono";
import { HonoWithConvex, HttpRouterWithHono } from "convex-helpers/server/hono";
import { prettyJSON } from "hono/pretty-json";
import { ActionCtx } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

const app: HonoWithConvex<ActionCtx> = new Hono();

app.use(prettyJSON())
//app.post("/webhook/:webhookId")

app.get("/health",async(c)=>{
  return c.json({status:"ok"})
})

app.post("/webhook/:nodeId", async (c) => {
  // Extracting a token from the URL!
  const nodeId = c.req.param("nodeId");
    
  const body = await c.req.json();
  
  await c.env.runMutation(api.webhooks.index.processWebhookEvent,{
    nodeId:nodeId as Id<"nodes">,
    payload:body
  })
    
  return c.json({nodeId:nodeId,body:body});
});

export default new HttpRouterWithHono(app);
