"use client"

import { Button } from "@/components/ui/button";
import {
  Authenticated,
  Unauthenticated,
  
} from "convex/react";


import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { StickyHeader } from "@/components/layout/sticky-header";

import Signout from "./Signout";


import { NavigationMenuLinks } from "@/components/NavigationMenu";
import Link from "next/link";
import Image from "next/image";




export default function Home() {
  
  return (
    <>
      <StickyHeader className="px-4 py-2">
        <div className="flex justify-center items-center   ">
        <div className="flex justify-between items-center w-full max-w-7xl px-4 md:px-4 md:py-3 bg-white rounded-2xl border border-background shadow-sm"> 
         <h1 className="text-xl md:text-2xl font-bold">
          <Link href="/" className="flex items-center gap-1 md:gap-2">
            <Image src="/icons/Bridgeflow.svg" alt="Bridgeflow" width={24} height={24} className="shadow-lg md:w-[30px] md:h-[30px]" />
            <span className="hidden sm:inline font-mono">Bridgeflow</span>
          </Link>
          </h1>

         <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:block">
              <NavigationMenuLinks/>
            </div>
            <SignInAndSignUpButtons />
          </div>
          </div>
        </div>
      </StickyHeader>
              
        <Signout  />
        
        
      
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
          <Button variant="primary">Sign up</Button>
        </SignUpButton>
      </Unauthenticated>
    </div>
  );
}


