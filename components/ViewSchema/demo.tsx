import React, { useState } from "react";
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

import { ViewData } from "./TabsComponent";

import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { DraggableField } from "./DraggableField";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

interface InputFieldProps {
  label: string;
  fieldId: string;
  isDragging: boolean;
  value: string;
  onChange: (value: string) => void;
}

const InputField = ({
  label,
  fieldId,
  isDragging,
  value,
  onChange,
}: InputFieldProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: fieldId,
  });

  return (
    <div className="space-y-2">
     
      <div ref={setNodeRef}>
        <Input
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full transition-all duration-200",
            isDragging &&
              "border-2 border-dashed border-red-800/50 bg-red-50/5",
            isOver && "border-2 border-dashed border-red-400 bg-red-50/10"
          )}
          placeholder={`Map ${label.toLowerCase()}...`}
        />
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

interface Fields {
  orderId: string;
  customerName: string;
  shippingInfo: string;
  billingInfo: string;
  items: string;
}

function DroppableArea({
  id,
  items,
  fields,
  onFieldChange,
}: {
  id: string;
  items: DraggedItem[];
  fields: Fields;
  onFieldChange: (field: keyof Fields, value: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  useDndMonitor({
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
    onDragCancel: () => setIsDragging(false),
  });

  const handleFieldChange = (field: keyof Fields) => (value: string) => {
    onFieldChange(field, value);
  };

  return (
    <div
      className={cn(
        "p-6 rounded-lg  bg-white  transition-all duration-200",
        
      )}
    >
      <div className="space-y-6">
        {/* Order Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Order Information</h3>
          <InputField
            label="Order ID"
            fieldId="orderId"
            isDragging={isDragging}
            value={fields.orderId}
            onChange={handleFieldChange("orderId")}
          />
        </div>

        <Separator />

        {/* Customer Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
          <InputField
            label="Customer Name"
            fieldId="customerName"
            isDragging={isDragging}
            value={fields.customerName}
            onChange={handleFieldChange("customerName")}
          />
        </div>

        <Separator />

        {/* Shipping & Billing */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
            <InputField
              label="Shipping Details"
              fieldId="shippingInfo"
              isDragging={isDragging}
              value={fields.shippingInfo}
              onChange={handleFieldChange("shippingInfo")}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
            <InputField
              label="Billing Details"
              fieldId="billingInfo"
              isDragging={isDragging}
              value={fields.billingInfo}
              onChange={handleFieldChange("billingInfo")}
            />
          </div>
        </div>

        <Separator />

        {/* Items */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Order Items</h3>
          <InputField
            label="Items"
            fieldId="items"
            isDragging={isDragging}
            value={fields.items}
            onChange={handleFieldChange("items")}
          />
        </div>
      </div>
    </div>
  );
}

export const SchemaViewerDemo = () => {
  const schema = jsonToSchema(VTEX_ORDER_SCHEMA, "Webhook Headers");
  const [items, setItems] = useState<{ [key: string]: DraggedItem[] }>({
    source: [],
    target: [],
  });

  const [fields, setFields] = useState<Fields>({
    orderId: "",
    customerName: "",
    shippingInfo: "",
    billingInfo: "",
    items: "",
  });

  const handleFieldChange = (field: keyof Fields, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
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
        [fieldId]: draggedItem.path,
      }));
    }
  };

  return (
    <div className="">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <ResizablePanelGroup className="grid grid-cols-2 gap-3 " direction="horizontal">
          <ResizablePanel defaultSize={80}>
            <div className="p-3">
              <ViewData schema={schema as ExtendedJSONSchema7} />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="pl-3 max-w-[500px]">
              <DroppableArea
                id="target"
                items={items.target}
                fields={fields}
                onFieldChange={handleFieldChange}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </DndContext>
    </div>
  );
};

export default SchemaViewerDemo;
