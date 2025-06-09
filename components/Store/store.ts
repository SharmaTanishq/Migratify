import { create } from 'zustand';
import {devtools} from 'zustand/middleware'
import { addEdge, applyNodeChanges, applyEdgeChanges, Edge } from '@xyflow/react';


import { AppNode, type AppState } from './types';
import { Id } from '@/convex/_generated/dataModel';
 
// this is our useStore hook that we can use in our components to get parts of the store and call actions
const flowStore = create<AppState>()(devtools((set, get) => ({
  nodes: [],
  edges: [],  
  
  onNodesChange: (changes) => {

   
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  getNode:(nodeId:string)=>{
    return get().nodes.find((node:any)=>node.id === nodeId)

  },
  getParentNode: (nodeId:string)=>{
    return get().nodes.find((node:any)=>node.id === nodeId)
  },
  setInitialNodes: (nodes) => {
    
    set({nodes});   
  },

  setInitialEdges:(edges)=>{
    const edgesWithId = edges.map((edge:any)=>({
      ...edge,
      id:edge._id
    }))
    set({edges:edgesWithId})
  },

  addEdge: (edge: Edge) => {
    const newEdge = {
      ...edge,      
    };
    set({ edges: [...get().edges, newEdge] });
  },

  deleteEdge: (edgeId: Id<'edges'>) => {
    set({ edges: get().edges.filter((edge: Edge) => edge.id !== edgeId) });
    
  },

  addNode:(nodes)=>{
    set({ nodes: [...get().nodes, nodes ] });    
  },

  getSourceNode: (nodeId:string)=>{
    return get().edges.find((edge: Edge) => edge.target === nodeId)?.source
  },

  updateNodeColor: (nodeId: string, color: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          return { ...node, data: { ...node.data, color } };
        }
   
        return node;
      }),
    });
  },
  setEdges: (edges) => {
    set({ edges });
  }, 

  hasDataLoaded:false,
  
  setHasDataLoaded:(hasDataLoaded:boolean)=>{
    set({hasDataLoaded})
  },
  data:[]
})));
 
export default flowStore;