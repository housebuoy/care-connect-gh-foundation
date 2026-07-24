import { defineField, defineType } from "sanity";

export const aboutContent = defineType({
  name: "aboutContent",
  title: "About the foundation",
  type: "document",
  fields: [
    defineField({
      name: "mission",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "vision",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "whyFounded",
      title: "Why we exist",
      type: "text",
      rows: 8,
      description: "The founding story, shown on the About page.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "foundedYear",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      type: "string",
      description: "e.g. Kumasi, Ashanti Region, Ghana",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "registrationStatus",
      type: "string",
      description:
        "Leave blank to hide. Use the real status — e.g. 'Registration in progress' or a reg. number.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "About the foundation" }),
  },
});