"use client"

import * as React from "react"
import {
  
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  
} from "lucide-react"


import { NavUser } from "@/components/ui/nav-user"
import { NavMain } from "@/components/ui/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useUser } from "@clerk/nextjs"
import { useParams } from "next/navigation"



const data = {
  
  navMain: [
    
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const { user } = useUser();
  const params = useParams();
  const projectId = params.projectId as string;

  if(!user) {
    return null;
  }
  
  const userData = {
    name: `${user.fullName || ''} ${user.lastName || ''}`.trim() || "User",
    email: user.emailAddresses?.[0]?.emailAddress || "user@example.com",
    avatar: user.hasImage? user.imageUrl : "",
    fallback: `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.trim().toUpperCase() || "U",
  }
  return (
    <Sidebar variant="inset" {...props} collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem >
            <SidebarMenuButton variant={"outline"} size="lg"  asChild >
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain  items={data.navMain} projectId={projectId} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser  user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
