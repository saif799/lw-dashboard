import { AppSidebar } from "@/components/app-sidebar";
import { columns } from "@/components/Orders/columns";
import { DataTable } from "@/components/Orders/data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { orders, shoeModels } from "@/server/schema";
import { db } from "@/server/db";
import AddProductFrom from "@/components/addProductFrom";
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

export default async function Page() {
  const allOrders = await db.select().from(orders);

  const allModels = await db
    .select({ id: shoeModels.id, name: shoeModels.modelName })
    .from(shoeModels)
    .orderBy(shoeModels.modelName);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
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
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl  border md:min-h-min p-10">
            {allOrders ? (
              <DataTable columns={columns} data={allOrders} />
            ) : (
              <p>no orders at the moment</p>
            )}{" "}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
