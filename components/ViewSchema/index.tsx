import React, { useState, useEffect } from "react";

import { jsonToSchema } from "@/utils/jsonSchema";
import { VTEX_ORDER_SCHEMA } from "../CustomNodes/Mail/Drawer";
import { ExtendedJSONSchema7 } from "./types";
import { AutoScrollActivator, PointerSensor } from "@dnd-kit/core";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDndMonitor,
} from "@dnd-kit/core";

import { ViewData } from "./TabsComponent";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ModalStore } from "../Store/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/shadcn-tabs";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { snapCenterToCursor } from "@dnd-kit/modifiers";

import flowStore from "@/components/Store/store";
import DroppableInput from "./DroppableInput";
import webhooksStore from "@/components/Store/webhooks";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { getDefaultSchema } from "../CMS/api";







const schema = [
 {
    sectionName:"Order Information",
    fields:[
      {
        id:"orderId",
        label:"Order ID",
        type:"string",                
      },
      {
        id:"orderDate",
        label:"Order Date",
        type:"string",
      },
      
    ]
 },
 {
  sectionName:"Items Informations",
  fields:[
    {
      id:"itemId",
      label:"Item ID",
      type:"string",                
    },
    {
      id:"itemName",
      label:"Item Name",
      type:"string",
    },
    {
      id:"itemPrice",
      label:"Item Price",
      type:"string",
    },
    {
      id:"itemQuantity",
      label:"Item Quantity",
      type:"string",
    },
    {
      id:"itemImage",
      label:"Item Image",
      type:"string",
    },
    
    
    
    
    
  ]
 },
 {
  sectionName:"Shipping Information",
  fields:[
    {
      id:"shippingAddress",
      label:"Shipping Address",
      type:"string",
    },
    {
      id:"shippingNumber",
      label:"Shipping Number",
      type:"string",
    },
    {
      id:"shippingPrice",
      label:"Shipping Price",
      type:"string",
    },
    {
      id:"shippingStatus",
      label:"Shipping Status",
      type:"string",
    },

    
    
  ]
 },
 {
  sectionName:"Billing Information",
  fields:[
    {
      id:"billingAddress",
      label:"Billing Address",
      type:"string",
    },
    {
      id:"billingAmount",
      label:"Billing Amount",
      type:"string",
    },
    
    
    
  ]
 }
]








interface DraggedItem {
  id: string;
  path: string;
  type: string;
  value: any;
}

interface FieldState {
  value: string;
  enabled: boolean;
}

interface Fields {
  orderId: FieldState;
  itemName: FieldState;
  itemImage: FieldState;
  itemQuantity: FieldState;
  itemPrice: FieldState;
  shippingAddress: FieldState;
  billingAddress: FieldState;
  subject: FieldState;
  to: FieldState;
  content: FieldState;
}

// Add this interface for the schema values
interface SchemaValue {
  id: string;
  value: string;
}

