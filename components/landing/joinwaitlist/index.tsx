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
    <div className="h-[22rem] w-full relative flex flex-col items-center justify-center antialiased  rounded-2xl p-4  overflow-hidden ">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-6xl md:text-7xl bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p></p>
        <p className="text-neutral-500 md:max-w-2xl max-w-xs mx-auto my-2  text-center relative z-10 text-xs md:text-[14px] font-medium ">
          Join Bridgeflow's waitlist. 
          We're building a visual, automated solution to make e-commerce platform migrations faster, 
          more reliable, and hassle-free. Get early access and help shape the future of data migration.
        </p>
        <div className="flex justify-center items-center">
        <PulsatingButton className="md:w-2/4 w-full z-10 mt-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white" onClick={()=>router.push("/waitlist")}>
          Join Waitlist
        </PulsatingButton>
        </div>
      </div>
      <DotPattern className={cn(
          "[mask-image:radial-gradient(200px_circle_at_bottom,white,transparent)] md:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] ",
        )}/>
      </div>
  );
}
