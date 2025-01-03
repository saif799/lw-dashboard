"use server";
import { generateId } from "@/lib/generateId";
import { db } from "@/server/db";
import { images, productSizes, products } from "@/server/schema";
import { formSchema } from "@/types/types";
import { z } from "zod";

export async function addProductAction(data: z.infer<typeof formSchema>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sizes, images: yourImages, ...productData } = data;
  try {
    const productId = generateId();

    const formatedSizes = sizes.map(({ size, stock }) => ({
      id: generateId(),
      size,
      stock,
      productId,
    }));

    const formatedImages = yourImages.map((imageUrl) => ({
      id: generateId(),
      imageUrl,
      productId,
    }));

    await db
      .insert(products)
      .values({
        id: productId,
        ...productData,
        price: parseFloat(data.price),
      })
      .then(() => {
        console.log("this is defenetly working");
      });

    await db.insert(productSizes).values(formatedSizes);
    await db.insert(images).values(formatedImages);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add product");
  }
}
