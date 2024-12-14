"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./sidebarPage"
import { ReactFlowProvider } from "@xyflow/react"
import { DnDProvider } from "@/components/AddNodes/DnDContext"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
        <ReactFlowProvider>
          <DnDProvider>
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-4 py-4">
        <SidebarTrigger />
        {children}
      </main>
      
    </SidebarProvider>
        </DnDProvider>
      </ReactFlowProvider>
  )
}