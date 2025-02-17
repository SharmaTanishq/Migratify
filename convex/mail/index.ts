"use node";

import { v } from "convex/values";
import { action } from "../_generated/server";

import sgMail from "@sendgrid/mail";
import { processVtexWebhook, WebhookConfig } from "../webhooks/handlers";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SEND_GRID_API_KEY!);


//Initial Node will have the data of the E-commerce platform and the eventData will have the data of the event.
//From the E-Commerce platform, we will get the data of the order or entity that was created or updated.

export const sendMailAction = action({
  args: { to: v.string(), text: v.string(),eventData:v.any(),initialNode:v.any() },
  handler: async (ctx, args: any) => {
    console.log(args.to, args.text, "Here is to and text");
    const msg = {
      to: args.to, // Change to your recipient
      from: "support@litcoco.com", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: args.text,
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    const processedData = await processWebhookData(args.initialNode, args.eventData);
    try {
      const [response] = await sgMail.send(msg);
      return {
        success: true,
        statusCode: response.statusCode,
        messageId: response.headers["x-message-id"],
      };
    } catch (error: any) {
      console.error("Error sending email:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
});

async function processWebhookData(config: WebhookConfig, eventData: any) {
  const handlers = {
    vtex: processVtexWebhook,
    // Add more platform handlers here
  };

  const handler = handlers[config.platform as keyof typeof handlers];
  if (!handler) {
    throw new Error(`Unsupported platform: ${config.platform}`);
  }

  return handler(config.event, eventData);
}
