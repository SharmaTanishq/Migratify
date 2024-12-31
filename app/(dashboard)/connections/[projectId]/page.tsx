'use client'


import React, { useRef, useCallback, useEffect, useMemo, use, useState } from 'react';
import { Background, Panel } from '@xyflow/react';

import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  useReactFlow,
  
} from '@xyflow/react';
 

import { useDnD } from '@/components/AddNodes/DnDContext';
import '@xyflow/react/dist/style.css';
import { DockDemo } from '../../dock';

import { VtexCommerceNode } from '@/components/AddNodes/VtexNode';
import { FileUploadNode } from '@/components/FileUploadNode/UploadFileNode';
import { CategoryFileNode } from '@/components/FileUploadNode/CategoryFile';
import { CustomerFileNode } from '@/components/FileUploadNode/CustomerFile';
import { InventoryFileNode } from '@/components/FileUploadNode/InventoryFile';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import useStore from '@/components/Store/store';
import { initialNodes } from '@/components/AddNodes/initialNode';


const selector = (state:any) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes:state.setNodes,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode:state.addNode,
  addEdge:state.addEdge,
});

   
let id = 0;
const getId = () => `dndnode_${id++}`;


 

export default function Page() {

  const params = useParams();
  const projectId = params.projectId as string;

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect,setNodes,addNode,addEdge } = useStore(
    useShallow(selector),
  );

  const data = useQuery(api.flows.nodes.getNodes,{projectId:projectId})

  useEffect(()=>{
    if(data) setNodes(data);   
  },[data])
  //Types of nodes created
  const nodeTypes = useMemo(() => ({  
      vtexNode: VtexCommerceNode, 
      fileUploadNode: FileUploadNode,
      categoryFileNode: CategoryFileNode,
      customerFileNode: CustomerFileNode,
      inventoryFileNode: InventoryFileNode,
    }), []);

  const { screenToFlowPosition } = useReactFlow();

  const [type] = useDnD();

    
 
  
 
  const onDragOver = useCallback((event:any) => {
    event.preventDefault();
    
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
    (event:any) => {
      event.preventDefault();
      
      // check if the dropped element is valid
      if (!type) {
        return;
      }
 
      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: "node" + Math.floor(Math.random() * 10000).toString(),
        type,
        position,
        data: { label: `${type}`  },
      };                    

      //@ts-ignore
      addNode(newNode);      
    },
    [screenToFlowPosition, type],
  );
    return(
        <div className='w-full h-full p-8 '>
            <div className='w-full h-full flex flex-col justify-start '>
                <h1 className='text-4xl font-semibold'>Connections</h1>
                <p className='text-primary'>Connections between your product and your users’ accounts on third-party software.</p>
                <div className='flex w-full h-full justify-center items-center mt-10 rounded-xl border shadow-md'>
                    <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={addEdge}
                    nodeTypes={nodeTypes}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    
                    fitView
                    style={{  borderRadius:"10px"}}
                    >
                        <Panel>
                        <div className='z-[999]'>
                            <DockDemo/>
                        </div>
                            </Panel>                        
                        <Controls />
                        <Background  color="#ccc" />
                        <MiniMap nodeStrokeWidth={1} style={{borderRadius:"50px"}}  />
                       
                    </ReactFlow>
                </div>
                
            </div>
        </div>
    )
  }