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
import { useAction, useMutation, useQuery } from "convex/react";
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
import HTMLEditor from "../monaco/html";
import HTMLPreview from "../monaco/html/preview";
import { IconWand } from "@tabler/icons-react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

// Improved type definitions
interface Field {
  id: string;
  label: string;
  type: string;
}

interface Schema {
  globalFields: SchemaSection[];
  eventFields: SchemaSection[];
}

interface SchemaSection {
  sectionName: string;
  fields: Field[];
}

interface FieldMapping {
  fieldId: string;
  value: string;
  enabled: boolean;
  type: string;
  isActive: boolean;
}

interface DraggedItem {
  id: string;
  path: string;
  type: string;
  value: any;
}

// Consolidated state interfaces
interface ViewSchemaState {
  mappings: {
    [fieldId: string]: {
      value: string;
      enabled: boolean;
    };
  };
  activeTab: "preview" | "configuration";
  isDragging: boolean;
}

// Component interfaces
interface DroppableAreaProps {
  id: string;
  state: ViewSchemaState;
  setState: React.Dispatch<React.SetStateAction<ViewSchemaState>>;
  nodeId: string;
}

interface DataViewerProps {}

// Schema definition
const schema: SchemaSection[] = [
  {
    sectionName: "Order Information",
    fields: [
      { id: "orderId", label: "Order ID", type: "string" },
      { id: "orderDate", label: "Order Date", type: "string" },
    ],
  },
  {
    sectionName: "Items Information",
    fields: [
      { id: "itemId", label: "Item ID", type: "string" },
      { id: "itemName", label: "Item Name", type: "string" },
      { id: "itemPrice", label: "Item Price", type: "string" },
      { id: "itemQuantity", label: "Item Quantity", type: "string" },
      { id: "itemImage", label: "Item Image", type: "string" },
    ],
  },
  {
    sectionName: "Shipping Information",
    fields: [
      { id: "shippingAddress", label: "Shipping Address", type: "string" },
      { id: "shippingNumber", label: "Shipping Number", type: "string" },
      { id: "shippingPrice", label: "Shipping Price", type: "string" },
      { id: "shippingStatus", label: "Shipping Status", type: "string" },
    ],
  },
  {
    sectionName: "Billing Information",
    fields: [
      { id: "billingAddress", label: "Billing Address", type: "string" },
      { id: "billingAmount", label: "Billing Amount", type: "string" },
    ],
  },
];

