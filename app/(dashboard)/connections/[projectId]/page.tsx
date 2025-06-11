"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Background, BackgroundVariant, Edge, Panel } from "@xyflow/react";

import { ReactFlow, Controls, useReactFlow } from "@xyflow/react";

import { useDnD } from "@/components/AddNodes/DnDContext";
import "@xyflow/react/dist/style.css";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import flowStore from "@/components/Store/store";
import { useSidebar } from "@/components/ui/sidebar";

import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import NodeDrawer from "@/components/Connections/NodeDrawer";

import { AddNodeDrawer } from "@/components/Connections/LeftDrawer";

import AddNodeFAB from "@/components/Connections/Fab";
import { useNodeDelete } from "@/components/hooks/useNodeDelete";
import { AllNodeType } from "@/components/Types/Flows";
import ECommerce from "@/components/CustomNodes/E-Commerce";

import Bridges from "@/components/CustomNodes/Bridges";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeDelete } from "@/components/hooks/useEdgeDelete";
import { DefaultEdge } from "@/components/CustomEdge";
import Output from "@/components/CustomNodes/Output";
import Mail from "@/components/CustomNodes/Mail";
import VoiceAgentNode from "@/components/CustomNodes/VoiceAgents";
import CallProviderNode from "@/components/CustomNodes/CallProvider";

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  setInitialNodes: state.setInitialNodes,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
  addEdge: state.addEdge,
  setInitialEdges: state.setInitialEdges,
});

const nodeTypes = {
  ecommerceNode: ECommerce,
  bridgeNode: Bridges,
  outputNode: Output,
  // pimNode: PIM,
  // crmNode: CRM,
  // erpNode: ERP,
  mailNode: Mail,
  voiceAgentNode: VoiceAgentNode,
  callProviderNode: CallProviderNode,

  // paymentNode: Payment,
  // shippingNode: Shipping,
  // socialNode: Social,
};

const edgeType = {
  customEdge: DefaultEdge,
};

export default function Page() {
  const params = useParams();

  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
  }, []);
  const projectId = params.projectId as string;

  const { nodes, edges, onNodesChange, onEdgesChange, addNode, addEdge } =
    flowStore(useShallow(selector));



    

  const addNodeMutation = useMutation(api.flows.nodes.addNode);
  const addEdgeMutation = useMutation(api.flows.edges.addEdge);
  const updateNodesMutation = useMutation(api.flows.nodes.updateNodes);
  const updateNodePositionMutation = useMutation(
    api.flows.node.updateNode.updateNodePosition
  );
  const { deleteEdge } = useEdgeDelete(projectId);

  const { deleteNode } = useNodeDelete(projectId);

  const [selectedNode, setSelectedNode] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const { screenToFlowPosition } = useReactFlow();

  const [type] = useDnD();

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const data = event.dataTransfer.getData("flow");
      const configurations = event.dataTransfer.getData("flowConfigurations");

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      //The commented code is for when we want to check if a node of the same type already exists
      //This is not needed for now, but it's here for future use

      // const nodeExists = nodes.some((node: any) => node.type === type);

      // if (nodeExists) {
      //   // You might want to show a toast/alert here
      //   toast("A node of this type already exists", {
      //     style: {
      //       background: "#ef4444",
      //       color: "white",
      //     },
      //     icon: "⚠️",
      //   });
      //   return;
      // }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNodeMutation({
        projectId: projectId,
        data: { 
          ui: JSON.parse(data), 
          secrets: {},                     
        },
        configurations:JSON.parse(configurations),
        measured: { height: position.y, width: position.x },
        position: position,
        //@ts-ignore
        type: type,
      }).then((res) => {
        addNode({
          id: res,
          type,
          position,
          data: { ui: JSON.parse(data), secrets: {}, configurations: JSON.parse(configurations) },
          
        });
      });

      // const newNode = {
      //   id: "node" + Math.floor(Math.random() * 10000).toString(),
      //   type,
      //   position,
      //   data: { UIData: data },
      // };

      // //@ts-ignore
      // addNode(newNode);
    },
    [screenToFlowPosition, type, nodes]
  );

  const onNodeDragStop = useCallback(
    (event: any, nodes: any) => {
      if (nodes._id) {
        updateNodePositionMutation({
          nodeId: nodes._id,
          position: {
            x: nodes.position.x,
            y: nodes.position.y,
          },
        });
      }
      // updateNodesMutation({
      //   nodes:event
      // })
    },
    [nodes]
  );

  const onEdgeConnect = useCallback(
    (event: any) => {
      addEdgeMutation({
        projectId: projectId,
        source: event.source,
        target: event.target,
        type: "",

        sourceHandle: event.sourceHandle,
        targetHandle: event.targetHandle,
      }).then((res) => {
        addEdge({
          id: res.edgeId,
          projectId: projectId,
          //type: "customEdge",
          source: event.source,
          target: event.target,

          sourceHandle: event.sourceHandle,
          targetHandle: event.targetHandle,
        });
      });
    },
    [edges]
  );

  const onEdgeDelete = useCallback(
    (edges: Edge[]) => {
      edges.forEach((edge) => {
        deleteEdge(edge.id);
      });
    },
    [edges]
  );

  const handleNodeClick = useCallback((event: any, node: any) => {
    setSelectedNode(node);
  }, []);

  const handleNodeDelete = useCallback((node: any) => {
    
    deleteNode(node[0].id);
  }, []);

  const handleNodeMouseEnter = useCallback((event: any, node: any) => {}, []);
  
  return (
    <div className="w-full h-full">
      <div className="flex w-full h-full justify-center items-center  rounded-xl">
        <ReactFlow<AllNodeType>
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeMouseEnter={handleNodeMouseEnter}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          onNodesDelete={handleNodeDelete}
          //onDragEnd={onNodeDragStop}
          onNodeDragStop={onNodeDragStop}
          onConnect={onEdgeConnect}
          onEdgesDelete={onEdgeDelete}
          nodeTypes={nodeTypes}
          //edgeTypes={edgeType}
          onDrop={onDrop}
          onDragOver={onDragOver}
          minZoom={0.5}
          maxZoom={100}
          
          style={{ borderRadius: "10px" }}
        >
          <Controls />

          <Panel className="py-5 flex ">
            <AddNodeFAB onClick={() => setIsPanelOpen(true)} />
          </Panel>

          <Background
            style={{ background: "#F4F4F5" }}
            color="#A1A1AA"
            variant={BackgroundVariant.Dots}
            gap={10}
            size={1.5}
          />

          {/* <NodeDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            nodeData={selectedNode}
          /> */}

          <Toaster position="bottom-center" />
        </ReactFlow>
        <AddNodeDrawer
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          nodeData={selectedNode}
        />
      </div>
    </div>
  );
}
