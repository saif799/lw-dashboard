"use server";
import { generateId } from "@/lib/generateId";
import { db } from "@/server/db";
import { shoeModels } from "@/server/schema";
import { ModelformSchema } from "@/types/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addModelAction(data: z.infer<typeof ModelformSchema>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  try {
    const modelId = generateId();

    await db.insert(shoeModels).values({
      id: modelId,
      brand: data.brand,
      desktopImage: data.desktopImage,
      mobileImage: data.MobileImage,
      modelName: data.modelName,
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add product");
  }
}
