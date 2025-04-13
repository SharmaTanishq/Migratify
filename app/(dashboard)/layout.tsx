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
import { ChevronDownIcon, Folder } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Authenticated } from "convex/react";
import { ErrorBoundary } from "../ErrorBoundary";

import flowStore from "@/components/Store/store";
import { useParams, usePathname } from "next/navigation";
import { useGetNodes } from "@/components/hooks/getNodes";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { useGetEdges } from "@/components/hooks/useGetEdges";
import Loading from "./loading";
  import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";

const selector = (state: any) => ({
  setInitialNodes: state.setInitialNodes,
  setInitialEdges: state.setInitialEdges,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Authenticated>
        <AuthenticatedContent>{children}</AuthenticatedContent>
      </Authenticated>
    </ErrorBoundary>
  );
}

function AuthenticatedContent({ children }: { children: React.ReactNode }) {
  const { setInitialEdges, setInitialNodes } = flowStore(useShallow(selector));
  const params = useParams();
  const projectId = params.projectId as string;
  
  // Get the current pathname to determine active page
  const pathname = usePathname();
  
  
  // For debugging purposes
  
  
  if (!projectId) return <div>No project id or Incorrect Project Id</div>;

  const { nodes, isLoading, error } = useGetNodes(projectId);
  const {
    edges,
    isLoading: edgesLoading,
    error: edgesError,
  } = useGetEdges(projectId);

  useEffect(() => {
    setInitialNodes(nodes);
    setInitialEdges(edges);
  }, [nodes, edges]);

  if (isLoading || edgesLoading) {
    // Add a delay of 500ms before showing loading state
    return <Loading />;
  }

  const currentPage = pathname.split('/')[1] || 'dashboard';


  if (error || edgesError) {
    return <div>Error: {error?.message || edgesError?.message}</div>;
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
                      
                      <DropdownMenu > 
                        <DropdownMenuTrigger className="flex items-center gap-1">
                          {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
                          <ChevronDownIcon className="scale-75" /> 
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem>
                              <Link href={`/schemas/${projectId}`}>Schemas</Link>
                            </DropdownMenuItem>  
                          <DropdownMenuItem>
                              <Link href={`/global-variables/${projectId}`}>Global Variables</Link>
                            </DropdownMenuItem>
                          <DropdownMenuItem>
                              <Link href={`/settings/${projectId}`}>Settings </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
