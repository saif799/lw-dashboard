import { db } from "@/server/db";
import { shoeModels } from "@/server/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { Test } from "./_components/updateImage";

export default async function ModelPage({
  params: { modelId },
}: {
  params: { modelId: string };
}) {
  const model = await db
    .select()
    .from(shoeModels)
    .where(eq(shoeModels.id, modelId))
    .limit(1);

  if (!model.length) return <div>not found </div>;
  console.log(model[0].desktopImage);

  return (
    <div className="p-5">
      <div className="p-5 border rounded-md flex gap-8 h-[500px]">
        <div className="flex-1 border rounded-md overflow-hidden relative">
          <h2 className="text-lg p-3">Desktop Image</h2>

          <Test
            modelId={modelId}
            modelImage={model[0].desktopImage ?? undefined}
          />
          <Image
            src={
              model[0].desktopImage ?? "/images/localhost-file-not-found.jpg"
            }
            alt={`${model[0].modelName}`}
            width={500}
            height={500}
            className="w-full h-full object-contain"
          ></Image>
        </div>
        <div className="flex-1 border rounded-md overflow-hidden relative">
          <h2 className="text-lg p-3">Mobile Image</h2>
          <Test
            modelId={modelId}
            modelImage={model[0].mobileImage ?? undefined}
          />
          <Image
            src={model[0].mobileImage ?? "/images/localhost-file-not-found.jpg"}
            alt={`${model[0].modelName}`}
            width={500}
            height={500}
            className="w-full h-full object-contain"
          ></Image>
        </div>
      </div>
    </div>
  );
}
