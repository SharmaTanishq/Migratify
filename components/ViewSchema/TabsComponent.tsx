import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import SchemaViewer from ".";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/shadcn-tabs";
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ExtendedJSONSchema7 } from "./types";
import { ScrollArea } from "../ui/scroll-area";
import { JSONTree } from 'react-json-tree';
import { VTEX_ORDER_SCHEMA } from "../CustomNodes/Mail/Drawer";
import { DraggableJSONTree } from './DraggableJSONTree';
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export function ViewData({ schema }: { schema: ExtendedJSONSchema7 }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <Tabs defaultValue="schema" className="p-4 pl-0">
      <div className="flex justify-between items-center w-full mb-4">
        {/* Search bar on the left */}
        <div className="relative w-1/2">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search schema..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-4 py-2 w-full"
          />
        </div>
        
        {/* Tabs on the right */}
        <TabsList className="flex">
          <TabsTrigger value="schema" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none">Schema</TabsTrigger>
          <TabsTrigger value="json" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none">JSON</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="schema" className="h-[800px] overflow-auto">
        <div className="h-full">
          <SchemaViewer schema={schema as ExtendedJSONSchema7} searchTerm={searchTerm} />
        </div>
      </TabsContent>
      
      <TabsContent value="json" className="h-[800px]">
        <ScrollArea className="h-full flex-1">
          <DraggableJSONTree 
            data={VTEX_ORDER_SCHEMA} 
            className="overflow-auto" 
            searchTerm={searchTerm}
          />
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
