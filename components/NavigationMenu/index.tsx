"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { LockIcon } from "lucide-react"
import { BorderBeam } from "../ui/border-beam"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavigationMenuLinks() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
            <Link href="#bridgeflow" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                What is BridgeFlow?
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        <NavigationMenuItem>
          
          <NavigationMenuTrigger>Integrations</NavigationMenuTrigger>
          
          <NavigationMenuContent>
            <div>
              <BorderBeam />
      
            <ul className="grid  gap-3 p-4  md:grid-cols-3 lg:w-[600px]">
              {/* E-Commerce Section */}
              <li>
                <p className="p-2 text-sm font-bold">E-Commerce</p>
                <ListItem title="VTEX" href="/" >
                  Connect your Amazon store to sync products and orders
                </ListItem>
                <ListItem title="Shopify" href="/">
                  Integrate with Shopify for seamless product management
                </ListItem>
                <ListItem title="WooCommerce" href="/">
                  Sync your WooCommerce store data automatically
                </ListItem>
                
              </li>

              <li>
              {/* File Storage Section */}
              <p className="p-2 text-sm font-bold">PIM</p>
                <ListItem title="Akeneo" href="/">
                  Centralize and manage your product information efficiently
                </ListItem>
                <ListItem title="Salsify" href="/">
                  Enterprise-grade PIM for digital commerce
                </ListItem>
                <ListItem title="inRiver" href="/">
                  Connect to Google Drive for file storage
                </ListItem>
              </li>

              <li>
              {/* PIM Section */}
              <p className="p-2 text-sm font-bold">File Storage</p>
              <ListItem title="Oracle Cloud WMS" href="/">
                Enterprise warehouse management integration
              </ListItem>
              <ListItem title="Blue Yonder" href="/">
                End-to-end supply chain solutions
              </ListItem>

              {/* Email Section */}
              <ListItem title="Front" href="/">
                Collaborative email management platform
              </ListItem>
              <ListItem title="Zendesk" href="/">
                Customer service and engagement tools
              </ListItem>
              </li>
            </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="https://bridgeflow.supahub.com/roadmap" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Roadmap 
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="" >
          <Link href="/" legacyBehavior passHref  >
            <NavigationMenuLink className={"cursor-default text-muted-foreground hover:bg-none text-sm p-2"  } >
              
              Documentation
            </NavigationMenuLink>
            
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
