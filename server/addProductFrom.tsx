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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { UploadButton } from "@/utils/uploadthing";
import { Textarea } from "../components/ui/textarea";
import { generateId } from "@/lib/generateId";
import { formSchema } from "@/types/types";
import { z } from "zod";
import { addProductAction } from "@/actions/addProduct.action";
import { useState } from "react";

export default function AddProductFrom({
  models,
}: {
  models: Array<{ modelName: string; id: string }>;
}) {
  const [size, setSize] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { setValue } = form;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log("this is the model id", data.model);

      await addProductAction(data);

      toast.success("product added successfully");
    } catch (err) {
      console.error("Post request failed while creating the order:", err);
      toast.error("failed to add your product");
    } finally {
    }
  }
  //TODO: style this bad boy
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 pt-4">
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Product price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>model</FormLabel>

                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="model" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem
                          key={model.id}
                          value={model.id}
                          onClick={() => {
                            console.log(model.id, field.value);
                          }}
                        >
                          {model.modelName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="showCase"
            render={({}) => (
              <FormItem className="rounded-full hover:cursor-pointer grow">
                <FormLabel>show case image</FormLabel>

                <FormControl>
                  <UploadButton
                    // TODO : yeah i aint styling this check this url to know how to style https://docs.uploadthing.com/concepts/theming#theming-with-tailwind-css
                    appearance={{
                      button:
                        "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed ut-uploading:bg-muted/50 text-black  text-black border bg-none after:bg-orange-400 rounded-full p-1 hover:cursor-pointer w-full",
                      container: "w-full border-cyan-300 rounded-full",
                      allowedContent: "hidden",
                    }}
                    endpoint="imageUploader"
                    content={{ button: "Pick an Image" }}
                    onClientUploadComplete={(res) => {
                      setValue("showCase", res[0].url);
                      toast.success("image uploaded successfully");
                    }}
                    onUploadError={(error: Error) => {
                      toast.error("image failed to upload try again");
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
        </div>

        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Product description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="rounded-full hover:cursor-pointer grow">
                <FormLabel>
                  show case image {field.value ? field.value.length : "nothing"}
                </FormLabel>

                <FormControl>
                  <UploadButton
                    // TODO : yeah i aint styling this check this url to know how to style https://docs.uploadthing.com/concepts/theming#theming-with-tailwind-css
                    appearance={{
                      button:
                        "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed  text-black border bg-none after:bg-orange-400 rounded-full p-1 hover:cursor-pointer w-full",
                      container: "w-full border-cyan-300 rounded-full",
                      allowedContent: "hidden",
                    }}
                    endpoint="imagesUploader"
                    content={{ button: "Pick an Image" }}
                    onClientUploadComplete={(res) => {
                      const images = res.map((ima) => ima.url);

                      setValue("images", images);

                      toast.success("image uploaded successfully");
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(
                        "failed to upload product images please try again"
                      );

                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="sizes"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Product Sizes and Quantities</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {field.value ? (
                    field.value.map((item, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          placeholder="Size"
                          type="number"
                          value={item.size}
                          onChange={(e) => {
                            const newValue = [...field.value];
                            newValue[index].size = parseInt(e.target.value);
                            field.onChange(newValue);
                          }}
                        />
                        <Input
                          placeholder="Quantity"
                          type="number"
                          value={item.stock}
                          onChange={(e) => {
                            const newValue = [...field.value];
                            newValue[index].stock = parseInt(e.target.value);
                            field.onChange(newValue);
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <p>No sizes yet</p>
                  )}

                  <div className="flex space-x-2">
                    <Input
                      placeholder="Size"
                      type="number"
                      value={size}
                      onChange={(e) => {
                        setSize(parseInt(e.target.value));
                      }}
                    />
                    <Input
                      placeholder="Quantity"
                      type="number"
                      value={stock}
                      onChange={(e) => {
                        setStock(parseInt(e.target.value));
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      if (size && stock) {
                        const fieldarray = field.value ?? [];
                        field.onChange([...fieldarray, { size, stock }]);
                        setSize(0);
                        setStock(0);
                        console.log(field.value);
                      }
                    }}
                  >
                    Add Size
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
