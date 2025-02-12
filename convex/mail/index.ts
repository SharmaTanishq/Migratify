"use node";

import { v } from "convex/values";
import { action } from "../_generated/server";

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SEND_GRID_API_KEY!);

export const sendMailAction = action({
  args: { to: v.string(), text: v.string() },
  handler: async (ctx, args: any) => {
    console.log(args.to, args.text, "Here is to and text");
    const msg = {
      to: args.to, // Change to your recipient
      from: "support@litcoco.com", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: args.text,
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
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
