import { defineField, defineType } from "sanity";

export const outreach = defineType({
  name: "outreach",
  title: "Outreach",
  type: "document",
  fields: [
    defineField({ name: "number", type: "number", validation: (r) => r.required() }),
    defineField({ name: "community", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "region", type: "string",
      options: { list: ["Ashanti", "Eastern", "Greater Accra", "Western", "Central", "Northern"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "year", type: "number", validation: (r) => r.required() }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "isUpcoming", title: "Upcoming?", type: "boolean", initialValue: false }),
    defineField({
      name: "date", type: "date",
      description: "Required for upcoming outreaches",
      validation: (r) => r.custom((date, ctx) =>
        (ctx.document?.isUpcoming && !date) ? "Upcoming outreaches need a date" : true
      ),
    }),
    defineField({ name: "reached", type: "number", description: "Only if you have a real count" }),
    defineField({ name: "image", type: "image", options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", validation: (r) => r.required() })] }),
  ],
  preview: {
    select: { title: "community", subtitle: "location", media: "image", n: "number" },
    prepare: ({ title, subtitle, media, n }) => ({ title: `№${n} ${title}`, subtitle, media }),
  },
  orderings: [{ title: "Newest", name: "n", by: [{ field: "number", direction: "desc" }] }],
});