import { z } from "zod";

export const formSchema = z.object({
  name: z.string().nonempty({ message: "please fill the product name" }),
  description: z.string().optional(),
  showCase: z.string(),
  model: z.string().nonempty(),
  price: z.string(),
  sizes: z
    .array(
      z.object({
        size: z.number(),
        stock: z.number(),
      })
    )
    .nonempty({ message: "please fill in sizes" }),
  images: z.array(z.string()),
});

export const ModelformSchema = z.object({
  modelName: z.string().nonempty({ message: "please fill the product name" }),
  brand: z.string().nonempty({ message: "please fill the brand field" }),
  MobileImage: z.string().nullable(),
  desktopImage: z.string().nullable(),
});
