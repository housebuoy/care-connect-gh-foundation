import { defineField, defineType } from "sanity";
export const article = defineType({
  name: "article",
  title: "Update / Article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "date", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "image", type: "image", options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
  ],
  preview: { select: { title: "title", subtitle: "date", media: "image" } },
  orderings: [{ title: "Newest", name: "date", by: [{ field: "date", direction: "desc" }] }],
});