import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import React, { useImperativeHandle, useRef } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { JSONPath } from "jsonpath-plus";
import { VTEX_ORDER_SCHEMA } from "../CustomNodes/Mail/Drawer";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface ExpressionRendererProps {
  value: string;
  schema?: any;
  inputRef: React.RefObject<HTMLInputElement>;
}

export interface ExpressionRendererHandle {
  focus: () => void;
  contains: (target: Node | null) => boolean;
}

export const ExpressionRenderer = React.forwardRef<
  ExpressionRendererHandle,
  ExpressionRendererProps
>(({ value, schema, inputRef }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const jsonValue = JSONPath({
    json: VTEX_ORDER_SCHEMA,
    flatten: true,
    parent: true,
    path: value,
  });

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    contains: (target: Node | null) => {
      return !!cardRef.current?.contains(target);
    },
  }));
  return (
   
      <Card
        ref={cardRef}
        className=" z-50 p-0 "
        onClick={(e) => {
          // Prevent mousedown from causing input blur
          e.stopPropagation();
        }}
      >
        <CardHeader className="p-0 px-2 pt-1">
          <div className="flex items-center justify-between">
            <CardTitle className="font-mono text-[12px] font-normal">
              Json Expression
            </CardTitle>

            <div className="flex items-center justify-center ">
              <Button variant="ghost" size="icon" onClick={() => {}} className=" scale-[0.8]" >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => {}} className="scale-[0.8]" >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-2 w-full bg-none">
          <div className="w-full min-w-[330px] h-full max-w-[350px]">
          <SyntaxHighlighter
            language="json"
            filename="jsonpath.txt"
            
            style={atomDark}
            wrapLines={true}
            wrapLongLines={true}
            showLineNumbers={true}
            customStyle={{
              fontSize: '12px',
              
              borderRadius: '10px',
              minHeight: '120px',
            }}
            
          >
            {JSON.stringify({ value: jsonValue[0] }, null, 2)}
          </SyntaxHighlighter>
          </div>
        </CardContent>
      </Card>
   
  );
});
