import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import {  Trash } from "lucide-react";

export type TableDataEmail = {
  id: string;
  targetField: React.ReactNode;
  sourceField: React.ReactNode;
  type: React.ReactNode;
};

export const columns: ColumnDef<TableDataEmail>[] = [
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
    cell: ({ row }) => (
      <Input
        placeholder="Add Target"
        autoFocus
        onChange={(e) => {
          // Here you would typically make an API call to save to database
          // For now just console logging the value
          console.log("New target field value:", e.target.value);
        }}
      />
    ),
  },
  {
    accessorKey: "sourceField",
    header: "Source Field",
    cell: ({ row }) => (
      <Input
        placeholder="Add Source"
        
        onChange={(e) => {
          // Here you would typically make an API call to save to database
          // For now just console logging the value
          console.log("New source field value:", e.target.value);
        }}
      />
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type");
      
      return (
        <Select>
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.id;
      
      return (
        <Button variant="destructive" size={"icon"} onClick={() => {
          
        }}><Trash/></Button>
      );
    },
  },
];
