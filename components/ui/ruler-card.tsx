import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { InteractiveGridPattern } from "./interactive-grid-pattern";
import Image from "next/image";

interface RulerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  tag?: string;
  showPattern?: boolean;
  imageSrc?: string;
}

export function RulerCard({ 
  className,
  title,
  description,
  tag = "BridgeFlow",
  showPattern = true,
  imageSrc,
  ...props
}: RulerCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl p-8 border border-[#262626]",
        "bg-[#0f1011] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#0f1011] before:via-transparent before:to-transparent before:via-30%",
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-transparent after:to-[#0f1011] after:via-70%",
        "flex flex-col justify-end hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300",
        className
      )}
      {...props}
    >
      {showPattern && <InteractiveGridPattern className={cn(
        "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        "inset-x-[35%] inset-y-[-30%] h-[200%] skew-y-12",
      )}
      width={40}
      height={40}
      squares={[100, 80]}
      squaresClassName="hover:fill-blue-500"
      />}

      <div className="relative z-10 flex justify-between items-end w-full">
        <div className="space-y-4 max-w-[60%]">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm text-green-500">{tag}</span>
          </div>
          <h3 className="text-xl font-medium text-white">{title}</h3>
          {description && (
            <p className="text-sm text-white/70">{description}</p>
          )}
          <ArrowRight className="h-4 w-4 text-white/30" />
        </div>

        {imageSrc && (
          <div className="relative w-[180px] h-[180px] transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-2">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
} 