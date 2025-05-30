"use node";
import { v } from "convex/values";
import { action } from "../../_generated/server";
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import { api } from "../../_generated/api";


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
    }
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
//             conversationConfig:{
//                 languagePresets:"",
//                 temperature: 0.5,
//                 topP: 0.9,
//                 topK: 40,
//                 repetitionPenalty: 1.18,
//                 maxTokens: 1000,
//                 responseFormat: "text",
//                 seed: 42,
//             }
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
        const configurations = await ctx.runQuery(api.flows.node.data.getNodeConfigurations, {
            nodeId: args.nodeId,
        }) as any;

        const apiKey = configurations?.configurations?.apiKey;

        const elevenlabs = new ElevenLabsClient({
            apiKey: apiKey!,
        });


        const agent = await elevenlabs.conversationalAi.agents.get(args.agentId);
        return agent;
    }
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
    }
});

export const getKnowledgeBase = action({
    args: {
        nodeId: v.id("nodes"),
    },

    handler: async (ctx, args) => {

        const configurations = await ctx.runQuery(api.flows.node.data.getNodeConfigurations, {
            nodeId: args.nodeId,
        }) as any;

        const apiKey = configurations?.configurations?.apiKey;
        
        const elevenlabs = new ElevenLabsClient({
            apiKey: apiKey!,
        });

        const knowledgeBase = await elevenlabs.conversationalAi.knowledgeBase.list();
        
        return knowledgeBase;
    }
});

export const getDocument = action({
    args: {
        nodeId: v.id("nodes"),
        documentId: v.string(),
    },

    handler: async (ctx, args) => {

        const configurations = await ctx.runQuery(api.flows.node.data.getNodeConfigurations, {
            nodeId: args.nodeId,
        }) as any;

        const apiKey = configurations?.configurations?.apiKey;
        
        const elevenlabs = new ElevenLabsClient({
            apiKey: apiKey!,
        });

        const document = await elevenlabs.conversationalAi.knowledgeBase.documents.get(args.documentId);
        return document;
    }
});