const DroppableArea: React.FC<DroppableAreaProps> = ({
  id,
  state,
  setState,
  nodeId,
}) => {
  const saveDataMappings = useMutation(api.mappings.dataMap.saveDataMappings);
  const getMappings = useQuery(
    api.mappings.dataMap.getMappings,
    nodeId ? { nodeId: nodeId } : "skip"
  );
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

  const [fieldSchema, setFieldSchema] = useState<SchemaSection[]>([]);

  const [htmlContent, setHtmlContent] = useState<string>("");

  const generate = useAction(api.ai.generateHtml.generate);
  const stream = useQuery(api.ai.generateHtml.getLatestStream);

  console.log(stream);

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    getDefaultSchema("Twilio").then((res) => {
      console.log(res.data);
      setFieldSchema(res.data[0].schema_json);
    });
  }, [sourceNode]);

  const parentEvents =
    webhooksStore().getEvents(sourceNode?._id as string) || [];

  useDndMonitor({
    onDragStart: () => setState((prev) => ({ ...prev, isDragging: true })),
    onDragEnd: () => setState((prev) => ({ ...prev, isDragging: false })),
    onDragCancel: () => setState((prev) => ({ ...prev, isDragging: false })),
  });

  const jsonSchema = JSON.parse(
    JSON.stringify({
      orderId: "1234567890",
      orderDate: "2021-01-01",
      items: [
        {
          itemId: "1234567890",
          itemName: "Item 1",
        },
      ],
    })
  );

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await generate({ jsonSchema });
      toast({
        title: "Started generating email",
        description: "Please wait while we generate the email",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON schema",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (getMappings) {
      const formattedMappings: {
        [fieldId: string]: { value: string; enabled: boolean };
      } = {};

      if (state.activeTab === "configuration" && getMappings.globalFields) {
        // Load global fields
        getMappings.globalFields.forEach((field: FieldMapping) => {
          formattedMappings[field.fieldId] = {
            value: field.value,
            enabled: field.enabled,
          };
        });
      } else if (state.activeTab === "preview" && getMappings.eventFields) {
        // Load event fields for the current event
        const currentEvent = parentEvents[0]; // You might want to track the current event in state
        if (currentEvent) {
          const eventMapping = getMappings.eventFields.find(
            (ef) => ef.eventName === currentEvent.event
          );
          if (eventMapping) {
            eventMapping.fields.forEach((field: FieldMapping) => {
              formattedMappings[field.fieldId] = {
                value: field.value,
                enabled: field.enabled,
              };
            });
          }
        }
      }

      setState((prev) => ({ ...prev, mappings: formattedMappings }));
    }
  }, [getMappings, state.activeTab]);

  const handleSave = async () => {
    const mappingsArray = Object.entries(state.mappings).map(
      ([fieldId, data]) => ({
        fieldId,
        value: data.value,
        enabled: data.enabled,
        type: "string",
        isActive: true,
      })
    );

    try {
      if (state.activeTab === "configuration") {
        // Save global mappings
        await saveDataMappings({
          nodeId,
          projectId: sourceNode?.projectId as string,
          globalFields: mappingsArray,
        });
      } else {
        // Save event-specific mappings
        await saveDataMappings({
          nodeId,
          projectId: sourceNode?.projectId as string,
          eventFields: parentEvents.map((event) => ({
            eventName: event.event,
            fields: mappingsArray,
          })),
        });
      }

      toast({
        title: "Saved successfully",
        description: `${state.activeTab === "configuration" ? "Configuration" : "Preview"} mappings saved successfully`,
        duration: 1500,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error saving mappings",
        duration: 1500,
        variant: "destructive",
      });
    }
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setState((prev) => ({
      ...prev,
      mappings: {
        ...prev.mappings,
        [fieldId]: {
          ...prev.mappings[fieldId],
          value,
        },
      },
    }));
  };

  const handleFieldEnabledChange = (fieldId: string, enabled: boolean) => {
    setState((prev) => ({
      ...prev,
      mappings: {
        ...prev.mappings,
        [fieldId]: {
          ...prev.mappings[fieldId],
          enabled,
        },
      },
    }));
  };

  return (
    <div className="relative bg-white">
      <Tabs
        value={state.activeTab}
        onValueChange={(value: string) =>
          setState((prev) => ({
            ...prev,
            activeTab: value as "preview" | "configuration",
          }))
        }
        className="w-full flex-1"
      >
        <div className="px-1 pt-4">
          <TabsList className="grid w-[350px] grid-cols-2 bg-gray-100 rounded-md">
            
            <TabsTrigger
              value="configuration"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-none"
            >
              Configure
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
          </TabsList>
        </div>

    

        <TabsContent value="configuration" className="h-full">
          <Card className=" shadow-none border-none">
            <CardHeader className="text-gray-600 text-sm mb-4">
              <CardTitle>Configure event-specific values here.</CardTitle>
            </CardHeader>
            <CardContent>
              {parentEvents.length > 0 ? (
                <div className="space-y-4">
                  <ScrollArea className="h-[calc(80vh-10rem)] pr-4 pb-10">
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
                          <CollapsibleContent className="p-3  border-t">
                            {/* Subject Field */}
                            <div className="space-y-3 mb-4">
                              <DroppableInput
                                label="Subject :"
                                fieldId="subject"
                                isDragging={state.isDragging}
                                value={state.mappings.subject?.value || ""}
                                onChange={(value) =>
                                  handleFieldChange("subject", value)
                                }
                                enabled={
                                  state.mappings.subject?.enabled ?? true
                                }
                                onEnabledChange={(enabled) =>
                                  handleFieldEnabledChange("subject", enabled)
                                }
                              />
                            </div>

                            {/* To Field */}
                            <div className="space-y-3 mb-4">
                              <DroppableInput
                                label="to"
                                fieldId="to"
                                isDragging={state.isDragging}
                                value={state.mappings.to?.value || ""}
                                onChange={(value) =>
                                  handleFieldChange("to", value)
                                }
                                enabled={state.mappings.to?.enabled ?? true}
                                onEnabledChange={(enabled) =>
                                  handleFieldEnabledChange("to", enabled)
                                }
                              />
                            </div>

                            {/* Content Field */}
                            <Separator className="my-4" />
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label>Add Custom HTML</Label>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => {
                                    handleGenerate();
                                  }}
                                >
                                  <IconWand className="h-4 w-4 mr-2" />
                                  Generate with AI
                                </Button>
                              </div>
                              <div className="flex w-full h-[500px] p-1 shadow-sm">
                                <HTMLEditor
                                  value={stream?.html || ""}
                                  onChange={(newValue) => {
                                    setHtmlContent(newValue || "");
                                  }}
                                  height={"100%"}
                                  jsonSchema={VTEX_ORDER_SCHEMA}
                                />
                              </div>
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
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="preview" className=" max-h-[60vh]">
          <Card className=" shadow-none border-none">
            <CardHeader className="text-gray-600 text-sm mb-4">
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(80vh-10rem)] pr-4 pb-10">
              {parentEvents.length > 0 && (
                <div className="space-y-4">
                    <ScrollBar orientation="vertical" />
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
                      <CollapsibleContent className="p-3 border-t">
                        <HTMLPreview
                          content={stream?.html || ""}
                          jsonData={VTEX_ORDER_SCHEMA}
                        />
                      </CollapsibleContent>
                    </Collapsible>
                    ))}
                </div>
              )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const DataViewer: React.FC<DataViewerProps> = () => {
  const schema = jsonToSchema(VTEX_ORDER_SCHEMA, "Webhook Headers");
  const { modalOpen } = ModalStore();
  const [state, setState] = useState<ViewSchemaState>({
    mappings: {},
    activeTab: "configuration",
    isDragging: false,
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 1 },
    }),
    useSensor(PointerSensor, {
      activationConstraint: { delay: 2, tolerance: 2 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 0, tolerance: 1 },
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

      setState((prev) => ({
        ...prev,
        mappings: {
          ...prev.mappings,
          [over.id as string]: {
            value: draggedItem.path,
            enabled: true,
          },
        },
      }));
    }
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
          <ResizablePanelGroup className="gap-3 h-full" direction="horizontal">
            <ResizablePanel defaultSize={35} className="bg-white shadow-md">
              <div className="p-2 h-[80vh]">
                <ViewData schema={schema as ExtendedJSONSchema7} />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="bg-white rounded-xl">
              <div className="p-2 h-[80vh]">
                <DroppableArea
                  id="target"
                  state={state}
                  setState={setState}
                  nodeId={
                    flowStore
                      .getState()
                      .nodes.find((node) => node.type === "mailNode")?.id || ""
                  }
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <div className="w-full">
            <DroppableArea
              id="target"
              state={state}
              setState={setState}
              nodeId={
                flowStore
                  .getState()
                  .nodes.find((node) => node.type === "mailNode")?.id || ""
              }
            />
          </div>
        )}
      </DndContext>
    </div>
  );
};

export { DataViewer };
export default DataViewer;