function DroppableArea({
  id,
  items,
  fields,
  onFieldChange,
  onFieldEnabledChange,
  nodeId,
  schemaValues,
  onSchemaValueChange,
}: {
  id: string;
  items: DraggedItem[];
  fields: Fields;
  onFieldChange: (field: keyof Fields, value: string) => void;
  onFieldEnabledChange: (field: keyof Fields, enabled: boolean) => void;
  nodeId: string;
  schemaValues: SchemaValue[];
  onSchemaValueChange: (fieldId: string, value: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState("global");
  const [defaultSchema, setDefaultSchema] = useState<any>(null);

  const saveDataMappings = useMutation(api.mappings.dataMap.saveDataMappings);
  const { modalOpen } = ModalStore();



  const { toast } = useToast();

  // Get parent node and events
  const sourceNode = flowStore((state) => {
    const edges = state.edges.filter((edge) => edge.target === nodeId);
    if (edges.length > 0) {
      const sourceId = edges[0].source;
      return state.getNode(sourceId);
    }
    return null;
  });

  const getMappings = useQuery(
    api.mappings.dataMap.getDataMappings,
    nodeId ? { nodeId: nodeId } : "skip"
  );

  useEffect(() => {
    console.log(nodeId);
    if (getMappings) {
      console.log(getMappings);
    }
    getDefaultSchema('twilio').then((res)=>{
      setDefaultSchema(res)
    })
  
  }, []);

  useEffect(()=>{
    console.log(defaultSchema)
  },[defaultSchema])

  const parentEvents =
    webhooksStore().getEvents(sourceNode?._id as string) || [];

  useDndMonitor({
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
    onDragCancel: () => setIsDragging(false),
  });

  const handleSave = () => {
    // Helper function to find field label by id
    const findFieldLabel = (fieldId: string) => {
      for (const section of schema) {
        const field = section.fields.find(f => f.id === fieldId);
        if (field) {
          return field.id;
        }
      }
      return fieldId; // Fallback to id if label not found
    };

    saveDataMappings({
      nodeId,
      projectId: sourceNode?.projectId as string,
      mappings: {
        global: items.map((item) => ({
          fieldId: findFieldLabel(item.id as string),
          value: item.path,
          enabled: true,
          type: "string",
          isActive: true,
        })),
        events: parentEvents.map((event) => ({
          eventName: event.event,
          fields: items.map((item) => ({
            fieldId: findFieldLabel(item.id as string),
            value: item.path,
            enabled: true,
            type: "string",
            isActive: true,
          })),
        })),
      },
    })
      .then(() => {
        toast({
          title: "Saved successfully",
          description: "Values saved successfully",
          duration: 1500,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Error saving values",
          duration: 1500,
        });
      });
  };

  const handleFieldChange = (field: keyof Fields) => (value: string) => {
    onFieldChange(field, value);
  };

  const handleFieldEnabledChange =
    (field: keyof Fields) => (enabled: boolean) => {
      onFieldEnabledChange(field, enabled);
    };



  return (
    <div className=" relative bg-white">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full flex-1"
      >
        <div className="px-1 pt-4">
          <TabsList className="grid w-[180px] grid-cols-2 bg-gray-100 rounded-md">
            <TabsTrigger
              value="global"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-none"
            >
              Global
            </TabsTrigger>
            <TabsTrigger
              value="event"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-none"
            >
              Event
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="global" className={ cn("max-h-[60vh] ", modalOpen && "p-0")}>
          
            <Card className="shadow-none border-none ">
              <CardHeader className="text-gray-600 text-sm mb-4">
                <CardTitle>Drag Values from Schema or JSON</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(60vh-10rem)] p-2">
                  <ScrollBar orientation="vertical" />
                 
                  {schema && (
                      schema.map((schemaSection: any)=>{
                        return(
                          <div className="mb-6  ">

                          <h3 className="text-base font-medium mb-3">
                            {schemaSection.sectionName}
                        </h3>
                       
                       {schemaSection.fields.map((field:any,index:number)=>{
                        return(
                          <div className="space-y-2" key={index}>
                            <DroppableInput
                            label={field.label}
                            fieldId={field.id}
                            isDragging={isDragging}
                            value={schemaValues.find(v => v.id === field.id)?.value || ''}
                            onChange={(value) => {
                              handleFieldChange(field.id)(value);
                              onSchemaValueChange(field.id, value);
                            }}
                            enabled={true}
                            indented
                            onEnabledChange={handleFieldEnabledChange(field.id)}
                          />
                           
                        </div>
                        )
                      })}
                      </div>
                        )
                      })
                   
                  )}
                  
                </ScrollArea>
              
              </CardContent>
              <CardFooter className="sticky bottom-0 w-full bg-white flex justify-end">
                <div>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => {
                      handleSave();
                    }}
                  >
                    Save  
                  </Button>
                </div>
              </CardFooter>
            </Card>
            {/* Order Information */}
            
            
        
        </TabsContent>

        <TabsContent value="event" className=" max-h-[60vh]">
          <Card className=" shadow-none border-none">
            <CardHeader className="text-gray-600 text-sm mb-4">
              <CardTitle>Configure event-specific values here.</CardTitle>
            </CardHeader>
            <CardContent >
              {parentEvents.length > 0 ? (
                <div className="space-y-4">
                  <ScrollArea className="h-[calc(60vh-10rem)] pr-4">
                    <ScrollBar orientation="vertical" />
                    <div className="space-y-4">
                      {parentEvents.map((event) => (
                        <Collapsible
                          key={event.event}
                          className="border rounded-md"
                        >
                          <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-gray-50">
                            <span className="font-medium text-sm">
                              {event.event}
                            </span>
                            <Tooltip>
                            <TooltipTrigger asChild>
                            <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Expand</p>
                            </TooltipContent>
                            </Tooltip>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="p-3 pt-0 border-t">
                            {/* Subject Field */}
                            <div className="space-y-3 mb-4">
                              <DroppableInput
                                label="Subject :"
                                fieldId="subject"
                                isDragging={isDragging}
                                value={fields.subject.value}
                                onChange={handleFieldChange("subject")}
                                enabled={fields.subject.enabled}
                                onEnabledChange={handleFieldEnabledChange(
                                  "subject"
                                )}
                              />
                            </div>

                            {/* To Field */}
                            <div className="space-y-3 mb-4">
                              <DroppableInput
                                label="to"
                                fieldId="to"
                                isDragging={isDragging}
                                value={fields.to.value}
                                onChange={handleFieldChange("to")}
                                enabled={fields.to.enabled}
                                onEnabledChange={handleFieldEnabledChange("to")}
                              />
                            </div>

                            {/* Content Field */}
                            <div className="space-y-3">
                              <DroppableInput
                                label="Content : HTML Markdown."
                                fieldId="content"
                                isDragging={isDragging}
                                value={fields.content.value}
                                onChange={handleFieldChange("content")}
                                enabled={fields.content.enabled}
                                onEnabledChange={handleFieldEnabledChange(
                                  "content"
                                )}
                              />
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ) : (
                <div className="text-gray-500 text-sm p-4 border rounded-md">
                  No events available. Connect this node to a source node with
                  events.
                </div>
              )}
            </CardContent>
            <CardFooter className="sticky bottom-0 w-full bg-white flex justify-end">
                <div>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => {
                      handleSave();
                    }}
                  >
                    Save  
                  </Button>
                </div>
              </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
    </div>
  );
}

export const DataViewer = () => {
  const schema = jsonToSchema(VTEX_ORDER_SCHEMA, "Webhook Headers");
  const { modalOpen } = ModalStore();
  const [items, setItems] = useState<{ [key: string]: DraggedItem[] }>({
    source: [],
    target: [],
  });
  const [schemaValues, setSchemaValues] = useState<SchemaValue[]>([]);

  const [fields, setFields] = useState<Fields>({
    orderId: { value: "", enabled: true },
    itemName: { value: "", enabled: true },
    itemImage: { value: "", enabled: true },
    itemQuantity: { value: "", enabled: true },
    itemPrice: { value: "", enabled: true },
    shippingAddress: { value: "", enabled: true },
    billingAddress: { value: "", enabled: true },
    subject: { value: "", enabled: true },
    to: { value: "", enabled: true },
    content: { value: "", enabled: true },
  });

  const handleFieldChange = (field: keyof Fields, value: string) => {
    setFields((prev) => ({
      ...prev,
      [field]: { ...prev[field], value },
    }));
  };

  const handleFieldEnabledChange = (field: keyof Fields, enabled: boolean) => {
    setFields((prev) => ({
      ...prev,
      [field]: { ...prev[field], enabled },
    }));
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),

    useSensor(PointerSensor, {
      activationConstraint: { delay: 2, tolerance: 2 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 1,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.data.current) {
      const draggedItem = {
        id: active.id,
        path: active.data.current.path,
        type: active.data.current.type,
        value: active.data.current.value,
      } as DraggedItem;

      // Update schemaValues when an item is dropped
      setSchemaValues(prev => {
        const exists = prev.find(v => v.id === over.id);
        if (exists) {
          return prev.map(v => 
            v.id === over.id ? { ...v, value: draggedItem.path } : v
          );
        } else {
          return [...prev, { id: over.id as string, value: draggedItem.path }];
        }
      });

      // Update the items list
      setItems((prev) => ({
        ...prev,
        target: [...prev.target, draggedItem],
      }));

      // Update the field value directly through state
      const fieldId = over.id as keyof Fields;
      handleFieldChange(fieldId, draggedItem.path);
    }
  };

  const handleSchemaValueChange = (fieldId: string, value: string) => {
    setSchemaValues(prev => {
      const exists = prev.find(v => v.id === fieldId);
      if (exists) {
        return prev.map(v => v.id === fieldId ? { ...v, value } : v);
      } else {
        return [...prev, { id: fieldId, value }];
      }
    });
  };

  return (
    <div className="h-full">
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        autoScroll={{ activator: AutoScrollActivator.DraggableRect }}
        modifiers={[snapCenterToCursor]}
      >
        {modalOpen ? (
          <ResizablePanelGroup className=" gap-3 h-full" direction="horizontal">
            <ResizablePanel defaultSize={60} className="bg-white  shadow-md  ">
              <div className="p-2">
                <ViewData schema={schema as ExtendedJSONSchema7} />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel className="bg-white  rounded-xl">
              <div className="p-2 ">
                <DroppableArea
                  id="target"
                  items={items.target}
                  fields={fields}
                  onFieldChange={handleFieldChange}
                  onFieldEnabledChange={handleFieldEnabledChange}
                  nodeId={
                    flowStore
                      .getState()
                      .nodes.find((node) => node.type === "mailNode")?.id || ""
                  }
                  schemaValues={schemaValues}
                  onSchemaValueChange={handleSchemaValueChange}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <div className="w-full ">
            <DroppableArea
              id="target"
              items={items.target}
              fields={fields}
              onFieldChange={handleFieldChange}
              onFieldEnabledChange={handleFieldEnabledChange}
              nodeId={
                flowStore
                  .getState()
                  .nodes.find((node) => node.type === "mailNode")?.id || ""
              }
              schemaValues={schemaValues}
              onSchemaValueChange={handleSchemaValueChange}
            />
          </div>
        )}
      </DndContext>
    </div>
  );
};

export default DataViewer;
