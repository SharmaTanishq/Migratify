import { defineTable } from "convex/server";
import { v } from "convex/values";

const nodes = defineTable({
    projectId:v.string(),
    data:v.any(),
    id:v.union(v.id("nodes"),v.null()),
    measured:v.object({height:v.number(),width:v.number()}),
    position:v.object({x:v.number(),y:v.number()}),
    type:v.string(),
  }).index("by_project",["projectId"])

const nodeConfigurations = defineTable({
    nodeId:v.id('nodes'),
    configurations:v.any()
  }).index("by_node",["nodeId"])

  export {nodes,nodeConfigurations};