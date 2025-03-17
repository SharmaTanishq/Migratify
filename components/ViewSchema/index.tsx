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

function DroppableArea({
  id,
  items,
  fields,
  onFieldChange,
  onFieldEnabledChange,
  nodeId,
}: {
  id: string;
  items: DraggedItem[];
  fields: Fields;
  onFieldChange: (field: keyof Fields, value: string) => void;
  onFieldEnabledChange: (field: keyof Fields, enabled: boolean) => void;
  nodeId: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState("global");

  const dataMappings = useQuery(
    api.mappings.dataMap.getDataMappings,
    nodeId ? { nodeId: nodeId } : "skip"
  );

  const saveDataMappings = useMutation(api.mappings.dataMap.saveDataMappings);

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
    nodeId ? { nodeId: sourceNode?._id as string } : "skip"
  );

  useEffect(() => {
    if (getMappings) {
      console.log(getMappings);
    }
  }, [getMappings]);

  const parentEvents =
    webhooksStore().getEvents(sourceNode?._id as string) || [];

  useDndMonitor({
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
    onDragCancel: () => setIsDragging(false),
  });

  const handleSave = () => {
    saveDataMappings({
      nodeId,
      projectId: sourceNode?.projectId as string,
      mappings: {
        global: items.map((item) => ({
          fieldId: item.id,
          value: item.path,
          enabled: true,
          type: "string",
          isActive: true,
        })),
        events: parentEvents.map((event) => ({
          eventName: event.event,
          fields: items.map((item) => ({
            fieldId: item.id,
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
    <div className="rounded-lg bg-white p-2 flex flex-col overflow-auto  ">
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

        <TabsContent value="global" className="p-6 min-h-[60vh] flex-1">
          <div className="space-y-4">
            <div className="text-gray-500 text-sm font-medium mb-4">
              Drag Values from Schema or JSON
            </div>

            {/* Order Information */}
            <ScrollArea className="h-[50vh] p-4 pt-0 pb-0 pl-0">
              <ScrollBar orientation="vertical" />
              <div className="mb-6  " style={{ scrollbarGutter: "stable" }}>
                <h3 className="text-base font-medium mb-3">
                  Order Information
                </h3>
                <div className="space-y-2">
                  <DroppableInput
                    label="Order Number :"
                    fieldId="orderId"
                    isDragging={isDragging}
                    value={fields.orderId.value}
                    onChange={handleFieldChange("orderId")}
                    enabled={fields.orderId.enabled}
                    indented
                    onEnabledChange={handleFieldEnabledChange("orderId")}
                  />
                </div>
              </div>

              {/* Items Section */}
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Items</h3>
                <div className="space-y-4">
                  <DroppableInput
                    label="Item Name"
                    fieldId="itemName"
                    isDragging={isDragging}
                    value={fields.itemName.value}
                    onChange={handleFieldChange("itemName")}
                    enabled={fields.itemName.enabled}
                    onEnabledChange={handleFieldEnabledChange("itemName")}
                    indented
                  />

                  <DroppableInput
                    label="Item Image"
                    fieldId="itemImage"
                    isDragging={isDragging}
                    value={fields.itemImage.value}
                    onChange={handleFieldChange("itemImage")}
                    enabled={fields.itemImage.enabled}
                    onEnabledChange={handleFieldEnabledChange("itemImage")}
                    indented
                  />

                  <DroppableInput
                    label="Item Quantity"
                    fieldId="itemQuantity"
                    isDragging={isDragging}
                    value={fields.itemQuantity.value}
                    onChange={handleFieldChange("itemQuantity")}
                    enabled={fields.itemQuantity.enabled}
                    onEnabledChange={handleFieldEnabledChange("itemQuantity")}
                    indented
                  />

                  <DroppableInput
                    label="Item Price"
                    fieldId="itemPrice"
                    isDragging={isDragging}
                    value={fields.itemPrice.value}
                    onChange={handleFieldChange("itemPrice")}
                    enabled={fields.itemPrice.enabled}
                    onEnabledChange={handleFieldEnabledChange("itemPrice")}
                    indented
                  />
                </div>
              </div>

              {/* Shipping Information */}
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">
                  Shipping Information
                </h3>
                <div className="space-y-4">
                  <DroppableInput
                    label="Shipping Address"
                    fieldId="shippingAddress"
                    isDragging={isDragging}
                    value={fields.shippingAddress.value}
                    onChange={handleFieldChange("shippingAddress")}
                    enabled={fields.shippingAddress.enabled}
                    onEnabledChange={handleFieldEnabledChange(
                      "shippingAddress"
                    )}
                    indented
                  />

                  <DroppableInput
                    label="Billing Address"
                    fieldId="billingAddress"
                    isDragging={isDragging}
                    value={fields.billingAddress.value}
                    onChange={handleFieldChange("billingAddress")}
                    enabled={fields.billingAddress.enabled}
                    onEnabledChange={handleFieldEnabledChange("billingAddress")}
                    indented
                  />
                </div>
              </div>
            </ScrollArea>
          </div>
        </TabsContent>

        <TabsContent value="event" className="p-6 min-h-[60vh]">
          <div className="space-y-6">
            <div className="text-gray-600 text-sm mb-4">
              Configure event-specific values here.
            </div>

            {parentEvents.length > 0 ? (
              <div className="space-y-4">
                <ScrollArea className="h-[calc(80vh-24rem)] pr-4">
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
                          <ChevronsUpDown className="h-4 w-4 text-gray-500" />
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
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
            ) : (
              <div className="text-gray-500 text-sm p-4 border rounded-md">
                No events available. Connect this node to a source node with
                events.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Save button outside of the tabs content for consistent visibility */}
      <div className="mt-4 flex justify-end">
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </Button>
      </div>
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

      // Update the items list
      setItems((prev) => ({
        ...prev,
        target: [...prev.target, draggedItem],
      }));

      // Update the field value directly through state
      const fieldId = over.id as keyof Fields;
      setFields((prev) => ({
        ...prev,
        [fieldId]: { ...prev[fieldId], value: draggedItem.path },
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
          <ResizablePanelGroup className=" gap-3 h-full" direction="horizontal">
            <ResizablePanel defaultSize={60} className="bg-white  shadow-sm">
              <div className="p-3 ">
                <ViewData schema={schema as ExtendedJSONSchema7} />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel className="bg-white shadow-sm">
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
            />
          </div>
        )}
      </DndContext>
    </div>
  );
};

export default DataViewer;
