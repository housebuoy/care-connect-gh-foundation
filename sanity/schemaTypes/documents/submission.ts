import { defineField, defineType } from "sanity";

// submitted form fields are read-only (staff shouldn't rewrite what someone submitted);
// only the review fields (status, showOnSite, displayRole) are editable.
const submitted = { readOnly: true } as const;

export const submission = defineType({
  name: "submission",
  title: "Form submissions",
  type: "document",
  fields: [
    defineField({ name: "path", title: "Type", type: "string", ...submitted }),
    defineField({ name: "name", type: "string", ...submitted }),
    defineField({ name: "email", type: "string", ...submitted }),
    defineField({ name: "phone", type: "string", ...submitted }),

    // volunteer-only submitted fields
    defineField({
      name: "location",
      type: "string",
      ...submitted,
      hidden: ({ document }) => document?.path !== "volunteer",
    }),
    defineField({
      name: "role",
      type: "string",
      ...submitted,
      hidden: ({ document }) => document?.path !== "volunteer",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      ...submitted,
      hidden: ({ document }) => document?.path !== "volunteer",
    }),

    // partner-only submitted fields
    defineField({
      name: "organisation",
      type: "string",
      ...submitted,
      hidden: ({ document }) => document?.path !== "partner",
    }),
    defineField({
      name: "partnerType",
      title: "Partnership type",
      type: "string",
      ...submitted,
      hidden: ({ document }) => document?.path !== "partner",
    }),

    defineField({ name: "message", type: "text", ...submitted }),
    defineField({ name: "submittedAt", type: "datetime", ...submitted }),

    // ── review fields (editable by staff) ──
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Pending review", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Declined", value: "declined" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    }),
    defineField({
      name: "showOnSite",
      title: "Show on volunteers page",
      type: "boolean",
      initialValue: false,
      description:
        "Only turns on after approval, and only with the person's consent to appear publicly.",
      // only meaningful for volunteers — hide for partners
      hidden: ({ document }) => document?.path !== "volunteer",
    }),
    defineField({
      name: "displayRole",
      title: "Public role label",
      type: "string",
      description: "How they appear on the site, e.g. 'Volunteer'. Defaults to their form role.",
      hidden: ({ document }) => document?.path !== "volunteer",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "path", media: "photo" },
  },
  orderings: [
    { title: "Newest", name: "newest", by: [{ field: "submittedAt", direction: "desc" }] },
  ],
});