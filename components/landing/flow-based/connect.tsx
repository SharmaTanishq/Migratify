"use client";

import React, { useCallback, useMemo } from "react";

import { useRouter } from "next/navigation";
import {
  Background,
  Controls,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { VtexCommerceNode } from "@/components/AddNodes/VtexNode";
import { FileUploadNode } from "@/components/FileUploadNode/UploadFileNode";
import { CategoryFileNode } from "@/components/FileUploadNode/CategoryFile";
import { InventoryFileNode } from "@/components/FileUploadNode/InventoryFile";
import { CustomerFileNode } from "@/components/FileUploadNode/CustomerFile";

import "@xyflow/react/dist/style.css";
import { useDnD } from "@/components/AddNodes/DnDContext";
import { DockDemo } from "@/app/(dashboard)/dock";

const initialNodes = [
  { id: "1", type: "vtexNode", position: { x: 0, y: 0 }, data: { label: "Vtex " } },
  {
    id: "2",
    type: "fileUploadNode",
    position: { x: 600, y: 100 },
    data: { label: "Node 2" },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

let id = 0;

const getId = () => `dndnode_${id++}`;

const Connect = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(
    () => ({
      vtexNode: VtexCommerceNode,
      fileUploadNode: FileUploadNode,
      categoryFileNode: CategoryFileNode,
      customerFileNode: CustomerFileNode,
      inventoryFileNode: InventoryFileNode,
    }),
    []
  );
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onDragOver = useCallback((event: any) => {    
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
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
        data: { label: `${type} node` },
      };
      //@ts-ignore
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );

  return (
    <div className="w-full flex flex-col items-center justify-center mt-10 ">
     
    
                    

      <div className="flex w-full h-[500px] md:h-[800px]  rounded-[22px] p-2 max-w-screen-xl border border-neutral-300   ">
        <div className="w-full p-3 rounded-[12px] md:rounded-[18px] shadow-md  relative border border-neutral-300  " >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onDrop={onDrop}
            onDragOver={onDragOver}
            defaultViewport={{x:100,y:200,zoom:0.8}}
          >
            <Background   />
            <Panel position="bottom-center">
                <div className="w-full flex-col flex justify-center items-center ">
                <h4 className="text-sm md:text-lg text-gray-500 mt-4 bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">Drag and drop nodes from below to try building your flow</h4>
                    <DockDemo/>
                </div>
            </Panel>
          </ReactFlow>
          </div>
        </div>
        
          
    </div>
  );
};

export default Connect;
