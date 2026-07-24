import { defineField, defineType } from "sanity";

export const submission = defineType({
  name: "submission",
  title: "Form submissions",
  type: "document",
  readOnly: true, // staff read these, don't edit them
  fields: [
    defineField({ name: "path", title: "Type", type: "string" }), // volunteer | partner
    defineField({ name: "name", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "organisation", type: "string" }),
    defineField({ name: "partnerType", title: "Partnership type", type: "string" }),
    defineField({ name: "message", type: "text" }),
    defineField({ name: "photo", title: "Photo", type: "image" }),
    defineField({ name: "submittedAt", type: "datetime" }),
  ],
  preview: {
    select: { title: "name", subtitle: "path", media: "photo" },
  },
  orderings: [
    { title: "Newest", name: "newest", by: [{ field: "submittedAt", direction: "desc" }] },
  ],
});