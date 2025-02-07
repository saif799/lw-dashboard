import { columns } from "@/components/Orders/columns";
import { DataTable } from "@/components/Orders/data-table";

import { orders, shoeModels } from "@/server/schema";
import { db } from "@/server/db";
import AddProductFrom from "@/server/addProductFrom";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import AddModelFrom from "@/components/addModelForm";

export default async function Page() {
  const allOrders = await db.select().from(orders);
  const allModels = await db.select().from(shoeModels).limit(100);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl  flex items-center justify-center  border">
          <Dialog>
            <DialogTrigger className="flex items-center flex-col gap-2">
              <PlusCircle />
              <p>add a product</p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  <AddProductFrom models={allModels} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="aspect-video rounded-xl  flex items-center justify-center  border">
          <Dialog>
            <DialogTrigger className="flex items-center flex-col gap-2">
              <PlusCircle />
              <p>add a a model</p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  <AddModelFrom />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50"></div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl  border md:min-h-min p-10">
        {allOrders ? (
          <DataTable columns={columns} data={allOrders} />
        ) : (
          <p>no orders at the moment</p>
        )}{" "}
      </div>
    </div>
  );
}
