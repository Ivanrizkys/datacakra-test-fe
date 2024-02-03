import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import Eye from "@/assets/icons/Eye";
import { Link } from "react-router-dom";
import Trash from "@/assets/icons/Trash";
import { ChevronDown } from "lucide-react";
import Pencil from "@/assets/icons/Pencil";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tourist, UpdateTouristRequest } from "@/types/tourist";

interface TouristTableProps {
  data: Tourist[];
  dialogDelete: boolean;
  dialogEdit: boolean;
  dialogCreate: boolean;
  touristData: UpdateTouristRequest;
  setDeletedId: React.Dispatch<React.SetStateAction<string>>;
  setDialogDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogCreate: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditTourist: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCreateTourist: (e: React.FormEvent<HTMLFormElement>) => void;
  setTouristData: React.Dispatch<React.SetStateAction<UpdateTouristRequest>>;
  handleDeleteTourist: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export default function TouristTable(props: TouristTableProps) {
  const {
    data,
    dialogDelete,
    dialogEdit,
    dialogCreate,
    touristData,
    setDeletedId,
    setDialogDelete,
    setDialogCreate,
    setDialogEdit,
    setTouristData,
    handleEditTourist,
    handleCreateTourist,
    handleDeleteTourist,
  } = props;

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns = useMemo<ColumnDef<Tourist>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => <p>{row.getValue("id")}</p>,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="basis-6 h-6 grow-0 shrink-0 rounded-full overflow-hidden relative">
              <img
                src={row.original.tourist_profilepicture}
                alt="image"
                className="w-full h-full"
              />
            </div>
            <p>{row.original.tourist_name}</p>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="lowercase">{row.original.tourist_email}</div>
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
          <div className="capitalize">{row.original.tourist_location}</div>
        ),
      },
      {
        accessorKey: "createdat",
        header: "Createdat",
        cell: ({ row }) => (
          <div>
            {dayjs(row.getValue("createdat")).format("HH:mm D MMMM YYYY")}
          </div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => {
          const tourist = row.original;
          return (
            <div className="flex items-center gap-2">
              <Link to={`/tourist/${tourist.id}`}>
                <Eye />
              </Link>
              {/* dialog edit */}
              <Dialog open={dialogEdit} onOpenChange={setDialogEdit}>
                <DialogTrigger asChild>
                  <button
                    onClick={() =>
                      setTouristData({
                        id: tourist.id,
                        tourist_email: tourist.tourist_email,
                        tourist_location: tourist.tourist_location,
                        tourist_name: tourist.tourist_name,
                      })
                    }
                  >
                    <Pencil />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Edit Tourist</DialogTitle>
                    <DialogDescription>
                      Make changes here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={handleEditTourist}
                    className="grid gap-4 py-4"
                  >
                    <div className="grid gap-2">
                      <label htmlFor="name">Name</label>
                      <Input
                        id="name"
                        name="name"
                        required
                        defaultValue={touristData.tourist_name}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        defaultValue={touristData.tourist_email}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="location" className="">
                        Location
                      </label>
                      <Input
                        id="location"
                        name="location"
                        required
                        defaultValue={touristData.tourist_location}
                      />
                    </div>
                    <DialogFooter className="sm:justify-between">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              {/* dialog delete */}
              <Dialog open={dialogDelete} onOpenChange={setDialogDelete}>
                <DialogTrigger asChild>
                  <button onClick={() => setDeletedId(tourist.id)}>
                    <Trash />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Delete Tourist</DialogTitle>
                    <DialogDescription>
                      Are you sure to delete this tourist? Be careful, this
                      action cannot be reversed
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-between">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button onClick={handleDeleteTourist} type="submit">
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dialogDelete, dialogEdit, touristData]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="pb-4 flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={dialogCreate} onOpenChange={setDialogCreate}>
          <DialogTrigger asChild>
            <Button variant="outline">Add Tourist</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Tourist</DialogTitle>
              <DialogDescription>
                Insert a name, email and location for tourist.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTourist} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Name</label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="">
                  Email
                </label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <label htmlFor="location" className="">
                  Location
                </label>
                <Input id="location" name="location" required />
              </div>
              <DialogFooter className="sm:justify-between">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
                <TableRow key={row.id}>
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  There are no tourists available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
