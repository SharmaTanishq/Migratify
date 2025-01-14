"use client";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./sidebarPage"
import { ReactFlowProvider } from "@xyflow/react"
import { DnDProvider } from "@/components/AddNodes/DnDContext"
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Breadcrumb,  BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Folder } from "lucide-react";



 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    
        <ReactFlowProvider>
          <DnDProvider> 
            <SidebarProvider>
              <AppSidebar />
                  <SidebarInset >
                    {/* Add a condition here that renders header only on the flow creation page. */}
                  <header className="flex h-10 shrink-0 items-center gap-2">
                      <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                          <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                              <BreadcrumbLink href="#" >
                               Projects
                              </BreadcrumbLink>   
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem >
                              <BreadcrumbPage className="flex items-center gap-2">  <Folder className="w-4 h-4 font-bold"  />  Vtex Integration</BreadcrumbPage>
                            </BreadcrumbItem>
                          </BreadcrumbList>
                        </Breadcrumb>
                      </div>
                  </header>
                  <Separator orientation="horizontal" className="w-full" />
                         
                  <div className="h-full ">
                          
                    {children}
                          
                  </div>
                      
                  </SidebarInset>
            </SidebarProvider>
        </DnDProvider>
      </ReactFlowProvider>
  )
}
