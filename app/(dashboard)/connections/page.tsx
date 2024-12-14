'use client'


import React, { useRef, useCallback } from 'react';
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
 
import RightSideBar from '@/components/AddNodes/RightSideBar';
import { DnDProvider,useDnD } from '@/components/AddNodes/DnDContext';
import '@xyflow/react/dist/style.css';
import { DockDemo } from '../dock';

const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'input node' },
      position: { x: 250, y: 5 },
    },
  ];
   
  let id = 0;
  const getId = () => `dndnode_${id++}`;


  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Page() {
    const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
 
  const onConnect = useCallback(
    //@ts-ignore
    (params:any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
 
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
        id: getId(),
        type,
        position,
        data: { label: `${type}`  },
      };

      //@ts-ignore
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );
    return(
        <div className='w-full h-full p-8'>
            <div className='w-full h-full flex flex-col justify-start '>
                <h1 className='text-4xl font-semibold'>Connections</h1>
                <p className='text-primary'>Connections between your product and your users’ accounts on third-party software.</p>
                <div className='flex w-full h-full justify-center items-center mt-10 rounded-xl border shadow-md'>
                    <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                    style={{ backgroundColor: "#F7F9FB", borderRadius:"10px"}}
                    >
                        <Panel>
                        <div className='z-[999]'>
                            <DockDemo/>
                        </div>
                            </Panel>                        
                        <Controls />
                        <Background />
                        <MiniMap nodeStrokeWidth={1} style={{borderRadius:"50px"}}  />
                       
                    </ReactFlow>
                </div>
                
            </div>
        </div>
    )
  }