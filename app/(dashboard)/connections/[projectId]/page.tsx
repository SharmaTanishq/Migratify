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
import CustomEdge from "@/components/CustomEdge";

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
  // pimNode: PIM,
  // crmNode: CRM,
  // erpNode: ERP,
  // mailNode: Mail,
  // paymentNode: Payment,
  // shippingNode: Shipping,
  // socialNode: Social,
};

// const edgeType = {
//   customEdge:CustomEdge
// }

export default function Page() {
  const params = useParams();
  const { setOpen } = useSidebar();
  useEffect(() => {
    setOpen(false);
  }, []);
  const projectId = params.projectId as string;

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    setInitialNodes,
    addNode,
    addEdge,
    setInitialEdges,
  } = flowStore(useShallow(selector));

  const addNodeMutation = useMutation(api.flows.nodes.addNode);
  const addEdgeMutation = useMutation(api.flows.edges.addEdge);
  const updateNodesMutation = useMutation(api.flows.nodes.updateNodes);
  const updateNodePositionMutation = useMutation(api.flows.node.updateNode.updateNodePosition);
  const {deleteEdge} = useEdgeDelete(projectId);

  const { deleteNode } = useNodeDelete(projectId);

  const [selectedNode, setSelectedNode] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const nodesData = useQuery(api.flows.nodes.getNodes, {
    projectId: projectId,
  });
  const edgesData = useQuery(api.flows.edges.getEdges, {
    projectId: projectId,
  });

  useEffect(() => {
    if (nodesData) setInitialNodes(nodesData);
  }, [nodesData]);

  useEffect(() => {
    if (edgesData) setInitialEdges(edgesData);
  }, [nodes]);

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

      const newNode = {
        id: "node" + Math.floor(Math.random() * 10000).toString(),
        type,
        position,
        data: { UIData: data },
      };

      //@ts-ignore
      addNode(newNode);

      addNodeMutation({
        projectId: projectId,
        data: newNode.data,
        id: newNode.id,
        measured: { height: newNode.position.y, width: newNode.position.x },
        position: newNode.position,
        //@ts-ignore
        type: type,
      });
    },
    [screenToFlowPosition, type, nodes]
  );

  const onNodeDragStop = useCallback((event: any,nodes:any) => {
    
    
    
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
  }, [nodes]);

  const onEdgeConnect = useCallback(
    (event: any) => {


      addEdgeMutation({
        projectId: projectId,
        source: event.source,
        target: event.target,
        sourceHandle: event.sourceHandle,
        targetHandle: event.targetHandle,
      }).then((res)=>{
        addEdge({
          id:res.edgeId,
          projectId: projectId,
          source: event.source,
          target: event.target,
          sourceHandle: event.sourceHandle,
          targetHandle: event.targetHandle,
        })
      });

    },
    [edges]
  );

  const onEdgeDelete = useCallback((edges:Edge[])=>{
    console.log(edges); 
     edges.forEach((edge)=>{
      deleteEdge(edge.id);
     })
   
  },[edges])

  const handleNodeClick = useCallback((event: any, node: any) => {
    setSelectedNode(node);
    setIsDrawerOpen(true);
  }, []);

  const handleNodeDelete = useCallback((node: any) => {
    deleteNode(node[0]._id);

    setIsDrawerOpen(false);
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
          maxZoom={8}
          fitView={false}
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
