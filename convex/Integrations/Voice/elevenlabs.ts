"use node";
import { v } from "convex/values";
import { action } from "../../_generated/server";
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";


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