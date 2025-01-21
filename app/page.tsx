"use client";

import { Button } from "@/components/ui/button";
import {
  Authenticated,
  Unauthenticated,
  
} from "convex/react";


import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { StickyHeader } from "@/components/layout/sticky-header";

import Signout from "./Signout";
import { ModeToggle } from "@/components/helpers/ThemeToggler";

import { NavigationMenuLinks } from "@/components/NavigationMenu";


export default function Home() {
  return (
    <>
      <StickyHeader className="px-4 py-2">
        <div className="flex justify-center items-center  ">
        <div className="flex justify-between items-center w-full max-w-7xl "> 
         <h1 className="text-2xl font-bold ">BridgeFlow</h1>

        

         <div className="flex items-center gap-4">
            <NavigationMenuLinks/>
              <ModeToggle/>
            <SignInAndSignUpButtons />
          </div>
          </div>
        </div>
      </StickyHeader>
      
        <Authenticated>
          <Signout />
        </Authenticated>
        <Unauthenticated>
           {/* Added mx-4 for margin left and right */}           
              <Signout/>                     
        </Unauthenticated>
      
    </>
  );
}

function SignInAndSignUpButtons() {
  return (
    <div className="flex gap-4">
      <Authenticated>
        <UserButton  />
      </Authenticated>
      <Unauthenticated>
        <SignInButton mode="modal"    >
          <Button variant="ghost">Sign in</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button>Sign up</Button>
        </SignUpButton>
      </Unauthenticated>
    </div>
  );
}

