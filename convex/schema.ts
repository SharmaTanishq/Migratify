// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  {
    documents: defineTable({
      fieldOne: v.string(),
      fieldTwo: v.object({
        subFieldOne: v.array(v.number()),
      }),
    }),
   
    projects:defineTable({
      
      userId:v.string(),
      projectName:v.string(),
      projectDescription:v.string(),
      ecommercePlatform:v.string(),
      integration:v.array(v.object({label:v.string()}))
      
      
    }).index("by_user",["userId"]),      
    // This definition matches the example query and mutation code:
    numbers: defineTable({
      value: v.number(),
    }),

    nodes:defineTable({
      projectId:v.string(),
      data:v.any(),
      id:v.union(v.id("nodes"),v.null()),
      measured:v.object({height:v.number(),width:v.number()}),
      position:v.object({x:v.number(),y:v.number()}),
      type:v.string(),
    }).index("by_project",["projectId"]),

    nodeConfigurations:defineTable({
      nodeId:v.id('nodes'),
      configurations:v.any()
    }).index("by_node",["nodeId"]),

    edges:defineTable({
      projectId:v.string(),
      source:v.string(),
      sourceHandle:v.string(),
      target:v.string(),
      targetHandle:v.string(),
     

    }).index("by_project",["projectId"]),

    flows: defineTable({
      projectId: v.string(),
      nodes: v.array(v.any()),
      edges: v.array(v.any()),
    })
      .index('by_project', ['projectId']),

    webhooks: defineTable({
        projectId: v.string(),
        nodeId: v.string(),
        connectedSource:v.object({
          nodeId:v.string(),
          platform:v.string()
        }),
      
        secret: v.string(),
        url: v.string(),
        events: v.array(v.object({
            event:v.string(),
            isActive:v.boolean()
        })),
        isActive: v.boolean(),
        lastCalled: v.optional(v.number()), // Unix timestamp
      }).index('by_node',['nodeId','connectedSource']),

    webhookEvents: defineTable({
        
        nodeId:v.id("nodes"),
        payload: v.any(),
        processedAt: v.number(),
        
      }).index('by_node', ['nodeId']),

      dataMappings: defineTable({
        nodeId: v.string(), // ID of the node this mapping belongs to
        projectId: v.string(), // Project ID
        mappings: v.array(v.object({
          id: v.string(),
          targetField: v.string(),
          sourceField: v.string(),
          type: v.string(),
          isActive: v.boolean(),
        })),
        createdAt: v.number(),
        updatedAt: v.number(),
      })
    
  },
  
  // If you ever get an error about schema mismatch
  // between your data and your schema, and you cannot
  // change the schema to match the current data in your database,
  // you can:
  //  1. Use the dashboard to delete tables or individual documents
  //     that are causing the error.
  //  2. Change this option to `false` and make changes to the data
  //     freely, ignoring the schema. Don't forget to change back to `true`!
  { schemaValidation: true }
);
