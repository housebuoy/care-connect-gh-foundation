import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Organisation name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      type: "image",
      description:
        "Transparent PNG or SVG works best. Landscape logos display more evenly than square ones.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Usually just the organisation name.",
        }),
      ],
    }),
    defineField({
      name: "url",
      title: "Website",
      type: "url",
      description: "Optional — makes the logo clickable.",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first. Leave blank to sort alphabetically.",
    }),
  ],
  preview: {
    select: { title: "name", media: "logo", subtitle: "url" },
  },
  orderings: [
    { title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] },
    { title: "Name", name: "name", by: [{ field: "name", direction: "asc" }] },
  ],
});