import { defineTable } from "convex/server";
import { v } from "convex/values";

export const projects = defineTable({
      
    userId:v.string(),
    projectName:v.string(),
    projectDescription:v.string(),
    ecommercePlatform:v.string(),
    integration:v.array(v.object({label:v.string()}))
    
    
  }).index("by_user",["userId"])

  export const flows = defineTable({
    projectId: v.string(),
    nodes: v.array(v.any()),
    edges: v.array(v.any()),
  })
    .index('by_project', ['projectId'])

 

