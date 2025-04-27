import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { MutationCtx, QueryCtx } from "../_generated/server";
import { Doc, Id } from "../_generated/dataModel";

// Helper type for field structure
type FieldConfig = {
  fieldId: string;
  value: string;
  enabled: boolean;
  type: string;
  isActive: boolean;
  validation?: {
    required?: boolean;
    pattern?: string;
    min?: number;
    max?: number;
  };
  metadata?: {
    lastModifiedBy?: string;
    description?: string;
    tags?: string[];
  };
};

export const saveDataMappings = mutation({
  args: {
    nodeId: v.string(),
    projectId: v.string(),
    globalFields: v.optional(v.array(
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
    )),
    eventFields: v.optional(v.array(
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
    ))
  },
  handler: async (ctx: MutationCtx, args) => {
    const { nodeId, projectId, globalFields, eventFields } = args;

    // Find existing mapping
    const existingMapping = await ctx.db
      .query("dataMappings")
      .withIndex("by_nodeId", (q) => q.eq("nodeId", nodeId))
      .filter((q) => q.eq(q.field("projectId"), projectId))
      .first();

    const now = Date.now();

    if (existingMapping) {
      // Update existing mapping
      const updateObj: any = {
        updatedAt: now,
        version: existingMapping.version + 1,
      };

      if (globalFields !== undefined) {
        updateObj.globalFields = globalFields;
      }
      if (eventFields !== undefined) {
        updateObj.eventFields = eventFields;
      }

      return await ctx.db.patch(existingMapping._id, updateObj);
    }

    // Create new mapping
    return await ctx.db.insert("dataMappings", {
      nodeId,
      projectId,
      globalFields: globalFields || [],
      eventFields: eventFields || [],
      version: 1,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Get mappings for a node
export const getMappings = query({
  args: { nodeId: v.string() },
  handler: async (ctx: QueryCtx, args) => {
    return await ctx.db
      .query("dataMappings")
      .withIndex("by_nodeId", (q) => q.eq("nodeId", args.nodeId))
      .first();
  },
});

// Get event-specific mappings for a node and event
export const getEventMappings = query({
  args: { 
    nodeId: v.string(),
    eventName: v.string() 
  },
  handler: async (ctx: QueryCtx, args) => {
    const mapping = await ctx.db
      .query("dataMappings")
      .withIndex("by_nodeId", (q) => q.eq("nodeId", args.nodeId))
      .first();

    if (!mapping) return null;

    const eventMapping = mapping.eventFields.find(
      (ef: any) => ef.eventName === args.eventName
    );

    if (!eventMapping) {
      // Return global fields as fallback
      return {
        eventName: args.eventName,
        fields: mapping.globalFields
      };
    }

    // Merge global fields with event fields
    const globalFieldsMap = new Map(
      mapping.globalFields.map((field: FieldConfig) => [field.fieldId, field])
    );

    const mergedFields = eventMapping.fields.map((eventField: FieldConfig) => {
      const globalField = globalFieldsMap.get(eventField.fieldId);
      if (!globalField) return eventField;

      return {
        ...globalField,
        ...eventField,
        validation: {
          ...globalField.validation,
          ...eventField.validation
        },
        metadata: {
          ...globalField.metadata,
          ...eventField.metadata
        }
      };
    });

    return {
      eventName: args.eventName,
      fields: mergedFields
    };
  },
});

// Get all mappings for a project
export const getProjectMappings = query({
  args: { projectId: v.string() },
  handler: async (ctx: QueryCtx, args) => {
    return await ctx.db
      .query("dataMappings")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
}); 