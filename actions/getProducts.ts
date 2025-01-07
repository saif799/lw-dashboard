import { db } from "@/server/db";
import { products } from "@/server/schema";

export async function GetShowCaseProducts() {
  try {
    const yourProducts = await db
      .select()
      .from(products)
      .orderBy(products.createdAt);
    return yourProducts;
  } catch (err) {
    console.log("error selecting a product ", err);
    throw new Error("failed to fetch the prodcuts");
  }
}
