// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export interface DataMapping {
  nodeId: string;
  projectId: string;
  mappings: {
    global: Array<{
      fieldId: string;
      value: string;
      enabled: boolean;
      type: string;
      isActive: boolean;
    }>;
    events: Array<{
      eventName: string;
      fields: Array<{
        fieldId: string;
        value: string;
        enabled: boolean;
        type: string;
        isActive: boolean;
      }>;
    }>;
  };
  createdAt: number;
  updatedAt: number;
}

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
        nodeId: v.string(),
        projectId: v.string(),
        globalFields: v.array(
          v.object({
            fieldId: v.string(),
            value: v.string(),
            enabled: v.boolean(),
            type: v.string(),
            isActive: v.boolean(),
            validation: v.optional(v.object({
              required: v.optional(v.boolean()),
              pattern: v.optional(v.string()),
              min: v.optional(v.number()),
              max: v.optional(v.number())
            })),
            metadata: v.optional(v.object({
              lastModifiedBy: v.optional(v.string()),
              description: v.optional(v.string()),
              tags: v.optional(v.array(v.string()))
            }))
          })
        ),
        eventFields: v.array(
          v.object({
            eventName: v.string(),
            fields: v.array(
              v.object({
                fieldId: v.string(),
                value: v.string(),
                enabled: v.boolean(),
                type: v.string(),
                isActive: v.boolean(),
                validation: v.optional(v.object({
                  required: v.optional(v.boolean()),
                  pattern: v.optional(v.string()),
                  min: v.optional(v.number()),
                  max: v.optional(v.number())
                })),
                metadata: v.optional(v.object({
                  lastModifiedBy: v.optional(v.string()),
                  description: v.optional(v.string()),
                  tags: v.optional(v.array(v.string()))
                }))
              })
            )
          })
        ),
        version: v.number(),
        createdAt: v.number(),
        updatedAt: v.number(),
      })
      .index('by_nodeId', ['nodeId'])
      .index('by_projectId', ['projectId']),

    variables: defineTable({
      projectId: v.string(),
      name: v.string(),
      value: v.string(),
      type: v.optional(v.string()),
      isActive: v.optional(v.boolean()),
    }).index('by_projectId', ['projectId']),
    
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
