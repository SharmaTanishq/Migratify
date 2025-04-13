"use client"
import { texts } from "@/components/helpers/constants";
import { MorphingText } from "@/components/magicui/morphing-text";
import { motion } from "framer-motion";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.   
  return (
    <motion.div 
        className="flex justify-center items-center w-full min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
    >
      <MorphingText texts={texts} className="text-4xl font-bold text-black" />
    </motion.div>
  );
}
