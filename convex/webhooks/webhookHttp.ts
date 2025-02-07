import { httpAction } from "../_generated/server";
import { internal } from "../_generated/api";

import { Id } from "../_generated/dataModel";





export const webhookAction = httpAction(async (ctx, request) => {

    //const data = await request.json()
    console.log("params",request.body)
//   const { author, body } = await request.json();
//   console.log("author",author)  

    // await ctx.runMutation(internal.webhooks.index.processWebhookEvent, {
    //     webhookId:"webhookId" as Id<"webhooks">,
    //     payload : data
    // })
//   await ctx.runMutation(internal.webhooks.index.processWebhookEvent, {
//    payload : {
//     author,
//     body
//    },
//    webhookId: "webhookId" as Id<"webhooks">
   
//   });

  return new Response(null, {
    status: 200,
  });
});


// http.route({
//   path: "/webhook/:secret",
//   method: "POST",
//   handler: async (ctx, request) => {
//     const secret = request.params.secret;

//     try {
//       // Validate webhook
//       const webhook = await ctx.runQuery(internal.webhooks.index.validateWebhook, { 
//         secret 
//       });

//       // Get request payload
//       const payload = await request.json();

//       // Process webhook event
//       await ctx.runMutation(internal.webhooks.index.processWebhookEvent, {
//         webhookId: webhook._id,
//         payload,
//       });

//       return new Response(JSON.stringify({ success: true }), {
//         status: 200,
//       });
//     } catch (error) {
//       return new Response(
//         JSON.stringify({ error: "Webhook processing failed" }),
//         { status: 500 }
//       );
//     }
//   },
// });

