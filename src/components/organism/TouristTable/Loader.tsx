import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoaderTable() {
  const columns: ColumnDef<number>[] = [
    {
      accessorKey: "id",
      header: () => (
        <div className="bg-muted-foreground w-5 h-4 animate-pulse rounded-md"></div>
      ),
      cell: () => (
        <div className="bg-muted-foreground w-28 sm:w-64 h-4 animate-pulse rounded-md"></div>
      ),
    },
    {
      accessorKey: "name",
      header: () => (
        <div className="bg-muted-foreground w-16 h-4 animate-pulse rounded-md"></div>
      ),
      cell: () => (
        <div className="flex items-center gap-2">
          <div className="bg-muted-foreground grow-0 shrink-0 basis-6 h-6 animate-pulse rounded-full"></div>
          <div className="bg-muted-foreground basis-32 grow-1 h-4 animate-pulse rounded-md"></div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: () => (
        <div className="bg-muted-foreground w-16 h-4 animate-pulse rounded-md"></div>
      ),
      cell: () => (
        <div className="bg-muted-foreground w-36 h-4 animate-pulse rounded-md"></div>
      ),
    },
    {
      accessorKey: "location",
      header: () => (
        <div className="bg-muted-foreground w-16 h-4 animate-pulse rounded-md"></div>
      ),
      cell: () => (
        <div className="bg-muted-foreground w-24 h-4 animate-pulse rounded-md"></div>
      ),
    },
    {
      accessorKey: "createdat",
      header: () => (
        <div className="bg-muted-foreground w-16 h-4 animate-pulse rounded-md"></div>
      ),
      cell: () => (
        <div className="bg-muted-foreground w-32 h-4 animate-pulse rounded-md"></div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => (
        <div className="bg-muted-foreground max-w-16 h-4 w-full animate-pulse rounded-md"></div>
      ),
      cell: () => (
        <div className="flex items-center gap-2">
          <div className="bg-muted-foreground w-6 h-6 animate-pulse rounded-full"></div>
          <div className="bg-muted-foreground w-6 h-6 animate-pulse rounded-full"></div>
          <div className="bg-muted-foreground w-6 h-6 animate-pulse rounded-full"></div>
        </div>
      ),
    },
  ];

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 19];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="pb-4 flex justify-between items-center">
        <Button variant="outline">
          <div className="bg-muted-foreground w-[70px] h-5 rounded-md animate-pulse"></div>{" "}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline">
          Add Tourist
        </Button>
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
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
