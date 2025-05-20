// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { StreamIdValidator } from "@convex-dev/persistent-text-streaming";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import WebhookEventSubscription from "./Schemas/webhook";
import { flows, projects } from "./Schemas/Project";
import { nodes } from "./Schemas/Nodes";
import { nodeConfigurations } from "./Schemas/Nodes";
import { edges } from "./Schemas/Edges";
import { webhooks } from "./Schemas/Webhooks";
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
    WebhookEventSubscription,

    projects,

    nodes,

    nodeConfigurations,

    edges,

    flows,

    webhooks,

    webhookEvents: defineTable({
      nodeId: v.id("nodes"),
      payload: v.any(),
      processedAt: v.number(),
    }).index("by_node", ["nodeId"]),

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
          validation: v.optional(
            v.object({
              required: v.optional(v.boolean()),
              pattern: v.optional(v.string()),
              min: v.optional(v.number()),
              max: v.optional(v.number()),
            })
          ),
          metadata: v.optional(
            v.object({
              lastModifiedBy: v.optional(v.string()),
              description: v.optional(v.string()),
              tags: v.optional(v.array(v.string())),
            })
          ),
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
              validation: v.optional(
                v.object({
                  required: v.optional(v.boolean()),
                  pattern: v.optional(v.string()),
                  min: v.optional(v.number()),
                  max: v.optional(v.number()),
                })
              ),
              metadata: v.optional(
                v.object({
                  lastModifiedBy: v.optional(v.string()),
                  description: v.optional(v.string()),
                  tags: v.optional(v.array(v.string())),
                })
              ),
            })
          ),
        })
      ),
      version: v.number(),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("by_nodeId", ["nodeId"])
      .index("by_projectId", ["projectId"]),

    variables: defineTable({
      projectId: v.string(),
      name: v.string(),
      value: v.string(),
      type: v.optional(v.string()),
      isActive: v.optional(v.boolean()),
    }).index("by_projectId", ["projectId"]),

    chats: defineTable({
      title: v.string(),
      prompt: v.string(),
      stream: StreamIdValidator,
    }).index("by_stream", ["stream"]),

    generationStreams: defineTable({
      html: v.string(),
      isDone: v.boolean(),
      templateId: v.string(),
    }).index("by_templateId", ["templateId"]),
  },

  { schemaValidation: true }
);
