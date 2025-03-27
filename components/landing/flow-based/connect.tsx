"use client";

import React, { useCallback, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useDnD } from "@/components/AddNodes/DnDContext";
import { DockDemo } from "@/app/(dashboard)/dock";
import ECommerce from "@/components/CustomNodes/E-Commerce";
import Bridges from "@/components/CustomNodes/Bridges";
import Output from "@/components/CustomNodes/Output";
import Mail from "@/components/CustomNodes/Mail";
import { ProductSyncAnimatedEdge } from "@/components/landing/animatedEdges/productSync";
import { Icons } from "@/components/Icons";

const nodeTypes = {
  ecommerceNode: ECommerce,
  bridgeNode: Bridges,
  outputNode: Output,
  mailNode: Mail,
};

const edgeTypes = {
  animatedSvg: ProductSyncAnimatedEdge,
};

const initialNodes = [
  {
    id: "1",
    type: "ecommerceNode",
    position: { x: 0, y: -120 },
    data: {
      ui: {
        id: 29,
        Name: "VTEX",
        node_description: "Integrate with VTEX",
        node_type: "ecommerceNode",
        active: true,
        node_data: null,
        node_logo: {
          id: 2,
          documentId: "gdv9iumxmv2tqwbn2k63wlnf",
          name: "vtex.svg",
          alternativeText: "vtex",
          caption: null,
          width: 150,
          height: 150,
          formats: null,
          hash: "vtex_81e8d0c92c",
          ext: ".svg",
          mime: "image/svg+xml",
          size: 0.82,
          url: "https://res.cloudinary.com/dzi0wmfo3/image/upload/v1737886105/vtex_81e8d0c92c.svg",
          previewUrl: null,
          provider: "cloudinary",
          provider_metadata: {
            public_id: "vtex_81e8d0c92c",
            resource_type: "image",
          },
          createdAt: "2025-01-26T10:08:26.256Z",
          updatedAt: "2025-01-26T10:15:04.436Z",
          publishedAt: "2025-01-26T10:08:26.256Z",
        },
      },
    },
  },
  {
    id: "3",
    type: "bridgeNode",
    position: { x: 450, y: -100 },
    data: {
      ui: {
        id: 32,
        Name: "Webhook",
        node_description: "Connect with an event",
        node_type: "bridgeNode",
        active: true,
        node_data: null,
        node_logo: {
          alternativeText: "webhook-image.svg",
          caption: null,
          mime: "image/svg+xml",
          name: "webhooks-svgrepo-com.svg",
          previewUrl: null,
          url: "/icons/webhooks-svgrepo-com.svg",
        },
      },
    },
  },
  {
    id: "2",
    type: "outputNode",
    position: { x: 900, y: 0 },
    data: {
      ui: {
        id: 42,
        Name: "Output",
        node_description: "View your outputs in this window",
        node_type: "outputNode",
        active: true,
        node_data: null,
        node_logo: {
          alternativeText: null,
          caption: null,
          ext: ".jpg",
          formats: {
            medium: {
              ext: ".jpg",
              hash: "medium_Twilio_acc47fad8c",
              height: 750,
              mime: "image/jpeg",
              name: "medium_Twilio.jpg",
              path: null,
              provider_metadata: {
                public_id: "medium_Twilio_acc47fad8c",
                resource_type: "image",
              },
              size: 23.62,
              sizeInBytes: 23620,
              url: "https://res.cloudinary.com/dzi0wmfo3/image/upload/v1739272892/medium_Twilio_acc47fad8c.jpg",
              width: 750,
            },
            small: {
              ext: ".jpg",
              hash: "small_Twilio_acc47fad8c",
              height: 500,
              mime: "image/jpeg",
              name: "small_Twilio.jpg",
              path: null,
              provider_metadata: {
                public_id: "small_Twilio_acc47fad8c",
                resource_type: "image",
              },
              size: 14.66,
              sizeInBytes: 14658,
              url: "https://res.cloudinary.com/dzi0wmfo3/image/upload/v1739272892/small_Twilio_acc47fad8c.jpg",
              width: 500,
            },
            thumbnail: {
              ext: ".jpg",
              hash: "thumbnail_Twilio_acc47fad8c",
              height: 156,
              mime: "image/jpeg",
              name: "thumbnail_Twilio.jpg",
              path: null,
              provider_metadata: {
                public_id: "thumbnail_Twilio_acc47fad8c",
                resource_type: "image",
              },
              size: 4.11,
              sizeInBytes: 4109,
              url: "https://res.cloudinary.com/dzi0wmfo3/image/upload/v1739272892/thumbnail_Twilio_acc47fad8c.jpg",
              width: 156,
            },
          },
          hash: "Twilio_acc47fad8c",
          height: 900,
          id: 27,
          mime: "image/jpeg",
          name: "Twilio.jpg",
          previewUrl: null,
          provider: "cloudinary",
          provider_metadata: {
            public_id: "Twilio_acc47fad8c",
            resource_type: "image",
          },
          publishedAt: "2025-02-11T11:21:32.626Z",
          size: 29.48,
          updatedAt: "2025-02-11T11:21:32.574Z",
          url: "/icons/mail-plus-svgrepo-com.svg",
          width: 900,
        },
      },
    },
  },
];

const initialEdges = [
  { id: "e1-3", type: "animatedSvg", source: "1", target: "3" },
  { id: "e3-2", source: "3", target: "2" },
];

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
      <div className="flex w-full h-[500px] md:h-[800px] p-2 max-w-screen-xl  ">
        <div className="w-full p-3 rounded-[12px] md:rounded-[18px] shadow-md  relative border border-neutral-300  ">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onDrop={onDrop}
            onDragOver={onDragOver}
            defaultViewport={{ x: 100, y: 200, zoom: 0.7 }}
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
