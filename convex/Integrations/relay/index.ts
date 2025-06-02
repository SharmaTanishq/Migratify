"use node"

import { v } from "convex/values";
import { action } from "../../_generated/server"

//THIS CONNECTS WITH RELAY SERVER AND Initiates a call via relay - Currently only supports twilio. 

export const InitiateCall = action({
    args: {
        sourceNodeId: v.string(),
        sourcePlatform: v.string(),
        targetNodeId:v.string(),
        targetPlatform:v.string(),
        phoneNumber: v.string(),
    },
    handler: async (ctx, args) => {
        const body = {
            prompt:"You are Pooja,an AI Sales Agent specialized in real estate for Ganga Realty, focused on promoting and assisting potential customers interested in Anantam 85, a premium residential project located in Sector 85, Gurgaon.Your goal is to engage the potential buyers, answer their queries, and convert leads by offering personalized, professional, andwell-informed responses, If the customer starts speaking hindi, you start to reply in hindi",
            first_message:"Hello Sir, Are you looking for real estate near Dwarka Expressway?",
            number:args.phoneNumber,
            nodeId:args.sourceNodeId
        }
        
        await fetch(`https://bridgeflow-relay.up.railway.app/outbound-call`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).catch((err)=>console.log(err));

        return "Initiated Call";

    }
})