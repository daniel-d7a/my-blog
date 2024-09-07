import { authorSchema, blogSchema, bookSchema, pageSchema } from "@/schema";
import { defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: blogSchema,
});

const pageCollection = defineCollection({
  type: "content",
  schema: pageSchema,
});

const authorCollection = defineCollection({
  type: "data",
  schema: authorSchema,
});

const booksCollection = defineCollection({
  type: "content",
  schema: bookSchema,
});

export const collections = {
  blog: blogCollection,
  author: authorCollection,
  page: pageCollection,
  books: booksCollection,
};
