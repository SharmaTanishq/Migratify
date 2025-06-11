

import { Hono } from "hono";
import { HonoWithConvex, HttpRouterWithHono } from "convex-helpers/server/hono";
import { upgradeWebSocket } from "hono/cloudflare-workers";
import { prettyJSON } from "hono/pretty-json";
import { ActionCtx, httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { toolHandlers } from "./utils/toolHandlers";





const app: HonoWithConvex<ActionCtx> = new Hono();



app.use(prettyJSON())




app.get("/health",async(c)=>{
  return c.json({status:"ok"})
})

app.post("tool/:id",async(c)=>{

  //We are going to use this call to make a call to the tool. On the way we'll figure out what additional requirements are needed.
  //Let's Start with a simple get weather call

  const toolId = c.req.param("id");
  const runTool = toolHandlers[toolId as keyof typeof toolHandlers];
  const params = await c.req.json();
  const result = await runTool(params);
  return c.json({status:"ok",result:result})
  
  
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
