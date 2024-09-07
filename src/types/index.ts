import { authorSchema, blogSchema, bookSchema, pageSchema } from "@/schema";
import { z } from "zod";

export type Heading = { depth: number; slug: string; text: string };
export type NestedHeading = Heading & { nestedHeadings?: NestedHeading[] };

export type Author = z.infer<ReturnType<typeof authorSchema>>;
export type Blog = z.infer<ReturnType<typeof blogSchema>>;
export type BookType = z.infer<ReturnType<typeof bookSchema>>;
export type Page = z.infer<ReturnType<typeof pageSchema>>;
