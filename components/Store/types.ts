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
    
    data:any[];
  };