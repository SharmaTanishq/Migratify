"use node";

import { ConvexError, v } from "convex/values";
import { action } from "../../_generated/server";
import { ElevenLabs, ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

import { api } from "../../_generated/api";
import { Id } from "../../_generated/dataModel";

export const InitiateCall = action({
  args: {
    sourceNodeId: v.string(),
    sourcePlatform: v.string(),
    targetNodeId: v.string(),
    targetPlatform: v.string(),
    phoneNumber: v.string(),
  },
  handler: async (ctx, args) => {
    const nodeConfigurations = await ctx.runQuery(
      api.flows.node.data.getNodeConfigurations,
      { nodeId: args.sourceNodeId as Id<"nodes"> }
    );
    const apiKey = nodeConfigurations?.configurations.apiKey;

    
    const elevenlabs = new ElevenLabsClient({
      apiKey: apiKey!,
    });

    const getSignedURL =
      await elevenlabs.conversationalAi.conversations.getSignedUrl({
        agentId: "JZaQecEnUNn3lddFbV3q",
      });

    const body = {
      prompt: `
      You are a helpful conversational AI assistant with access to a weather tool. When users ask about weather conditions, use the get_weather_tool to fetch accurate, real-time data. The tool requires a latitude and longitude - use your geographic knowledge to convert location names to coordinates accurately.

            Never ask users for coordinates - you must determine these yourself. Always report weather information conversationally, referring to locations by name only. For weather requests:
            1. Extract the location from the user's message
            2. Convert the location to coordinates and call get_weather 
            3. Present the information naturally and helpfully

            For non-weather queries, provide friendly assistance within your knowledge boundaries. Always be concise, accurate, and helpful.`,

      first_message:
        "Hey, how can I help you today?",
      number: args.phoneNumber,
      nodeId: args.sourceNodeId,
      signedUrl: getSignedURL.signedUrl,
    };

    const response:any = await fetch(`https://bridgeflow-relay.up.railway.app/outbound-call`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).catch((err) => console.log(err));

    const data = await response?.json();
    console.log(data);

    return data;
  },
});
