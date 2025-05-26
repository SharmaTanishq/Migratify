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
})

export const createAgent = action({
    args: {
        apiKey: v.string(),
        name: v.string(),
    },

    handler: async (ctx, args) => {
        const elevenlabs = new ElevenLabsClient({
            apiKey: args.apiKey,
        });
        
    }
})



export const getAgent = action({
    args: {
        apiKey: v.string(),
        agentId: v.string(),
    },

    handler: async (ctx, args) => {
        const elevenlabs = new ElevenLabsClient({
            apiKey: args.apiKey,
        });

        const agent = await elevenlabs.conversationalAi.agents.get(args.agentId);
        return agent;
    }
})

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
})

export const getKnowledgeBase = action({
    args: {
        nodeId: v.id("nodes"),
    },

    handler: async (ctx, args) => {

        const configurations = await ctx.runQuery(api.flows.node.data.getNodeConfigurations, {
            nodeId: args.nodeId,
        }) as any;

        const apiKey = configurations?.configurations?.apiKey;
        console.log(apiKey);
        const elevenlabs = new ElevenLabsClient({
            apiKey: apiKey!,
        });

        const knowledgeBase = await elevenlabs.conversationalAi.knowledgeBase.list();
        console.log(knowledgeBase);
        return knowledgeBase;
    }
})