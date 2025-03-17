import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input";
import React, { useImperativeHandle, useRef } from "react";
import { Button } from "../ui/button";

interface ExpressionRendererProps {
    value: string;
    
   inputRef: React.RefObject<HTMLInputElement>;
}

export interface ExpressionRendererHandle {
    focus: () => void;
    contains: (target: Node | null) => boolean;
  }

export const ExpressionRenderer = React.forwardRef<ExpressionRendererHandle, ExpressionRendererProps>(({ value, inputRef }, ref) => {

    const cardRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      contains: (target: Node | null) => {
        return !!cardRef.current?.contains(target);
      }
    }));
    return (
        <motion.div 
        ref={cardRef}
        className="  z-50  shadow-xl rounded-md left-0 w-full h-full"
       
                
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        >
          <Card 
            ref={cardRef}
          className="border border-gray-300 z-50"
          onClick={(e) => {
            // Prevent mousedown from causing input blur
            e.stopPropagation();
           
          }}
          
          >
            <CardHeader  >
              <CardTitle>JSON Value</CardTitle>
            </CardHeader>
            <CardContent>

              <Button className="w-full" variant="primary" onClick={() => {
                console.log(value);
              }} >Copy</Button>
              <pre className="text-sm font-mono">
                <code>{JSON.stringify(value, null, 2)}</code>
              </pre>
            </CardContent>
          </Card>
        </motion.div>
    )
})