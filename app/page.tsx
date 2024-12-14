"use client";

import { Button } from "@/components/ui/button";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { Code } from "@/components/typography/code";
import { Link } from "@/components/typography/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { StickyHeader } from "@/components/layout/sticky-header";
import { Skeleton } from "@/components/ui/skeleton";
import Signout from "./Signout";
import { ModeToggle } from "@/components/helpers/ThemeToggler";
import { AnimatedBeamDemo } from "@/components/Organisms/AnimatedBeam";

export default function Home() {
  return (
    <>
      <StickyHeader className="px-4 py-2">
        <div className="flex justify-between items-center">
         <h1>Migratify</h1>
         <ModeToggle/>
          <SignInAndSignUpButtons />
        </div>
      </StickyHeader>
      
        <Authenticated>
          <SignedInContent />
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
        <UserButton afterSignOutUrl="#" />
      </Authenticated>
      <Unauthenticated>
        <SignInButton mode="modal" afterSignInUrl="/build">
          <Button variant="ghost">Sign in</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button>Sign up</Button>
        </SignUpButton>
      </Unauthenticated>
    </div>
  );
}

function SignedInContent() {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  const addNumber = useMutation(api.myFunctions.addNumber);

  if (viewer === undefined || numbers === undefined) {
    return (
      <>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </>
    );
  }

  return (
    <>
      
    </>
  );
}