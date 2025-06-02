import {
    type Edge,
    type Node,
    type OnNodesChange,
    type OnEdgesChange,    
    type OnConnect,
    
  } from '@xyflow/react';

  import { Id } from '@/convex/_generated/dataModel';
  
  export type AppNode = Node;
   
  export type AppState = {
    nodes: any[];
    edges: Edge[];  
    onNodesChange: OnNodesChange<AppNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setInitialNodes: (nodes: AppNode[]) => void;
    getNode:(nodeId:string)=>any;
    setEdges: (edges: Edge[]) => void;
    setInitialEdges:(edges: Edge[]) => void;
    addNode:(type:string,x:number,y:number)=>void;
    deleteEdge:(edgeId: Id<'edges'>) => void; 
    getSourceNode: (nodeId:string)=>any;
    
    data:any[];
  };

  export type WebhooksState = {
    webhooks: Webhook[];
    events: Array<{nodeId: string, events: Array<{event: string, isActive: boolean}>}>;
    setWebhooks: (webhooks: Webhook[]) => void;
    setEvents: (nodeId: string, events: Array<{event: string, isActive: boolean}>) => void;
    getEvents: (nodeId: string) => Array<{event: string, isActive: boolean}> | undefined;
    getWebhookUrl: (nodeId: string) => any;
    getWebhookEvents: (nodeId: string) => any;
    setWebhookUrl: (nodeId: string, webhookUrl: string) => void;
    setDefaultWebhookEvents: (nodeId: string, events: Array<{event: string, isActive: boolean}>) => void;
    setWebhookEvents: (nodeId: string, events: Array<{event: string, isActive: boolean}>) => void;
  }
 
  export interface Webhook {
    nodeId:string;
    url:string;
    events:Array<{
      event:string;
      isActive:boolean;
    }>;
    isActive:boolean;
  }

  export type ModalState = {
    modalOpen:boolean;
    setModalOpen: (open: boolean) => void;
  }