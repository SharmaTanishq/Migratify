"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Background, Panel } from "@xyflow/react";

import { ReactFlow, Controls, useReactFlow } from "@xyflow/react";

import { useDnD } from "@/components/AddNodes/DnDContext";
import "@xyflow/react/dist/style.css";


import { VtexCommerceNode } from "@/components/AddNodes/VtexNode";
import { FileUploadNode } from "@/components/FileUploadNode/UploadFileNode";
import { CategoryFileNode } from "@/components/FileUploadNode/CategoryFile";
import { CustomerFileNode } from "@/components/FileUploadNode/CustomerFile";
import { InventoryFileNode } from "@/components/FileUploadNode/InventoryFile";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import useStore from "@/components/Store/store";
import { useSidebar } from "@/components/ui/sidebar";

import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import { NodeDrawer } from "@/components/Connections/NodeDrawer"

import { AddNodeDrawer } from "@/components/Connections/LeftDrawer";

import AddNodeFAB from "@/components/Connections/Fab";


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
  } = useStore(useShallow(selector));

  const addNodeMutation = useMutation(api.flows.nodes.addNode);
  const addEdgeMutation = useMutation(api.flows.edges.addEdge);
  const updateNodesMutation = useMutation(api.flows.nodes.updateNodes);

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

  //Types of nodes created
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
    console.log("onDragOver", event);
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

      const nodeExists = nodes.some((node: any) => node.type === type);

      if (nodeExists) {
        // You might want to show a toast/alert here
        toast("A node of this type already exists", {
          style: {
            background: "#ef4444",
            color: "white",
          },
          icon: "⚠️",
        });
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: "node" + Math.floor(Math.random() * 10000).toString(),
        type,
        position,
        data: { label: `${type}` },
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

  const onNodeUpdate = useCallback((event: any) => {
    console.log("event", event);

    // updateNodesMutation({
    //   nodes:event
    // })
  }, []);

  const onEdgeConnect = useCallback(
    (event: any) => {
      addEdge(event);

      addEdgeMutation({
        projectId: projectId,
        source: event.source,
        target: event.target,
        sourceHandle: event.sourceHandle,
        targetHandle: event.targetHandle,
      });
    },
    [edges]
  );

  const handleNodeClick = useCallback((event: any, node: any) => {
    setSelectedNode(node)
    setIsDrawerOpen(true)
  }, [])

  const handleNodeDelete = useCallback((node: any) => {
    console.log("node", node)
    setIsDrawerOpen(false)
  }, [])

  const handleNodeMouseEnter = useCallback((event: any, node: any) => {
    
  }, [])

  return (
    <div className="w-full h-full">
      
      <div className="flex w-full h-full justify-center items-center  rounded-xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeMouseEnter={handleNodeMouseEnter}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          onNodesDelete={handleNodeDelete}                    
          onDragEnd={onNodeUpdate}
          onNodeDragStop={onNodeUpdate}
          onConnect={onEdgeConnect}
          nodeTypes={nodeTypes}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          style={{ borderRadius: "10px" }}
        >
          {/* <Panel>
            <div className="z-[999]">
              <DockDemo />
            </div>
          </Panel> */}
          <Controls />

          <Panel className="py-5 flex " >
            <AddNodeFAB onClick={() => setIsPanelOpen(true)} />
          </Panel>

            
            
          

          <Background color="#ccc" />
          
          
          
            <NodeDrawer 
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                nodeData={selectedNode}
              />
          
          <Toaster position="bottom-center" />
        </ReactFlow>
        <AddNodeDrawer
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
          />
      </div>
    </div>
  );
}
