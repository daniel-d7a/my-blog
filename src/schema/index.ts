import { reference, type SchemaContext, z } from "astro:content";

export const bookSchema = ({ image }: SchemaContext) =>
  z.object({
    image: image(),
    name: z.string(),
    tags: z.string(), // TODO: check how to turn this into an array
    description: z.string(),
  });

export const authorSchema = ({ image }: SchemaContext) =>
  z.object({
    displayName: z.string(),
    bio: z.string().optional(),
    photo: image().optional(),
  });

export const pageSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    intro: z.string(),
    image: image().optional(),
    type: z.string().optional(),
  });

export const blogSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    intro: z.string(),
    tag: z.string(),
    image: image().optional(),
    author: reference("author"),
    pubDate: z.date(),
    type: z.string().optional(),
  });
