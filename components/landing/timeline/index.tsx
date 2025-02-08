import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { FlipWords } from "@/components/ui/flip-words";
import { VtexCommerceNode } from "@/components/AddNodes/VtexNode";

export function TimelineSection() {
  const words = ["faster", "cheaper", "visually", "better", "easier" , "smarter"];
  const data = [
    {
      title: "Integrate",
      content: (
        <div>
          
          <div >
            <Image
              src={"/images/integrate.png"}
              alt="startup template"
              width={1000}
              height={1000}
              className="rounded-lg object-contain h-full w-full "
            />
            
          </div>
        </div>
      ),
    },
    {
      title: "Migrate",
      content: (
        <div>
         
          <div >
            <Image
              src={"/images/withBridges.png"}
              alt="hero template"
              width={2000}
              height={2000}
              className="rounded-lg object-cover h-full w-full "
            />
           
          </div>
        </div>
      ),
    },
    {
      title: "Extend",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-2xl font-normal mb-4">
            Extend your capabilities by using our bridges such Join, Cron, Webhook, etc.
          </p>
         
          {/* <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
           
          </div> */}
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
