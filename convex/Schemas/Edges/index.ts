import { defineTable } from "convex/server";
import { v } from "convex/values";

const edges = defineTable({
    projectId:v.string(),
    source:v.string(),
    sourceHandle:v.string(),
    type:v.string(),
    target:v.string(),
    targetHandle:v.string(),
   

  }).index("by_project",["projectId"])

  export {edges};