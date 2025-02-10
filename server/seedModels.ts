"use server";

import { addModelAction } from "@/actions/addModel.action";
import data from "./models.json"; 

export async function seedModels() {
  try {
    for (const model of data) {
      await addModelAction({...model , desktopImage : null , MobileImage : null});
      console.log(`Inserted product: ${model.modelName}`);
    }
    console.log("All products inserted successfully!");
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
}

seedModels().catch((error) => {
    console.error("Seeding error:", error);
  });

seedModels();