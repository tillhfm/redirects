"use client"

import * as React from "react"
import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import CreateOrEditRedirectDialog from "./create-or-edit-redirect-dialog"
import DeleteRedirectDialog from "./delete-redirect-dialog"
import Link from "next/link"
import { appBaseUrl, cn, copyToClipboard, getUrlForKey } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Redirect } from "@prisma/client"
import { Badge } from "@/components/ui/badge"

export function RedirectTable({
   data
}: {
   data: Redirect[]
}) {
   const selectedHook = useState<undefined | Redirect>(undefined)
   const [, setSelected] = selectedHook

   const editDialogOpenHook = useState(false)
   const [, setEditDialogOpen] = editDialogOpenHook

   const deleteDialoOpengHook = useState(false)
   const [, setDeleteDialogOpen] = deleteDialoOpengHook

   const columns: ColumnDef<Redirect>[] = [
      {
         accessorKey: "key",
         header: ({ column }) => {
            return (
               <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  className="pl-4"
               >
                  Key
                  <ArrowUpDown />
                  {column.getIsSorted() && <Badge variant="outline" >sorted {column.getIsSorted()}</Badge>}
               </Button>
            )
         },
         cell: ({ row }) => (
            <Link href={getUrlForKey(row.getValue("key"))} target="_blank" className={cn(buttonVariants({ variant: "link" }), "max-w-full pl-4")}>
               <span className="truncate">
                  <span className="text-zinc-500">{appBaseUrl.replace("https://", "")}</span>
                  <span className=" font-bold">{row.getValue("key")}</span>
               </span>
            </Link>

         ),
      },
      {
         accessorKey: "outcome",
         header: ({ column }) => {
            return (
               <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  className="pl-4"
               >
                  Outcome (URL)
                  <ArrowUpDown />
                  {column.getIsSorted() && <Badge variant="outline" >sorted {column.getIsSorted()}</Badge>}
               </Button>
            )
         },
         cell: ({ row }) => (
            <Link href={row.getValue("outcome")} target="_blank" className={cn(buttonVariants({ variant: "link" }), "max-w-full pl-4")}>
               <span className="truncate">{row.getValue("outcome")}</span>
            </Link>
         )
      },
      {
         accessorKey: "description",
         header: ({ column }) => {
            return (
               <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  className="pl-4"
               >
                  Description
                  <ArrowUpDown />
                  {column.getIsSorted() && <Badge variant="outline" >sorted {column.getIsSorted()}</Badge>}
               </Button>
            )
         },
         cell: ({ row }) => <div className="pl-4 w-full truncate">
            {row.getValue("description") ? <span>{row.getValue("description")}</span> : <span className="text-zinc-500">No description.</span>}
         </div>,
      },
      {
         accessorKey: "updatedAt",
         header: ({ column }) => {
            return (
               <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  className="pl-4"
               >
                  Updated At
                  <ArrowUpDown />
                  {column.getIsSorted() && <Badge variant="outline">sorted {column.getIsSorted()}</Badge>}
               </Button>
            )
         },
         cell: ({ row }) => <div className="pl-4">{(row.getValue("updatedAt") as Date).toLocaleString()}</div>,
      },
      {
         id: "actions",
         enableHiding: false,
         cell: ({ row }) => {
            const redirect = row.original

            const { toast } = useToast()

            return (
               <div className="w-full flex justify-center">
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild className="w-full">
                        <Button variant="ghost" className="h-8 w-8 p-0 m-0">
                           <span className="sr-only">Open menu</span>
                           <MoreHorizontal />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => copyToClipboard(navigator.clipboard, getUrlForKey(redirect.key), "url", toast)}>
                           Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => copyToClipboard(navigator.clipboard, redirect.outcome, "outcome", toast)}>
                           Copy outcome URL
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => { setSelected(redirect); setEditDialogOpen(true) }}>
                           Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelected(redirect); setDeleteDialogOpen(true) }} className="text-red-600 hover:!text-red-600 hover:!bg-red-100">
                           Delete
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            )
         },
      },
   ]

   const [sorting, setSorting] = useState<SortingState>([{ id: 'updatedAt', desc: true }])
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
      []
   )
   const [rowSelection, setRowSelection] = useState({})

   const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onRowSelectionChange: setRowSelection,
      state: {
         sorting,
         columnFilters,
         rowSelection,
      },
   })

   return (
      <div className="w-full">
         <div className="flex items-center py-4 space-x-2">
            <Input
               placeholder="Search key..."
               value={(table.getColumn("key")?.getFilterValue() as string) ?? ""}
               onChange={(event) =>
                  table.getColumn("key")?.setFilterValue(event.target.value)
               }
               className="max-w-xs"
            />
            <Button onClick={() => { setSelected(undefined); setEditDialogOpen(true) }}>
               Create Redirect
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
                           )
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
                              <TableCell key={cell.id} className="max-w-xs">
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
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2 flex items-center">
               <p className="text-sm text-zinc-500">
                  {table.getRowCount()} Total — Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
               </p>
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

         <CreateOrEditRedirectDialog selectedHook={selectedHook} dialogOpenHook={editDialogOpenHook} existingRedirects={data} />
         <DeleteRedirectDialog selectedHook={selectedHook} dialogOpenHook={deleteDialoOpengHook} />
      </div>
   )
}