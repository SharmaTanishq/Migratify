"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import flowStore from "@/components/Store/store";
import { ConvexNode } from "@/components/Types/Flows/convexTypes";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShineBorder } from "@/components/magicui/shine-border";





export default function Page() {
  const params = useParams();
  const projectId = params.projectId as string;

  if (!projectId) return <div>No project id</div>;

  const { nodes }: { nodes: ConvexNode[] } = flowStore();

  return (
    <div className="flex w-full h-full items-center justify-center gap-4 ">
      <Card className="flex flex-col gap-4 w-full h-full p-5  ">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Schema Configurations</CardTitle>
          <CardDescription>
            Schemas are used to define the structure of the data that is
            available for the deployed nodes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {nodes.map((node) => (
              <TooltipProvider key={node._id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      key={node._id}
                      className=" border border-gray-200 relative transition-all duration-300 rounded-xl p-4 hover:border-gray-300 cursor-pointer hover:bg-gray-50  shadow-md hover:shadow-lg"
                      href={`/schemas/${projectId}/${node.data.ui.Name}/${node._id}`}
              >
                
                <div className="flex items-center gap-2 ">
                  <Image
                    src={node.data.ui.node_logo.url}
                    alt={node.data.ui.Name}
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-bold">{node.data.ui.Name}</h1>
                    <p className="text-sm text-gray-500">
                      {node.data.ui.node_description}
                    </p>
                  </div>
                    </div>
                  </Link> 
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  <p>Configure Schema for {node.data.ui.Name} </p>
                </TooltipContent>
              </Tooltip>
              </TooltipProvider>
            ))}
          </motion.div>
          {/* AVAILABLE NODES */}
        </CardContent>
      </Card>
    </div>
  );
}
