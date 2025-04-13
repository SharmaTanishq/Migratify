import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-32 cursor-pointer overflow-hidden rounded-full  bg-none p-2 text-center font-semibold text-sm",
        className
      )}
      {...props}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-28 group-hover:opacity-0">
        {text}
      </span>
      <div className=" absolute top-0 z-10 flex h-full w-full translate-x-20  items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-2 group-hover:opacity-100 ">
        <span>{text}</span>
        <ArrowRight />
      </div>
      <div className="absolute left-[15%] top-[40%] h-2 w-2 scale-[1] rounded-full bg-gradient-to-r from-sidebar-primary to-sidebar-primary/70 transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] "></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export default InteractiveHoverButton;
