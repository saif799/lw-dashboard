import { db } from "@/server/db";
import { shoeModels } from "@/server/schema";

export default async function Home() {
  const test = await db.select().from(shoeModels);
  console.log(test);

  return <div> welcome home </div>;
}
