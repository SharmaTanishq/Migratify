"use node";

import { v } from "convex/values";
import { internalAction } from "../../../_generated/server";
import { Resend } from "resend";

const resend = new Resend('re_Et9wLXGC_Hq5WfsJVMCEVuTa3WuCuPLwY');

export const sendEmailResend = internalAction({
    args: {
        to: v.string(),
        subject: v.string(),
        text: v.string(),
    },
    handler: async (ctx, { to, subject, text }) => {
        //CHECK IF IT's Connected.
        //const connectedNode = await ctx.db.query('nodes').filter((q) => q.eq(q.field('_id'), ''))
        //Check which platform it's connected to.
        //Then Check for API KEYs and Secrets.
        //Then Check for Events or template Id's.
        //Figure out how to fetch enabled events and what event was triggered.
        const {data, error} = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['tanishqsharma.sharma+resend@gmail.com'],
            subject: 'Hello World',
            html: '<strong>It works!</strong>',
        })
        if (error) {
            console.error(error)
            return {
                success: false,
                message: "Email sent failed",
            }
        }
        return {
            success: true,
            message: data?.id,
        }
    }
})