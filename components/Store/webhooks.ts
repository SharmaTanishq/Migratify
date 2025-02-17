import { create, createStore } from "zustand";
import { Webhook, WebhooksState } from "./types";
import { devtools } from "zustand/middleware";

const webhooksStore = create<WebhooksState>()(devtools((set,get)=>({
   webhooks:[],
   events:[],
   setWebhooks:(webhooks:Webhook[])=>{
    set({webhooks:webhooks});
   },
   setEvents:(nodeId:string,events:Array<{event:string,isActive:boolean}>)=>{
    // If events array is empty, add the first event

      set({ events: [{ nodeId, events }] });
      return;

    
   },
   getEvents:(nodeId:string)=>{
   
    return get().events.find((event)=>event.nodeId === nodeId)?.events;
   },
   getWebhookUrl:(nodeId:string)=>{
    return get().webhooks.find((webhook)=>webhook.nodeId === nodeId)?.url;
   },
   getWebhookEvents:(nodeId:string)=>{
    return get().webhooks.find((webhook)=>webhook.nodeId === nodeId)?.events;
   },
   setWebhookUrl:(nodeId:string,webhookUrl:string)=>{
    set({webhooks:get().webhooks.map((webhook)=>webhook.nodeId === nodeId ? {...webhook,url:webhookUrl} : webhook)});
   },
   setWebhookEvents:(nodeId:string,events:Array<{event:string,isActive:boolean}>)=>{
    set({webhooks:get().webhooks.map((webhook)=>webhook.nodeId === nodeId ? {...webhook,events:events} : webhook)});
   },
   setDefaultWebhookEvents:(nodeId:string,events:Array<{event:string,isActive:boolean}>)=>{
    set({webhooks:get().webhooks.map((webhook)=>webhook.nodeId === nodeId ? {...webhook,events:events.map((event)=>({...event,isActive:true}))} : webhook)});
   }
})))     

export default webhooksStore;
