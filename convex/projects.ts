import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createProject = mutation({
  args: {
    projectName: v.string(),
    projectDescription: v.string(),
    ecommercePlatform: v.string(),
    integration: v.array(v.object({ label: v.string() })),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();    
    
    const response = await ctx.db.insert("projects", {
      userId: identity?.tokenIdentifier!,
      projectName: args.projectName,
      projectDescription: args.projectDescription,
      ecommercePlatform:args.ecommercePlatform,
      integration: 
        args.integration
      ,
    });

    return {
      projectId: response,
      userId: identity?.tokenIdentifier,
    };
  },
});

export const listProjects = query({
    args:{},
    handler:async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();
        const data =  await ctx.db
        .query("projects")
        .filter((q) => q.eq(q.field("userId"), identity?.tokenIdentifier))        
        .collect();

        return data ;
    }
})

export const getProjectById = query({ 
    args:{projectId:v.id("projects")},
    handler:async(ctx,args)=>{
        return ctx.db
        .query("projects")
        .filter((q) => q.eq(q.field("_id"), args.projectId))
        .collect();
    }
})
