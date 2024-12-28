-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"status" text DEFAULT 'pending',
	"order_date" timestamp DEFAULT now() NOT NULL,
	"full_name" text NOT NULL,
	"phone_number" text NOT NULL,
	"wilaya" text NOT NULL,
	"baladia" text NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"livraison" text DEFAULT 'bereau'
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"external_id" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text,
	"email" text,
	"phone_number" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_external_id_unique" UNIQUE("external_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"show_case" text NOT NULL,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"category_id" text NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product_sizes" (
	"id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"size" integer NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products_ordered" (
	"id" text PRIMARY KEY NOT NULL,
	"quantity" integer NOT NULL,
	"price" integer NOT NULL,
	"order_id" text NOT NULL,
	"product_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_ordered" ADD CONSTRAINT "products_ordered_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_ordered" ADD CONSTRAINT "products_ordered_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ProductName_idx" ON "products" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX "imageProduct_idx" ON "images" USING btree ("product_id" text_ops);--> statement-breakpoint
CREATE INDEX "product_idx" ON "product_sizes" USING btree ("product_id" text_ops);--> statement-breakpoint
CREATE INDEX "order_made_idx" ON "products_ordered" USING btree ("order_id" text_ops);--> statement-breakpoint
CREATE INDEX "product_ordered_idx" ON "products_ordered" USING btree ("product_id" text_ops);
*/