"use client";

import { Calendar, ChevronDown, Home, Inbox, Search, Settings } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"



// Menu items.
const items = [
  {
    title: "Projects",
    url: "/projects",
    icon: Home,
  },
  {
    title: "Events",
    url: "/events",
    icon: Inbox,
  },
  {
    title: "Connections",
    url: "/connections",
    icon: Calendar,
  },
  {
    title: "Api Keys",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathName = usePathname();
  
  

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        Select Workspace
                        <ChevronDown className="ml-auto" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                      <DropdownMenuItem>
                        <span>Acme Inc</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Acme Corp.</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
              </SidebarMenuItem>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild isActive={pathName === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
