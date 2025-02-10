import { db } from "@/server/db";
import { shoeModels } from "@/server/schema";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import { UploadThingError } from "uploadthing/server";
import { eq } from "drizzle-orm";
import { utapi } from "@/server/uploadthing";
import { revalidatePath } from "next/cache";
// import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({}) => {
      return { userId: "user.id " };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    }),
  imagesUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    // Set permissions and file types for this FileRoute

    .onUploadComplete(async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    }),
  imagesEditor: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(
      z.object({
        imageType: z.enum(["desktop", "mobile"]),
        modelId: z.string(),
        oldImage: z.string().optional(),
      })
    )
    .middleware(async ({ input: { imageType, modelId, oldImage } }) => {
      if (!imageType || !modelId)
        throw new UploadThingError("please pass image type and model id ");

      return { modelId, imageType, oldImage };
    })
    // Set permissions and file types for this FileRoute

    .onUploadComplete(
      async ({ file, metadata: { imageType, modelId, oldImage } }) => {
        // This code RUNS ON YOUR SERVER after upload
        if (imageType === "desktop")
          await db
            .update(shoeModels)
            .set({ desktopImage: file.url })
            .where(eq(shoeModels.id, modelId));
        else
          await db
            .update(shoeModels)
            .set({ mobileImage: file.url })
            .where(eq(shoeModels.id, modelId));
        if (oldImage) await utapi.deleteFiles(oldImage);

        revalidatePath(`/dashboard/models/${modelId}`);

        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      }
    ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
