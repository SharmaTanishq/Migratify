import { action, mutation } from "../../_generated/server";
import { v } from "convex/values";
import { sendEmailResend } from "./Resend";
import { internal } from "../../_generated/api";

export const TriggerMail = action({
  args: {
    event: v.string(),
    platform: v.object({
      target: v.string(),
      source: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { event, platform } = args;

    await ctx
      .runAction(internal.Integrations.Mail.Resend.index.sendEmailResend, {
        to: platform.target,
        subject: platform.source,
        text: platform.source,
      })
      .then((res) => {
        return res;
      });
  },
});
