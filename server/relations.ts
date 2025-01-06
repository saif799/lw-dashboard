import { relations } from "drizzle-orm/relations";
import {
  shoeModels,
  products,
  images,
  productSizes,
  orders,
  productsOrdered,
} from "./schema";

export const productsRelations = relations(products, ({ one, many }) => ({
  shoeModel: one(shoeModels, {
    fields: [products.modelId],
    references: [shoeModels.id],
  }),
  images: many(images),
  productSizes: many(productSizes),
  productsOrdereds: many(productsOrdered),
}));

export const shoeModelsRelations = relations(shoeModels, ({ many }) => ({
  products: many(products),
}));

export const imagesRelations = relations(images, ({ one }) => ({
  product: one(products, {
    fields: [images.productId],
    references: [products.id],
  }),
}));

export const productSizesRelations = relations(productSizes, ({ one }) => ({
  product: one(products, {
    fields: [productSizes.productId],
    references: [products.id],
  }),
}));

export const productsOrderedRelations = relations(
  productsOrdered,
  ({ one }) => ({
    order: one(orders, {
      fields: [productsOrdered.orderId],
      references: [orders.id],
    }),
    product: one(products, {
      fields: [productsOrdered.productId],
      references: [products.id],
    }),
  })
);

export const ordersRelations = relations(orders, ({ many }) => ({
  productsOrdereds: many(productsOrdered),
}));
