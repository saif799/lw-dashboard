/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/utils/uploadthing";
import { ModelformSchema } from "@/types/types";
import { z } from "zod";
import { useState } from "react";
import { addModelAction } from "@/actions/addModel.action";
import { Loader2 } from "lucide-react";

export default function AddModelFrom() {

  
  const [MIUploading, setMIUploading] = useState(false);
  const [DIUploading, setDIUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ModelformSchema>>({
    resolver: zodResolver(ModelformSchema),
    defaultValues: {
      modelName: "",
    },
  });

  const { setValue } = form;

  async function onSubmit(data: z.infer<typeof ModelformSchema>) {
    try {
      setIsLoading(true);
      console.log(data);

      await addModelAction(data);

      toast.success("product added successfully ");
    } catch (err) {
      console.error("Post request failed while creating the order:", err);
      toast.error("Order failed");
    } finally {
      setIsLoading(false);
    }
  }
  //TODO: style this bad boy
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 pt-4">
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="modelName"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Model name</FormLabel>
                <FormControl>
                  <Input placeholder="Model name " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>brand</FormLabel>
                <FormControl>
                  <Input placeholder="brand name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-5 pb-2">
          <FormField
            control={form.control}
            name="MobileImage"
            render={({}) => (
              <FormItem className="rounded-full hover:cursor-pointer grow">
                <FormLabel>Mobile image</FormLabel>

                <FormControl>
                  <UploadButton
                    disabled={MIUploading}
                    // TODO : yeah i aint styling this check this url to know how to style https://docs.uploadthing.com/concepts/theming#theming-with-tailwind-css
                    appearance={{
                      button:
                        "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed ut-uploading:bg-muted/50 text-black  text-black border bg-none after:bg-orange-400 rounded-full p-1 hover:cursor-pointer w-full",
                      container: "w-full border-cyan-300 rounded-full",
                      allowedContent: "hidden",
                    }}
                    endpoint="imageUploader"
                    content={{ button: "Pick Mobile Image" }}
                    onClientUploadComplete={(res) => {
                      setValue("MobileImage", res[0].url);
                      toast.success("Mobile image uploaded successfully");
                      setMIUploading(false);
                    }}
                    onUploadBegin={() => {
                      setMIUploading(true);
                    }}
                    onUploadError={(error: Error) => {
                      setMIUploading(false);
                      toast.error("Mobile image failed to upload try again");
                      console.log(error.cause);
                      console.log(error.name);

                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desktopImage"
            render={({}) => (
              <FormItem className="rounded-full hover:cursor-pointer grow">
                <FormLabel>Desktop image</FormLabel>

                <FormControl>
                  <UploadButton
                    disabled={DIUploading}
                    // TODO : yeah i aint styling this check this url to know how to style https://docs.uploadthing.com/concepts/theming#theming-with-tailwind-css
                    onUploadBegin={() => {
                      setDIUploading(true);
                    }}
                    appearance={{
                      button:
                        "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed ut-uploading:bg-muted/50 text-black  text-black border bg-none after:bg-orange-400 rounded-full p-1 hover:cursor-pointer w-full",
                      container: "w-full border-cyan-300 rounded-full",
                      allowedContent: "hidden",
                    }}
                    endpoint="imageUploader"
                    content={{ button: "Pick Desktop Image" }}
                    onClientUploadComplete={(res) => {
                      setValue("desktopImage", res[0].url);
                      toast.success("desktop image uploaded successfully");
                      setDIUploading(false);
                    }}
                    onUploadError={(error: Error) => {
                      toast.error("desktop image failed to upload try again");
                      console.log(error.cause);
                      console.log(error.name);
                      setDIUploading(false);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={isLoading} className="w-full" type="submit">
          {!isLoading ? "Submit" : <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
