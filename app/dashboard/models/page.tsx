import { db } from "@/server/db";
import { shoeModels } from "@/server/schema";
import Image from "next/image";
import Link from "next/link";

export default async function ModelsPage() {
  const models = await db.select().from(shoeModels).limit(100);
  models.forEach((m) => {
    if (m.id === "ffbb35c292444") console.log(m.desktopImage);
  });

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {models.map((model) => (
        <Link
          href={`/dashboard/models/${model.id}`}
          key={model.id}
          className="border rounded-lg p-4 shadow-md"
        >
          <h2 className="text-lg font-bold">{model.modelName}</h2>
          <p>Brand: {model.brand}</p>
          <Image
            src={model.desktopImage || "/images/localhost-file-not-found.jpg"}
            alt={model.modelName}
            width={300} // Adjust width as needed
            height={200} // Adjust height as needed
            className="w-full h-80 object-cover rounded"
          />
        </Link>
      ))}
    </div>
  );
}
