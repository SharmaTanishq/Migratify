import React, { useState, useEffect } from "react";
import SchemaViewer from "./index";
import { jsonToSchema } from "@/utils/jsonSchema";
import { VTEX_ORDER_SCHEMA } from "../CustomNodes/Mail/Drawer";
import { ExtendedJSONSchema7 } from "./types";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDndMonitor,
} from "@dnd-kit/core";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

import { ViewData } from "./TabsComponent";

import { cn } from "@/lib/utils";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ModalStore } from "../Store/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/shadcn-tabs";
import { Button } from "../ui/button";
import webhooksStore from "@/components/Store/webhooks";
import flowStore from "@/components/Store/store";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "../ui/textarea";

interface InputFieldProps {
  label: string;
  fieldId: string;
  isDragging: boolean;
  value: string;
  onChange: (value: string) => void;
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  indented?: boolean;
}

const InputField = ({
  label,
  fieldId,
  isDragging,
  value,
  onChange,
  enabled,
  onEnabledChange,
  indented = false,
}: InputFieldProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: fieldId,
  });

  return (
    <div className={cn("flex flex-col", indented && "ml-6")}>
      <div className="flex items-center justify-between mb-2">
        <Label htmlFor={fieldId} className="text-sm font-normal text-black">
          {label}
        </Label>
      </div>

      <div ref={setNodeRef} className="flex items-center justify-between gap-6">
        <Input
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={!enabled}
          className={cn(
            "w-full transition-all duration-200 rounded-md border-gray-300",
            !enabled && "opacity-50 cursor-not-allowed",
            isDragging &&
              enabled &&
              "border-2 border-dashed border-gray-400  bg-gray-50",
            isOver &&
              enabled &&
              "border-2 border-dashed border-purple-500 bg-purple-50/50"
          )}
          placeholder={
            fieldId === "orderId" ? "Order Id" : 
            fieldId === "itemName" ? "Enter item name..." : 
            fieldId === "itemImage" ? "Enter item image..." : 
            fieldId === "itemQuantity" ? "Enter item quantity..." : 
            fieldId === "itemPrice" ? "Enter item price..." : 
            fieldId === "shippingAddress" ? "Enter shipping address..." : 
            fieldId === "billingAddress" ? "Enter billing address..." : 
            `Enter ${label.toLowerCase()}...`
          }
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Checkbox
                  id={`${fieldId}-enabled`}
                  checked={enabled}
                  onCheckedChange={onEnabledChange}
                  className="w-5 h-5 rounded-sm  data-[state=checked]:border-none data-[state=checked]:bg-green-600 "
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {enabled ? "Disable" : "Enable"} {label}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

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
  
  // Get parent node and events
  const sourceNode = flowStore((state) => {
    const edges = state.edges.filter(edge => edge.target === nodeId);
    if (edges.length > 0) {
      const sourceId = edges[0].source;
      return state.getNode(sourceId);
    }
    return null;
  });
  
  const parentEvents = webhooksStore().getEvents(sourceNode?._id as string) || [];

  useDndMonitor({
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
    onDragCancel: () => setIsDragging(false),
  });

  const handleFieldChange = (field: keyof Fields) => (value: string) => {
    onFieldChange(field, value);
  };

  const handleFieldEnabledChange = (field: keyof Fields) => (enabled: boolean) => {
    onFieldEnabledChange(field, enabled);
  };

  return (
    <div className="rounded-lg bg-white p-3 shadow-sm border border-gray-100 flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1">
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

        <TabsContent 
          value="global" 
          className="p-6"
        >
          <div className="space-y-6">
            <div className="text-gray-600 text-sm mb-4">
              Configure Values and Data for your emails here.
            </div>
            
            <div className="text-gray-500 text-sm font-medium mb-4">
              Drag Values from Schema or JSON
            </div>

            {/* Order Information */}
            <div className="space-y-3 mb-6">
              <InputField
                label="Order Number :"
                fieldId="orderId"
                isDragging={isDragging}
                value={fields.orderId.value}
                onChange={handleFieldChange("orderId")}
                enabled={fields.orderId.enabled}
                onEnabledChange={handleFieldEnabledChange("orderId")}
              />
            </div>

            {/* Items Section */}
            <div className="mb-6">
              <h3 className="text-base font-medium mb-3">Items</h3>
              <div className="space-y-4">
                <InputField
                  label="Item Name"
                  fieldId="itemName"
                  isDragging={isDragging}
                  value={fields.itemName.value}
                  onChange={handleFieldChange("itemName")}
                  enabled={fields.itemName.enabled}
                  onEnabledChange={handleFieldEnabledChange("itemName")}
                  indented
                />
                
                <InputField
                  label="Item Image"
                  fieldId="itemImage"
                  isDragging={isDragging}
                  value={fields.itemImage.value}
                  onChange={handleFieldChange("itemImage")}
                  enabled={fields.itemImage.enabled}
                  onEnabledChange={handleFieldEnabledChange("itemImage")}
                  indented
                />
                
                <InputField
                  label="Item Quantity"
                  fieldId="itemQuantity"
                  isDragging={isDragging}
                  value={fields.itemQuantity.value}
                  onChange={handleFieldChange("itemQuantity")}
                  enabled={fields.itemQuantity.enabled}
                  onEnabledChange={handleFieldEnabledChange("itemQuantity")}
                  indented
                />
                
                <InputField
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
              <h3 className="text-base font-medium mb-3">Shipping Information</h3>
              <div className="space-y-4">
                <InputField
                  label="Shipping Address"
                  fieldId="shippingAddress"
                  isDragging={isDragging}
                  value={fields.shippingAddress.value}
                  onChange={handleFieldChange("shippingAddress")}
                  enabled={fields.shippingAddress.enabled}
                  onEnabledChange={handleFieldEnabledChange("shippingAddress")}
                  indented
                />
                
                <InputField
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
          </div>
        </TabsContent>

        <TabsContent value="event" className="p-6">
          <div className="space-y-6">
            <div className="text-gray-600 text-sm mb-4">
              Configure event-specific values here.
            </div>
            
            {parentEvents.length > 0 ? (
              <div className="space-y-4">
                {parentEvents.map((event) => (
                  <Collapsible key={event.event} className="border rounded-md">
                    <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-gray-50">
                      <span className="font-medium text-sm">{event.event}</span>
                      <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-3 pt-0 border-t">
                      {/* Subject Field */}
                      <div className="space-y-3 mb-4">
                        <InputField
                          label="Subject :"
                          fieldId="subject"
                          isDragging={isDragging}
                          value={fields.subject.value}
                          onChange={handleFieldChange("subject")}
                          enabled={fields.subject.enabled}
                          onEnabledChange={handleFieldEnabledChange("subject")}
                        />
                      </div>
                      
                      {/* To Field */}
                      <div className="space-y-3 mb-4">
                        <InputField
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
                        <InputField
                          label="Content : HTML Markdown."
                          fieldId="content"
                          isDragging={isDragging}
                          value={fields.content.value}
                          onChange={handleFieldChange("content")}
                          enabled={fields.content.enabled}
                          onEnabledChange={handleFieldEnabledChange("content")}
                        />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-sm p-4 border rounded-md">
                No events available. Connect this node to a source node with events.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Save button outside of the tabs content for consistent visibility */}
      <div className="mt-4 flex justify-end">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          Save
        </Button>
      </div>
    </div>
  );
}

export const SchemaViewerDemo = () => {
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
      [field]: { ...prev[field], value } 
    }));
  };

  const handleFieldEnabledChange = (field: keyof Fields, enabled: boolean) => {
    setFields((prev) => ({ 
      ...prev, 
      [field]: { ...prev[field], enabled } 
    }));
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
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
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {modalOpen ? (
          <ResizablePanelGroup className=" gap-3 h-full" direction="horizontal">
            <ResizablePanel defaultSize={80} className="bg-white rounded-lg shadow-sm">
              <div className="p-3 max-h-[900px] overflow-auto">
                <ViewData schema={schema as ExtendedJSONSchema7} />
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel className="bg-white rounded-lg shadow-sm">
              <div className="p-2 max-w-[500px]">
                <DroppableArea
                  id="target"
                  items={items.target}
                  fields={fields}
                  onFieldChange={handleFieldChange}
                  onFieldEnabledChange={handleFieldEnabledChange}
                  nodeId={flowStore.getState().nodes.find(node => node.type === "mailNode")?.id || ""}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <div className="w-full">
            <DroppableArea
              id="target"
              items={items.target}
              fields={fields}
              onFieldChange={handleFieldChange}
              onFieldEnabledChange={handleFieldEnabledChange}
              nodeId={flowStore.getState().nodes.find(node => node.type === "mailNode")?.id || ""}
            />
          </div>
        )}
      </DndContext>
    </div>
  );
};

export default SchemaViewerDemo;
