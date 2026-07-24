import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "email", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "phone",
      type: "string",
      description: "Local format, e.g. 0551919096",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      type: "string",
      description: "International format without +, e.g. 233551919096. Leave blank to hide.",
    }),
    defineField({
      name: "socials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              options: { list: ["Instagram", "Facebook", "X", "TikTok", "LinkedIn"] },
              validation: (r) => r.required(),
            }),
            defineField({ name: "handle", type: "string" }),
            defineField({ name: "url", type: "url", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "platform", subtitle: "handle" } },
        },
      ],
    }),
    defineField({
      name: "donateUrl",
      title: "Donation link",
      type: "url",
      description: "Paystack or similar. Leave blank if giving is arranged by contact.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});