import { defineField, defineType } from "sanity";

export const healthTopic = defineType({
  name: "healthTopic",
  title: "Health topic",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug", type: "slug",
      options: { source: "title" }, validation: (r) => r.required(),
    }),
    defineField({
      name: "condition", type: "string",
      description: "e.g. Hypertension, Diabetes, Cholera",
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "reviewedBy", type: "reference", to: [{ type: "person" }],
      description: "The clinician who reviewed this — shows as a credibility line.",
    }),
    defineField({ name: "reviewedAt", title: "Reviewed on", type: "date" }),
    defineField({
      name: "image", type: "image", options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "condition", media: "image" } },
});