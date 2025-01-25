"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import PulsatingButton from "@/components/ui/pulsating-button";
import { useRouter } from "next/navigation";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export function Joinwaitlist() {
  const router = useRouter();
  return (
    <div className="h-[22rem] w-full rounded-md  relative flex flex-col items-center justify-center antialiased ">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-2xl mx-auto my-2  text-center relative z-10 text-[14px] font-medium mt-4">
          Join Bridgeflow's waitlist to be among the first to experience our AI-powered migration platform. 
          We're building a visual, automated solution to make e-commerce platform migrations faster, 
          more reliable, and hassle-free. Get early access and help shape the future of data migration.
        </p>
        <div className="flex justify-center items-center">
        <PulsatingButton className="w-2/4 z-10 mt-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white" onClick={()=>router.push("/waitlist")}>
          Join Waitlist
        </PulsatingButton>
        </div>
      </div>
      <DotPattern className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] ",
        )}/>
      </div>
  );
}
