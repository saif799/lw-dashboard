"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { InferSelectModel } from "drizzle-orm";
import { orders } from "@/server/schema";
import { Checkbox } from "../ui/checkbox";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type OrdersType = Omit<typeof orders.$inferSelect, "updatedAt">;
export type Payment = {
  id: string;
  amount: number;
  status: string;
  email: string;
};

export const columns: ColumnDef<OrdersType>[] = [
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
    accessorKey: "fullName",
    header: "Full Name",
    // cell: ({ row }) => {
    //   return (
    //     <div className="text-left font-medium">{row.getValue("fullName")}</div>
    //   );
    // },
  },
  { accessorKey: "phoneNumber", header: "Phone Number" },
  { accessorKey: "wilaya", header: "Wilaya" },
  { accessorKey: "baladia", header: "baladia" },
  { accessorKey: "status", header: "Status", filterFn: "includesString" },
  { accessorKey: "livraison", header: "Livraison" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
//   },
//
// ];
