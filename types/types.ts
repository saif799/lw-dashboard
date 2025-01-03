import { z } from "zod";

export const formSchema = z.object({
  name: z.string().nonempty({ message: "please fill the product name" }),
  description: z.string().optional(),
  showCase: z.string(),
  price: z.string(),
  categoryId: z.string(),
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
