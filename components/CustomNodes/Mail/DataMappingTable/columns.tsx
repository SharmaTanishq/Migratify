"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useMemo, memo } from "react";


import { Input } from "@/components/ui/input";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Save, Trash } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

export type TableDataEmail = {
  id: string;
  targetField: React.ReactNode;
  sourceField: React.ReactNode;
  type: React.ReactNode;
  isActive: boolean;
};

interface BankAccountsColumnsProps {
  onEdit: (bankAccount: TableDataEmail) => void;
  onDelete: (bankAccount: TableDataEmail) => void;
  deleteRow: (rowIndex: number) => void;
}

const EditableCell = memo(({ 
  value: initialValue, 
  row: { index }, 
  column: { id }, 
  table 
}: {
  value: string;
  row: { index: number };
  column: { id: string };
  table: any;
}) => {
  const [value, setValue] = useState(initialValue);

  // Update internal state when value prop changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Update the external data when the input is blurred
  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  return (
    <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={onBlur}
      className="h-8"
    />
  );
});



export const columns = (): ColumnDef<TableDataEmail>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
      
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "targetField",
    header: "Target Field",
    cell: ({ row, getValue, table }) => {
      const initialValue = getValue() as string;
      return (
        <EditableCell
          value={initialValue}
          row={row}
          column={{ id: "targetField" }}
          table={table}
        />
      );
    },
  },
  {
    accessorKey: "sourceField",
    header: "Source Field",
    cell: ({ row, getValue, table }) => {
      const initialValue = getValue() as string;
      return (
        <EditableCell
          value={initialValue}
          row={row}
          column={{ id: "sourceField" }}
          table={table}
        />
      );
    },
  
  },
  {
    accessorKey: "type",
    header: "Type",
    
    cell: ({ row, table }) => {
      const type = row.getValue("type");

      return (
        <Select value={type as string} onValueChange={(value) => {
          row.original.type = value;
          table.options.meta?.updateData(row.index, "type", value);
        }}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="string">String</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="boolean">Boolean</SelectItem>
              <SelectItem value="object">Object</SelectItem>
              <SelectItem value="array">Array</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    
    cell: ({ row, table }) => {
      const isActive = row.getValue("isActive") as boolean;

      return (
        <div className= "flex  ">
          <Switch id="isActive" checked={isActive}  onCheckedChange={(value) => {
            row.original.isActive = value;
            table.options.meta?.updateData(row.index, "isActive", value);
          }} className="data-[state=checked]:bg-green-500  "  />
        </div>

      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row,table }) => {
      const payment = row.id;
      
      return (
        <div className="flex items-center gap-2">
         
          
          <Button
            variant="destructive"
            size={"icon"}
            onClick={() => {
              //deleteRow(row.index);
              table.options.meta?.deleteRow(row.index);
            }}
          >
            <Trash />
          </Button>
         
        </div>
      );
    },
  },
];
