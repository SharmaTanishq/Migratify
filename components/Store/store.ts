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
    // Map Convex nodes to React Flow format

    // set({
    //   nodes:[{
    //     id:"fa",
    //     type:"flow",
    //     position:{
    //       x:0,
    //       y:0
    //     },
    //     data:{}
    //   }],
      
    // })

    const mappedNodes = nodes.map((node: any) => {
      // If node already has a data property, assume it's in React Flow format
      
      return {
        id: node.id,
        _id:node._id,
        type: node.type,
        position: node.position,
        measured: node.measured,
        data: {
           configurations: node.configurations || {},
           ui: node.data.ui || {},
           secrets: node.data.secrets || {},
          // Add any other custom fields you want inside data here
        },
      };
    });
    console.log("mappedNodes", mappedNodes);
    set({ nodes: mappedNodes });
  },

  setInitialEdges:(edges)=>{
    console.log("edges", edges);
    const edgesWithId = edges.map((edge:any)=>({
      ...edge,
      id:edge._id,
      data:edge.data || {}
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
    console.log("nodes", nodes);
    set({ nodes: [...get().nodes, nodes ] });    
  },

  getSourceNode: (nodeId:string)=>{
    return get().edges.find((edge: Edge) => edge.target === nodeId)?.source
  },

  // updateNodeColor: (nodeId: string, color: string) => {
  //   set({
  //     nodes: get().nodes.map((node) => {
  //       if (node.id === nodeId) {
  //         // it's important to create a new object here, to inform React Flow about the changes
  //         return { ...node, data: { ...node.data, color } };
  //       }
   
  //       return node;
  //     }),
  //   });
  // },
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