"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebarPage";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "@/components/AddNodes/DnDContext";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  Breadcrumb,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Folder } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Authenticated } from "convex/react";
import { ErrorBoundary } from "../ErrorBoundary";
import { useConvexAuth } from "convex/react";

import { useAuth } from "@clerk/nextjs";
import {useUser} from "@clerk/nextjs"
import flowStore from "@/components/Store/store";
import { useParams } from "next/navigation";
import { useGetNodes } from "@/components/hooks/getNodes";
import { AppNode } from "@/components/Store/types";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

const selector = (state: any) => ({
  
  setInitialNodes: state.setInitialNodes,
  setInitialEdges: state.setInitialEdges,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <ErrorBoundary>
    <Authenticated>
      <AuthenticatedContent>
        {children}
      </AuthenticatedContent>
    </Authenticated>
    </ErrorBoundary>
  );
}

function AuthenticatedContent({ children }: { children: React.ReactNode }) {
  
  const { setInitialEdges,setInitialNodes} = flowStore(useShallow(selector));
  const params = useParams();
  const projectId = params.projectId as string;
  
  if(!projectId) return <div>No project id or Incorrect Project Id</div>

  const {nodes,isLoading,error} = useGetNodes(projectId);

  

  useEffect(()=>{
    setInitialNodes(nodes);
  },[nodes]);
  
  if(isLoading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>Error: {error.message}</div>
  }

  return (
    <ReactFlowProvider>
    <DnDProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Add a condition here that renders header only on the flow creation page. */}
          <header className="flex h-10 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Projects</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="flex items-center gap-2">
                      {" "}
                      <Folder className="w-4 h-4 font-bold" /> Vtex
                      Integration
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <Separator orientation="horizontal" className="w-full" />

          <main className="h-full ">{children}</main>
          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </DnDProvider>
  </ReactFlowProvider>
  );
}
