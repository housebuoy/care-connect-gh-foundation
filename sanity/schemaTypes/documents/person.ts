import { defineField, defineType } from "sanity";

export const person = defineType({
  name: "person",
  title: "Team members",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      validation: (r) => r.required(),
    }),
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
      description:
        "Shown as a large card on About. Keep this to the core team.",
    }),
    defineField({
      name: "isVolunteer",
      title: "From volunteer signup",
      type: "boolean",
      initialValue: false,
      readOnly: true,
      description: "Set automatically when approved from a signup.",
    }),
    defineField({
      name: "showOnSite",
      title: "Show on site",
      type: "boolean",
      initialValue: true,
      description: "Untick to hide this person from the public team page.",
    }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "email",
      type: "string",
      readOnly: true,
      description: "Private — for the NGO's records, never shown on the site.",
    }),
    defineField({
      name: "phone",
      type: "string",
      readOnly: true,
      description: "Private — never shown on the site.",
    }),
    defineField({
      name: "location",
      type: "string",
      readOnly: true,
      description: "Private — never shown on the site.",
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower appears first.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
  orderings: [
    {
      title: "Display order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
