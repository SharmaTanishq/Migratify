"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";
import { Badge } from "@/components/ui/badge";

interface Item {
  name: string;
  status: string;
  badegeColor: string;
  icon: string;
  color: string;
  time: string;
  amount: string;
  date: string;
}

let notifications = [
  {
    name: "Order: #1275293",
    status:"Pending",
    badegeColor: "bg-yellow-500", 
    time: "15m ago",
    icon: "💬",
    color: "#00C9A7",
    amount: "$249",
    date: "2025-02-12",
  },
  {
    name: "Order: #8392741",
    status:"Fulfilled",
    badegeColor: "bg-green-400",
    time: "10m ago",
    icon: "💬",
    color: "#FFB800", 
    amount: "$89",
    date: "2025-02-12",
  },
  {
    name: "Order: #9471023",
    status:"Fulfilled",
    badegeColor: "bg-green-700",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
    amount: "$399",
    date: "2025-02-12",
  },
  {
    name: "Order: #6234891",
    status:"Cancelled",
    badegeColor: "bg-red-700",
    time: "2m ago",
    icon: "💬",
    color: "#1E86FF",
    amount: "$159",
    date: "2025-02-12",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, status, badegeColor, icon, color, time, amount, date }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full  cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center justify-between gap-3">
        <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            
            
          </figcaption>
          <Badge className={cn(badegeColor,"text-sm font-normal w-fit rounded-full ")}>
            {status}
          </Badge>
        </div>
        </div>
        <div className="flex flex-col items-center">
            <p className="text-sm font-normal dark:text-white/60">
                Amount
            </p>
        <p className="text-md font-normal dark:text-white/60">
            {amount}
        </p>
      
      </div>
      </div>
      
     
    </figure>
  );
};

export function OrdersList({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex  w-full flex-col overflow-hidden p-2",
        className,
      )}
    >
      <AnimatedList >
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}
