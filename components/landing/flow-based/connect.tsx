"use client";

import React, { useCallback, useMemo } from "react";

import { useRouter } from "next/navigation";
import {
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import VtexNode from "@/components/AddNodes/VtexNode";
import { FileUploadNode } from "@/components/FileUploadNode/UploadFileNode";
import { CategoryFileNode } from "@/components/FileUploadNode/CategoryFile";
import { InventoryFileNode } from "@/components/FileUploadNode/InventoryFile";
import { CustomerFileNode } from "@/components/FileUploadNode/CustomerFile";

import "@xyflow/react/dist/style.css";
import { useDnD } from "@/components/AddNodes/DnDContext";
import { DockDemo } from "@/app/(dashboard)/dock";
import ECommerce from "@/components/CustomNodes/E-Commerce";
import Bridges from "@/components/CustomNodes/Bridges";
import Output from "@/components/CustomNodes/Output";
import Mail from "@/components/CustomNodes/Mail";

const nodeTypes = {
  ecommerceNode: VtexNode,
  bridgeNode: Bridges,
  outputNode: Output,  
  mailNode: Mail,
  
};



const initialNodes = [
  {
    id: "1",
    type: "ecommerceNode",
    position: { x: 0, y: 0 },
    data: {
      UIData:
        '{"id":29,"Name":"VTEX","node_description":"Integrate with VTEX","node_type":"ecommerceNode","active":true,"node_data":null,"node_logo":{"id":2,"documentId":"gdv9iumxmv2tqwbn2k63wlnf","name":"vtex.svg","alternativeText":"vtex","caption":null,"width":150,"height":150,"formats":null,"hash":"vtex_81e8d0c92c","ext":".svg","mime":"image/svg+xml","size":0.82,"url":"https://res.cloudinary.com/dzi0wmfo3/image/upload/v1737886105/vtex_81e8d0c92c.svg","previewUrl":null,"provider":"cloudinary","provider_metadata":{"public_id":"vtex_81e8d0c92c","resource_type":"image"},"createdAt":"2025-01-26T10:08:26.256Z","updatedAt":"2025-01-26T10:15:04.436Z","publishedAt":"2025-01-26T10:08:26.256Z"}}',
    },
  },
  {
    id: "3",
    type: "bridgeNode",
    position: { x: 0, y: 0 },
    data: {
      UIData:
        '{"id":32,"Name":"Webhook","node_description":"Connect with an event","node_type":"bridgeNode","active":true,"node_data":null,"node_logo":{"id":4,"documentId":"zg8arkab1dj8hr3adu7bjurq","name":"webhook.png","alternativeText":null,"caption":null,"width":2048,"height":1899,"formats":{"large":{"ext":".png","url":"https://res.cloudinary.com/dzi0wmfo3/image/upload/v1737916983/large_webhook_7e511fcccf.png","hash":"large_webhook_7e511fcccf","mime":"image/png","name":"large_webhook.png","path":null,"size":63.37,"width":1000,"height":927,"sizeInBytes":63373,"provider_metadata":{"public_id":"large_webhook_7e511fcccf","resource_type":"image"}},"small":{"ext":".png","url":"https://res.cloudinary.com/dzi0wmfo3/image/upload/v1737916983/small_webhook_7e511fcccf.png","hash":"small_webhook_7e511fcccf","mime":"image/png","name":"small_webhook.png","path":null,"size":27.06,"width":500,"height":464,"sizeInBytes":27055,"provider_metadata":{"public_id":"small_webhook_7e511fcccf","resource_type":"image"}},"medium":{"ext":".png","url":"https://res.cloudinary.com/dzi0wmfo3/image/upload/v1737916983/medium_webhook_7e511fcccf.png","hash":"medium_webhook_7e511fcccf","mime":"image/png","name":"medium_webhook.png","path":null,"size":44.43,"width":750,"height":695,"sizeInBytes":44429,"provider_metadata":{"public_id":"medium_webhook_7e511fcccf","resource_type":"image"}},"thumbnail":{"ext":".png","url":"https://res.cloudinary.com/dzi0wmfo3/image/upload/v1737916983/thumbnail_webhook_7e511fcccf.png","hash":"thumbnail_webhook_7e511fcccf","mime":"image/png","name":"thumbnail_webhook.png","path":null,"size":7.83,"width":168,"height":156,"sizeInBytes":7825,"provider_metadata":{"public_id":"thumbnail_webhook_7e511fcccf","resource_type":"image"}}},"hash":"webhook_7e511fcccf","ext":".png","mime":"image/png","size":38.41,"url":"https://res.cloudinary.com/dzi0wmfo3/image/upload/v1737916983/webhook_7e511fcccf.png","previewUrl":null,"provider":"cloudinary","provider_metadata":{"public_id":"webhook_7e511fcccf","resource_type":"image"},"createdAt":"2025-01-26T18:43:03.745Z","updatedAt":"2025-01-26T18:43:03.745Z","publishedAt":"2025-01-26T18:43:03.746Z"}}',
    },
  },
  {
    id: "2",
    type: "outputNode",
    position: { x: 600, y: 100 },
    data: {
      UIData:
        '{"id":42,"Name":"Output","node_description":"View your outputs in this window","node_type":"outputNode","active":true,"node_data":null,"node_logo":{"id":13,"documentId":"qu17reoi24ea5z6kocase8z8","name":"Export.svg","alternativeText":null,"caption":null,"width":24,"height":24,"formats":null,"hash":"Export_446b7f2431","ext":".svg","mime":"image/svg+xml","size":0.62,"url":"https://res.cloudinary.com/dzi0wmfo3/image/upload/v1738843377/Export_446b7f2431.svg","previewUrl":null,"provider":"cloudinary","provider_metadata":{"public_id":"Export_446b7f2431","resource_type":"image"},"createdAt":"2025-02-06T12:02:59.463Z","updatedAt":"2025-02-06T12:02:59.463Z","publishedAt":"2025-02-06T12:02:59.463Z"}}',
    },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

let id = 0;

const getId = () => `dndnode_${id++}`;

const Connect = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
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
    [screenToFlowPosition, type]
  );

  return (
    <div className="w-full flex flex-col items-center justify-center  ">
      <div className="flex w-full h-[500px] md:h-[800px]  rounded-[22px] p-2 max-w-screen-xl border border-neutral-300   ">
        <div className="w-full p-3 rounded-[12px] md:rounded-[18px] shadow-md  relative border border-neutral-300  ">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onDrop={onDrop}
            onDragOver={onDragOver}
            defaultViewport={{ x: 100, y: 200, zoom: 0.8 }}
          >
            <Background
              bgColor="#ffffff"
              variant={BackgroundVariant.Dots}
              style={{ borderRadius: "12px" }}
            />
            <Panel position="bottom-center">
              <div className="w-full flex-col flex justify-center items-center ">
                <h4 className="text-sm md:text-lg text-gray-500 mt-4 bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                  Drag and drop nodes from below to try building your flow
                </h4>
                <DockDemo />
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default Connect;
