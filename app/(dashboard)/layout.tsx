"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./sidebarPage"
import { ReactFlowProvider } from "@xyflow/react"
import { DnDProvider } from "@/components/AddNodes/DnDContext"
import { StickyHeader } from "@/components/layout/sticky-header";
import { ModeToggle } from "@/components/helpers/ThemeToggler";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
        <ReactFlowProvider>
          <DnDProvider> 
    <SidebarProvider>
      <AppSidebar />
     
      <main className="w-full px-4 py-4">
      <StickyHeader className="px-4 py-2">
        <div className="flex justify-between items-center">
         <h1>Migratify</h1>
         <ModeToggle/>
          <SignInAndSignUpButtons />
        </div>
      </StickyHeader>
        <SidebarTrigger />
        <div className="h-full px-4 py-4">
          
          {children}
          
        </div>
      </main>
      
    </SidebarProvider>
        </DnDProvider>
      </ReactFlowProvider>
  )
}

function SignInAndSignUpButtons() {
  return (
    <div className="flex gap-4">
      <Authenticated>
        <UserButton afterSignOutUrl="#" />
      </Authenticated>
      <Unauthenticated>
        <SignInButton mode="modal" afterSignInUrl="/">
          <Button variant="ghost">Sign in</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button>Sign up</Button>
        </SignUpButton>
      </Unauthenticated>
    </div>
  );
}