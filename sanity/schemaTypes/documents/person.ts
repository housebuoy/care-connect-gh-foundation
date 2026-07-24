import { defineField, defineType } from "sanity";

export const person = defineType({
  name: "person",
  title: "Team members",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "credential",
      type: "string",
      description:
        "Only if they genuinely hold it — e.g. Registered Nurse, MBChB. Leave blank if unsure.",
    }),
    defineField({
      name: "isLeadership",
      title: "Leadership team?",
      type: "boolean",
      initialValue: false,
      description: "Shown as a large card on About. Keep this to the core team.",
    }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({ name: "order", type: "number", description: "Lower appears first." }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
  orderings: [
    { title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
});