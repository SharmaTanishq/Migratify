import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import SchemaViewer from ".";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/shadcn-tabs";
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ExtendedJSONSchema7 } from "./types";
import { ScrollArea } from "../ui/scroll-area";
import { JSONTree } from 'react-json-tree';
import { VTEX_ORDER_SCHEMA } from "../CustomNodes/Mail/Drawer";
import { DraggableJSONTree } from './DraggableJSONTree';

export function ViewData({ schema }: { schema: ExtendedJSONSchema7 }) {
  return (
    <Tabs className="p-4 pl-0 bg-">
      <div className="flex justify-end w-full">
        <TabsList className=" flex justify-end ">
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="schema" className="h-[800px] overflow-auto">
        <div className="h-full">
          <SchemaViewer schema={schema as ExtendedJSONSchema7} />
        </div>
      </TabsContent>
      <TabsContent value="json" className=" h-[800px]  ">
        <ScrollArea className="h-full flex-1 ">
          <DraggableJSONTree data={VTEX_ORDER_SCHEMA} className="overflow-auto" />
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
