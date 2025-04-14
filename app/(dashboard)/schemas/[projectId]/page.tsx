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
            className="grid grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {nodes.map((node) => (
              <Link
                key={node._id}
                className="border border-gray-200 transition-all duration-300 rounded-xl p-4 hover:border-gray-300 cursor-pointer hover:bg-gray-100"
                href={`/schemas/${projectId}/${node.data.ui.Name}/${node._id}`}
              >
                <div className="flex items-center gap-2">
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
            ))}
          </motion.div>
          {/* AVAILABLE NODES */}
        </CardContent>
      </Card>
    </div>
  );
}
