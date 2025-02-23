"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  RowData,
  RowSelectionState,
  SortingState,
  TableMeta,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TableDataEmail, columns } from "./columns";

import { useEffect, useMemo } from "react";
import { toast } from "sonner";


declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    addRow: (rowIndex: number, row: TableDataEmail) => void;
    deleteRow: (rowIndex: number) => void;
  }
}

export function DataTableDemo({ nodeId }: { nodeId: string }) {
  const params = useParams();

  const saveMappings = useMutation(api.mappings.dataMap.saveMappings);

  const existingMappings = useQuery(api.mappings.dataMap.getMappings, {
    nodeId: nodeId as string,
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const [tableData, setTableData] = React.useState<TableDataEmail[]>([]);

    
 
  const table = useReactTable({
    data: tableData,
    columns: columns(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    
    meta: {
      
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        setTableData((old) => {
          const newData = old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...row,
                [columnId]: value,
              };
            }
            return row;
          });

          saveMappings({
            nodeId: nodeId,
            projectId: params.projectId as string,
            mappings: newData as any,
          })

          return newData;
        });

        setTableData((old) =>
          old.map((row, index) => {
            
            if (index === rowIndex) {
              return {
                ...row,
                [columnId]: value,
              };
            }
            return row;
          })
        );
        
       
      },
      addRow: (rowIndex, row) => {
        setTableData([...tableData, row]);
      },
      deleteRow: (rowIndex) => {
        setTableData(tableData.filter((_, index) => index !== rowIndex));
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    if (existingMappings && existingMappings.mappings !== tableData) {
      
      setTableData(existingMappings.mappings);
    }
  }, [existingMappings]);


  //   const debouncedSave = React.useMemo(
  //     () =>
  //       debounce((data: TableDataEmail[]) => {
  //         console.log(data);
  //         saveMappings({
  //           nodeId: nodeId,
  //           projectId: params.projectId as string,
  //           mappings: data as any,
  //         });
  //       }, 1000),
  //     [nodeId, params.projectId, saveMappings]
  //   );

  //   React.useEffect(() => {
  //     if (tableData.length > 0) {
  //       debouncedSave(tableData);
  //     }
  //   }, [tableData, debouncedSave]);

  

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter Fields..."
          value={
            (table.getColumn("targetField")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("targetField")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            className="ml-auto"
            onClick={() => {
              table.options.meta?.addRow(tableData.length, {
                id: Math.random().toString(36).substring(7),
                targetField: "",
                sourceField: "",
                type: "",
                isActive: true,
              });
            }}
          >
            <Plus />
            Add New
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
