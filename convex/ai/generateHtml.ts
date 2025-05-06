import { v } from "convex/values";
import { action, mutation, internalMutation, query } from "../_generated/server";
import OpenAI from "openai";
import { internal } from "../_generated/api";

const openai = new OpenAI({
  
  apiKey: process.env.OPENAI_API_KEY,
});


export const generate = action({
  args: {
    jsonSchema: v.any(),
  },
  handler: async (ctx, args) => {
    

    const templateId = Math.random().toString(36).substring(2);
    
    // Create initial stream
    await ctx.runMutation(internal.ai.generateHtml.initStream, {
      
      templateId,
    });

    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert email template designer. Generate a responsive HTML email template based on the provided JSON schema. Use inline CSS for maximum compatibility. Include media queries for mobile responsiveness. Don't Return any other text than the HTML code. These emails will be transactional emails. For Example, Your Order Has Shipped, Your order been cancelled. You will be receiving those events based on that you'll generate it.",
          },
          {
            role: "user",
            content: `Create an HTML email template using this data: ${JSON.stringify(args.jsonSchema)}`,
          },
        ],
        stream: true,
      });

      let html = '';
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          html += content;
          await ctx.runMutation(internal.ai.generateHtml.updateStream, {
            
            templateId,
            html,
            isDone: false,
          });
        }
      }

      // Mark as done
      await ctx.runMutation(internal.ai.generateHtml.updateStream, {
        
        templateId,
        html,
        isDone: true,
      });
    } catch (error) {
      throw new Error("Failed to generate template: " + error);
    }
  },
});

export const initStream = internalMutation({
  args: {
    
    templateId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("generationStreams", {
      
      html: "",
      isDone: false,
      templateId: args.templateId,
    });
  },
});

export const updateStream = internalMutation({
  args: {
    
    templateId: v.string(),
    html: v.string(),
    isDone: v.boolean(),
  },
  handler: async (ctx, args) => {
    const stream = await ctx.db
      .query("generationStreams")
      .withIndex("by_templateId", (q) => q.eq("templateId", args.templateId))
      .first();

    if (!stream) throw new Error("Stream not found");

    await ctx.db.patch(stream._id, {
      html: args.html,
      isDone: args.isDone,
    });
  },
});

export const getLatestStream = query({
  args: {
    
  },
  handler: async (ctx, args) => {
   
    return await ctx.db
      .query("generationStreams")

      .order("desc")
      .first();
  },
});

