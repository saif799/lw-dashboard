"use server";

import { db } from "@/server/db";
import { orders } from "@/server/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function changeOrderStatusAction(orderId: string, status: string) {
  await db.update(orders).set({ status }).where(eq(orders.id, orderId));
  revalidatePath("/dashboard");
}
