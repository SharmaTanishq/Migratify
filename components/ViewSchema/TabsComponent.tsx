import SchemaViewer from ".";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/shadcn-tabs";

import { ExtendedJSONSchema7 } from "./types";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

import { VTEX_ORDER_SCHEMA } from "../CustomNodes/Mail/Drawer";
import { DraggableJSONTree } from "./DraggableJSONTree";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export function ViewData({ schema }: { schema: ExtendedJSONSchema7 }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Tabs defaultValue="schema" className="p-4 pl-0 bg-white rounded-lg overflow-x-hidden">
      <div className="flex justify-between px-4 items-center w-full mb-4 ">
        {/* Search bar on the left */}
        <div className="relative w-1/2 ">
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
          <TabsTrigger
            value="schema"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Schema
          </TabsTrigger>
          <TabsTrigger
            value="json"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            JSON
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="schema" className="pl-7 overflow-x-hidden">
        <SchemaViewer
          schema={schema as ExtendedJSONSchema7}
          searchTerm={searchTerm}
        />
      </TabsContent>

      <TabsContent value="json" className="pl-7 overflow-x-hidden">
        <ScrollArea className="h-full flex-1 overflow-x-hidden">
          <ScrollBar orientation="vertical" />
          <DraggableJSONTree
            data={VTEX_ORDER_SCHEMA}
            className="max-h-[60vh] overflow-x-hidden"
            searchTerm={searchTerm}
          />
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
