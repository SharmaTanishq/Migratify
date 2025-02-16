import { v } from "convex/values";
import { internalAction } from "../../_generated/server";

const sendEmailTwilio = internalAction({
    args: {
        phoneNumber: v.string(),
        message: v.string(),
    },
    handler: async (ctx, { phoneNumber, message }) => {
        //CHECK IF IT's Connected.
        //const connectedNode = await ctx.db.query('nodes').filter((q) => q.eq(q.field('_id'), ''))
        //Check which platform it's connected to.
        //Then Check for API KEYs and Secrets.
        //Then Check for Events or template Id's.
        //Figure out how to fetch enabled events and what event was triggered.
        return {
            success: true,
            message: "Email sent successfully",
        }
    }
})