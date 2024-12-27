import {
  authorSchema,
  blogSchema,
  bookSchema,
  ChapterSchema,
  pageSchema,
  translatedPostSchema,
} from "@/schema";
import { defineCollection, z } from "astro:content";

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

const translatedPostsCollection = defineCollection({
  type: "content",
  schema: translatedPostSchema,
});

const chaptersCollection = defineCollection({
  type: "content",
  schema: ChapterSchema,
});

export const collections = {
  blog: blogCollection,
  author: authorCollection,
  page: pageCollection,
  books: booksCollection,
  translated_posts: translatedPostsCollection,
  chapters: chaptersCollection,
};
