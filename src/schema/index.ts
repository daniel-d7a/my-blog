import { reference, type SchemaContext, z } from "astro:content";

export const bookSchema = ({ image }: SchemaContext) =>
  z.object({
    image: image(),
    name: z.string(),
    tags: z.array(z.string()),
    updatedAt: z.date(),
    inProgress: z.boolean(),
    description: z.string(),
  });

export const authorSchema = ({ image }: SchemaContext) =>
  z.object({
    displayName: z.string(),
    bio: z.string().optional(),
    photo: image(),
  });

export const pageSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    intro: z.string(),
    image: image(),
    type: z.string().optional(),
  });

export const blogSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    intro: z.string(),
    tags: z.array(z.string()),
    image: image(),
    author: reference("author"),
    pubDate: z.date(),
    type: z.string().optional(),
    references: z.array(z.string()),
  });

export const translatedPostSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    intro: z.string(),
    tags: z.array(z.string()),
    image: image(),
    author: reference("author"),
    pubDate: z.date(),
    type: z.string().optional(),
    originalUrl: z.string().url(),
  });

export const ChapterSchema = ({ image }: SchemaContext) =>
  z.object({
    bookName: z.string(),
    chapterTitle: z.string(),
    updatedAt: z.date(),
  });
