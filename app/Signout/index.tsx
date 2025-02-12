import { ArrowRight } from "lucide-react";

import { useRouter } from "next/navigation";

import PulsatingButton from "@/components/ui/pulsating-button";
import Connect from "@/components/landing/flow-based/connect";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "@/components/AddNodes/DnDContext";
import { Joinwaitlist } from "@/components/landing/joinwaitlist";
import { FlipWords } from "@/components/ui/flip-words";

import { TimelineSection } from "@/components/landing/timeline";

import { SparklesText } from "@/components/ui/sparkles-text";
import GridPattern from "@/components/ui/grid-pattern";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";

const Signout = () => {
  const router = useRouter();
  const words = [
    "faster",
    "cheaper",
    "visually",
    "better",
    "easier",
    "smarter",
  ];
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto justify-center items-center py-10 border-l border-r border-background">
      <section className="w-full">
        <div className="relative max-w-6xl p-4 pl-10 md:py-20 gap-8 flex flex-col w-full h-full bg-white rounded-2xl border border-gray-300 overflow-hidden">
        <InteractiveGridPattern
              className={cn(
                "[mask-image:radial-gradient(700px_circle_at_right,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 right-5 "
              )}
              width={80}
              height={80}
            />
          <div className="flex flex-col h-full  justify-start items-start  ">
            
            <div className="inline-flex items-center mb-6 gap-2 px-4 py-2 rounded-full bg-background border shadow-sm border-white/10 text-sm">
              <span>Effortless Migration, Instant Integration</span>
              <ArrowRight className="w-4 h-4" />
            </div>

            <div className="text-4xl md:text-[70px]  text-[#0F1218] w-[15ch] leading-tight font-bold font-mono text-left ">
              The Faster way to replatform
            </div>

            <p className="max-w-[50ch] tracking-wide md:leading-tight mb-1 mt-4 md:mt-5 text-primaryGray font-light text-xs md:text-[16px] text-left">
              Bridgeflow helps drive more business by connecting to any
              e-commerce platform – and provides a Visual Tool that eases your
              workflows
            </p>
            <div className="flex w-2/4 md:w-1/4 justify-between mt-4 md:mt-10">
              <PulsatingButton
                onClick={() => router.push("/waitlist")}
                className="bg-gradient-to-r w-full  rounded-full from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 md:text-xl font-light text-white  transition-all duration-200"
              >
                Join Waitlist
              </PulsatingButton>
            </div>
          </div>
        </div>
      </section>

      {/* Section Two Bento Grid*/}
      <div className="flex flex-col justify-center items-center w-full  mt-10 ">
        <div className="text-4xl md:text-6xl mx-auto font-normal text-center bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent   p-4">
          Build
          <FlipWords words={words} className=" font-semibold " />
        </div>

        <div className="w-full ">
          <ReactFlowProvider>
            <DnDProvider>
              <Connect />
            </DnDProvider>
          </ReactFlowProvider>
        </div>
      </div>

      <div
        id="bridgeflow"
        className="w-full flex flex-col justify-center items-center md:mt-10 "
      >
        <TimelineSection />
      </div>

      {/* Section four Request demo */}
      <Joinwaitlist />

      {/* Footer */}

      <footer className="w-full mt-10 py-2 border-t">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; 2024 BridgeFlow. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Signout;
