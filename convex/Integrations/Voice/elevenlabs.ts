"use node";
import { v } from "convex/values";
import { action } from "../../_generated/server";
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import { api } from "../../_generated/api";
import { Id } from "../../_generated/dataModel";

export const getAgents = action({
  args: {
    apiKey: v.string(),
  },

  handler: async (ctx, args) => {
    const elevenlabs = new ElevenLabsClient({
      apiKey: args.apiKey,
    });

    const agents = await elevenlabs.conversationalAi.agents.list();
    return agents;
  },
});

export const addTool = action({
  args: {
    sourceId: v.id("nodes"),
    agentId: v.string(),
    toolId: v.string(),
  },

  handler: async (ctx, args) => {
    const configurations = (await ctx.runQuery(
      api.flows.node.data.getNodeConfigurations,
      {
        nodeId: args.sourceId as Id<"nodes">,
      }
    )) as any;

    const apiKey = configurations?.configurations?.apiKey;

    const elevenlabs = new ElevenLabsClient({
      apiKey: apiKey!,
    });

    // A function to get tool Config and schema. Should be placed here.
    // Tool URL Should also be added here.
    // Tool Payload Transformation should be done before.

    const tool = await elevenlabs.conversationalAi.agents.update(args.agentId, {
      conversationConfig: {
        agent: {
          prompt: {
            tools: [
              {
                id: "weather",
                name: "weather",
                description: "Get's Weather For a Given City",
                response_timeout_secs: 20,
                type: "webhook",
                api_schema: {
                  url: "https://dashing-duck-833.convex.cloud/tool/weather",
                  method: "POST",
                  path_params_schema: {},
                  query_params_schema: null,
                  request_body_schema: {
                    type: "object",
                    required: ["Latitude", "Longitude"],
                    description: "Latitude & Longitude",
                    properties: {
                      Latitude: {
                        type: "string",
                        description: "Latitude of a given City",
                        dynamic_variable: "",
                        constant_value: "",
                      },
                      Longitude: {
                        type: "string",
                        description: "Longitude of a given city",
                        dynamic_variable: "",
                        constant_value: "",
                      },
                    },
                  },
                  request_headers: {},
                },
                dynamic_variables: {
                  dynamic_variable_placeholders: {},
                },
              },
              {
                id: "",
                name: "end_call",
                description: "",
                response_timeout_secs: 20,
                type: "system",
                params: {
                  system_tool_type: "end_call",
                },
              },
            ],
          },
        },
      },
    });

    return tool;
  },
});

export const removeTool = action({
  args: {
    apiKey: v.string(),
    agentId: v.string(),
    toolId: v.string(),
  },

  handler: async (ctx, args) => {
    const elevenlabs = new ElevenLabsClient({
      apiKey: args.apiKey,
    });

    const agent = await elevenlabs.conversationalAi.agents.get(args.agentId);
    const agentTools = agent.conversationConfig.agent?.prompt?.tools;

    const updatedTools = agentTools?.filter(
      (tool: any) => tool.id !== args.toolId
    );
  },
});

// export const createAgent = action({
//     args: {
//         apiKey: v.string(),
//         name: v.string(),
//     },

//     handler: async (ctx, args) => {
//         const elevenlabs = new ElevenLabsClient({
//             apiKey: args.apiKey,
//         });

//         const agent = await elevenlabs.conversationalAi.agents.create({
//             name: args.name,

//         });
//         return agent;

//     }
// })

export const getAgent = action({
  args: {
    nodeId: v.id("nodes"),
    agentId: v.string(),
  },

  handler: async (ctx, args) => {
    const configurations = (await ctx.runQuery(
      api.flows.node.data.getNodeConfigurations,
      {
        nodeId: args.nodeId as Id<"nodes">,
      }
    )) as any;

    const apiKey = configurations?.configurations?.apiKey;

    const elevenlabs = new ElevenLabsClient({
      apiKey: apiKey!,
    });

    const agent = await elevenlabs.conversationalAi.agents.get(args.agentId);
    return agent;
  },
});

export const voices = action({
  args: {
    apiKey: v.string(),
    agentId: v.string(),
  },

  handler: async (ctx, args) => {
    const elevenlabs = new ElevenLabsClient({
      apiKey: args.apiKey,
    });

    // const voices = await elevenlabs.voices.samples.audio.get(

    // );

    //return voices;
  },
});

export const getKnowledgeBase = action({
  args: {
    nodeId: v.id("nodes"),
  },

  handler: async (ctx, args) => {
    const configurations = (await ctx.runQuery(
      api.flows.node.data.getNodeConfigurations,
      {
        nodeId: args.nodeId,
      }
    )) as any;

    if(!configurations?.configurations?.apiKey){
      return [];
    }

    const apiKey = configurations?.configurations?.apiKey;

    const elevenlabs = new ElevenLabsClient({
      apiKey: apiKey!,
    });

    //const knowledgeBase = await elevenlabs.conversationalAi.knowledgeBase.list({pageSize:10});

    return [];
  },
});

export const getDocument = action({
  args: {
    nodeId: v.id("nodes"),
    documentId: v.string(),
  },

  handler: async (ctx, args) => {
    const configurations = (await ctx.runQuery(
      api.flows.node.data.getNodeConfigurations,
      {
        nodeId: args.nodeId,
      }
    )) as any;

    const apiKey = configurations?.configurations?.apiKey;

    const elevenlabs = new ElevenLabsClient({
      apiKey: apiKey!,
    });

    const document =
      await elevenlabs.conversationalAi.knowledgeBase.documents.get(
        args.documentId
      );
    return document;
  },
});
