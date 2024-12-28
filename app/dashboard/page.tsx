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
import { orders } from "@/migrations/schema";
import { db } from "@/server/db";

export default async function Page() {
  const allOrders = await db
    .select({
      id: orders.id,
      status: orders.status,
      orderDate: orders.orderDate,
      fullName: orders.fullName,
      phoneNumber: orders.phoneNumber,
      wilaya: orders.wilaya,
      baladia: orders.baladia,
      livraison: orders.livraison,
    })
    .from(orders);
  if (!allOrders) return;

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
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl  border md:min-h-min p-10">
            <DataTable columns={columns} data={allOrders} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
