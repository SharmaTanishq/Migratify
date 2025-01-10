"use client";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./sidebarPage"
import { ReactFlowProvider } from "@xyflow/react"
import { DnDProvider } from "@/components/AddNodes/DnDContext"


 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
        <ReactFlowProvider>
          <DnDProvider> 
            <SidebarProvider>
              <AppSidebar />
                  <SidebarInset >
                       <SidebarTrigger />
                         
                        <div className="h-full px-4 py-4 m-4">
                          
                          {children}
                          
                        </div>
                      
                  </SidebarInset>
            </SidebarProvider>
        </DnDProvider>
      </ReactFlowProvider>
  )
}
