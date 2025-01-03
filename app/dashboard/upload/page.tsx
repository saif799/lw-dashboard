"use client";

import { UploadButton } from "@/utils/uploadthing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imagesUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          //just create a server action that adds the image to the product and yes possibly add the product itself to the db
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.log(error.cause);
          console.log(error.name);

          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
